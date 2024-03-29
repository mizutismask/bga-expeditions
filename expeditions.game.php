<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Expeditions implementation : © <Séverine Kamycki> <mizutismask@gmail.com>
 * 
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * expeditions.game.php
 *
 * This is the main file for your game logic.
 *
 * In this PHP file, you are going to defines the rules of the game.
 *
 */


require_once(APP_GAMEMODULE_PATH . 'module/table/table.game.php');

require_once('modules/php/constants.inc.php');
require_once('modules/php/utils.php');
require_once('modules/php/states.php');
require_once('modules/php/args.php');
require_once('modules/php/actions.php');
require_once('modules/php/map.php');
require_once('modules/php/destination-deck.php');
require_once('modules/php/debug-util.php');
require_once('modules/php/expansion.php');

/*
 * Game main class.
 * For readability, main sections (util, action, state, args) have been splited into Traits with the section name on modules/php directory.
 */
class Expeditions extends Table {
    use UtilTrait;
    use ActionTrait;
    use StateTrait;
    use ArgsTrait;
    use MapTrait;
    use DestinationDeckTrait;
    use DebugUtilTrait;
    use ExpansionTrait;

    function __construct() {
        parent::__construct();

        $this->initGameStateLabels([
            LAST_TURN => 10, // last turn is the id of the last player, 0 if it's not last turn
            TICKETS_USED => 11, // used tickets count for active player during his turn
            REMAINING_YELLOW_ARROWS => 12,
            REMAINING_BLUE_ARROWS => 13,
            REMAINING_RED_ARROWS => 14,
            NEW_LOOP_COLOR => 15,
            MAIN_ACTION_DONE => 16,
            BLUEPOINT_ACTIONS_REMAINING => 17,
            LAST_ARROW_FROM_START_BLUE => 18,
            LAST_ARROW_FROM_START_YELLOW => 19,
            LAST_ARROW_FROM_START_RED => 20,
            ARROWS_SINCE_LOOP_BLUE => 21,
            ARROWS_SINCE_LOOP_YELLOW => 22,
            ARROWS_SINCE_LOOP_RED => 23,
            ARROW_COUNT_BY_TURN => 24,
            // options
            SHOW_TURN_ORDER => 110,
        ]);

        $this->destinations = $this->getNew("module.common.deck");
        $this->destinations->init("destination");
        $this->destinations->autoreshuffle = true;
    }

    protected function getGameName() {
        // Used for translations and stuff. Please do not modify.
        return "expeditions";
    }

    /*
        setupNewGame:
        
        This method is called only once, when a new game is launched.
        In this method, you must setup the game according to the game rules, so that
        the game is ready to be played.
    */
    protected function setupNewGame($players, $options = []) {
        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = $this->getGameinfos();
        $default_colors = $gameinfos['player_colors'];

        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar, player_remaining_tickets) VALUES ";

        $values = [];
        foreach ($players as $playerId => $player) {
            $color = array_shift($default_colors);
            $values[] = "('" . $playerId . "','$color','" . $player['player_canal'] . "','" . addslashes($player['player_name']) . "','" . addslashes($player['player_avatar']) . "', " . $this->getInitialTicketsNumber()  . ")";
        }
        $sql .= implode(',', $values);
        $this->DbQuery($sql);
        $this->reattributeColorsBasedOnPreferences($players, $gameinfos['player_colors']);
        $this->reloadPlayersBasicInfos();

        /************ Start the game initialization *****/

        // Init global values with their initial values
        $this->setGameStateInitialValue(LAST_TURN, 0);
        $this->setGameStateInitialValue(TICKETS_USED, 0);
        $this->setGameStateInitialValue(REMAINING_BLUE_ARROWS, $this->getInitialArrowsNumber());
        $this->setGameStateInitialValue(REMAINING_YELLOW_ARROWS, $this->getInitialArrowsNumber());
        $this->setGameStateInitialValue(REMAINING_RED_ARROWS, $this->getInitialArrowsNumber());
        $this->setGameStateInitialValue(NEW_LOOP_COLOR, 0);
        $this->setGameStateInitialValue(MAIN_ACTION_DONE, 0);
        $this->setGameStateInitialValue(BLUEPOINT_ACTIONS_REMAINING, 0);

        $this->setGameStateInitialValue(ARROWS_SINCE_LOOP_BLUE, -1);
        $this->setGameStateInitialValue(ARROWS_SINCE_LOOP_YELLOW, -1);
        $this->setGameStateInitialValue(ARROWS_SINCE_LOOP_RED, -1);
        $this->setGameStateInitialValue(LAST_ARROW_FROM_START_BLUE, 0);
        $this->setGameStateInitialValue(LAST_ARROW_FROM_START_YELLOW, 0);
        $this->setGameStateInitialValue(LAST_ARROW_FROM_START_RED, 0);

        $this->setGlobalVariable(LAST_BLUE_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_YELLOW_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_RED_ROUTES, [null, null, null]);

        // Init game statistics
        $this->initStat('table', 'turnsNumber', 0);
        $this->initStat('player', 'turnsNumber', 0);
        $this->initStat('player', STAT_POINTS_WITH_PLAYER_COMPLETED_DESTINATIONS, 0);
        $this->initStat('player', STAT_POINTS_WITH_SHARED_COMPLETED_DESTINATIONS, 0);
        $this->initStat('player', STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS, 0);
        $this->initStat('player', STAT_POINTS_WITH_REVEALED_DESTINATIONS, 0);
        $this->initStat('player', STAT_LOOPS, 0);
        $this->initStat('player', STAT_TICKETS_USED, 0);
        $this->initStat('player', STAT_TICKETS_EARNED, 0);
        $this->initStat('player', STAT_BLUE_LOCATIONS_REACHED, 0);
        $this->initStat('player', STAT_KEPT_ADDITIONAL_DESTINATION_CARDS, 0);
        $this->initStat('player', STAT_BIGGEST_ARROW_COUNT, 0);

        // setup the initial game situation here

        $this->createDestinations();

        // Activate first player (which is in general a good idea :) )
        //$this->activeNextPlayer();

        // TODO TEMP card to test
        $this->debugSetup();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
        
        Gather all informations about current game situation (visible by the current player).
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
    */
    protected function getAllDatas() {
        $stateName = $this->gamestate->state()['name'];
        $isEnd = $stateName === 'endScore' || $stateName === 'gameEnd' || $stateName === 'debugGameEnd';

        $result = [];

        $currentPlayerId = $this->getCurrentPlayerId();    // !! We must only return informations visible by this player !!

        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $sql = "SELECT player_id id, player_score score, player_no playerNo FROM player ";
        $result['players'] = $this->getCollectionFromDb($sql);

        // Gather all information about current game situation (visible by player $currentPlayerId).
        $result['remainingArrows'] = [BLUE => $this->getRemainingArrows(BLUE), YELLOW => $this->getRemainingArrows(YELLOW), RED => $this->getRemainingArrows(RED)];
        $result['lastArrowsByColor'] = $this->getLastArrows();
        $result['claimedRoutes'] = $this->getClaimedRoutes();
        $result['sharedDestinations'] = $this->getSharedDestinationCards();
        $result['revealedDestinationsToDo'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getRevealedToDoDestinationsIds()));

        // private data : current player hidden informations
        $result['handDestinations'] = $this->getDestinationsFromDb($this->destinations->getCardsInLocation('hand', $currentPlayerId));
        $result['completedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getCompletedDestinationsIds($currentPlayerId)));

        // share informations (for player panels)
        foreach ($result['players'] as $playerId => &$player) {
            $player['playerNo'] = intval($player['playerNo']);
            $player['ticketsCount'] = $this->getRemainingTicketsCount($playerId);
            $player['destinationsCount'] = intval($this->destinations->countCardInLocation('hand', $playerId));
            $tokensBackCount = $this->getRevealedTokensBackCount($playerId);
            $player['revealedTokensBackCount'] = $tokensBackCount;
            $player['revealedTokensLeftCount'] = DESTINATIONS_TO_REVEAL_COUNT - $tokensBackCount;
            $player['completedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getCompletedDestinationsIds($playerId)));
            $player['sharedCompletedDestinationsCount'] = count($this->destinations->getCardsInLocation('sharedCompleted', $playerId));
            if ($isEnd) {
                $player['uncompletedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getUncompletedDestinationsIds($playerId)));
            } else {
                $player['uncompletedDestinations'] = [];
            }
        }

        $result['expansion'] = EXPANSION;
        $result['showTurnOrder'] = intval($this->getGameStateValue(SHOW_TURN_ORDER)) == 2;

        if ($isEnd) {
            $result['bestScore'] = max(array_map(fn ($player) => intval($player['score']), $result['players']));
        } else {
            $result['lastTurn'] = $this->getGameStateValue(LAST_TURN) > 0;
        }
        return $result;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression() {
        $stateName = $this->gamestate->state()['name'];
        if ($stateName === 'endScore' || $stateName === 'gameEnd') {
            // game is over
            return 100;
        }
        return 100 * $this->getHighestCompletedDestinationsCount() / $this->getInitialDestinationCardNumber();
    }

    //////////////////////////////////////////////////////////////////////////////
    //////////// Zombie
    ////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn($state, $active_player) {
        $statename = $state['name'];

        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->jumpToState(ST_NEXT_PLAYER);
                    break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive($active_player, '');

            return;
        }

        throw new feException("Zombie mode not supported at this game state: " . $statename);
    }

    ///////////////////////////////////////////////////////////////////////////////////:
    ////////// DB upgrade
    //////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */

    function upgradeTableDb($from_version) {
        $changes = [
            [2307071828, "INSERT INTO DBPREFIX_global (`global_id`, `global_value`) VALUES (24, 0)"], 
           // [2208182316, "INSERT INTO DBPREFIX_stats (`stats_id`, `global_value`) VALUES (29, 0)"], 
        ];

        foreach ($changes as [$version, $sql]) {
            if ($from_version <= $version) {
                try {
                    self::warn("upgradeTableDb apply 1: from_version=$from_version, change=[ $version, $sql ]");
                    self::applyDbUpgradeToAllDB($sql);
                } catch (Exception $e) {
                    // See https://studio.boardgamearena.com/bug?id=64
                    // BGA framework can produce invalid SQL with non-existant tables when using DBPREFIX_.
                    // The workaround is to retry the query on the base table only.
                    self::error("upgradeTableDb apply 1 failed: from_version=$from_version, change=[ $version, $sql ]");
                    $sql = str_replace("DBPREFIX_", "", $sql);
                    self::warn("upgradeTableDb apply 2: from_version=$from_version, change=[ $version, $sql ]");
                    self::applyDbUpgradeToAllDB($sql);
                }
            }
        }
        self::warn("upgradeTableDb complete: from_version=$from_version");
    }
}
