<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Expeditions implementation : © <Your name here> <Your email address here>
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
require_once('modules/php/train-car-deck.php');
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
    use TrainCarDeckTrait;
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
            // options
            SHOW_TURN_ORDER => 110, 
        ]);

        $this->destinations = $this->getNew("module.common.deck");
        $this->destinations->init("destination");
        $this->destinations->autoreshuffle = true;

        $this->trainCars = $this->getNew("module.common.deck");
        $this->trainCars->init("traincar");
        $this->trainCars->autoreshuffle = true;
        $this->trainCars->autoreshuffle_trigger = array('obj' => $this, 'method' => 'trainCarDeckAutoReshuffle');
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
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar, player_remaining_train_cars, player_remaining_tickets) VALUES ";

        $values = [];
        foreach ($players as $playerId => $player) {
            $color = array_shift($default_colors);
            $values[] = "('" . $playerId . "','$color','" . $player['player_canal'] . "','" . addslashes($player['player_name']) . "','" . addslashes($player['player_avatar']) . "', " . $this->getInitialTrainCarsNumber() . ", " . $this->getInitialTicketsNumber()  . ")";
        }
        $sql .= implode(',', $values);
        $this->DbQuery($sql);
        $this->reattributeColorsBasedOnPreferences($players, $gameinfos['player_colors']);
        $this->reloadPlayersBasicInfos();

        /************ Start the game initialization *****/

        // Init global values with their initial values
        $this->setGameStateInitialValue(LAST_TURN, 0);
        $this->setGameStateInitialValue(TICKETS_USED, 0);
        $this->setGameStateInitialValue(REMAINING_BLUE_ARROWS, $this->getInitialTrainCarsNumber());
        $this->setGameStateInitialValue(REMAINING_YELLOW_ARROWS, $this->getInitialTrainCarsNumber());
        $this->setGameStateInitialValue(REMAINING_RED_ARROWS, $this->getInitialTrainCarsNumber());
        $this->setGameStateInitialValue(NEW_LOOP_COLOR, 0);
        $this->setGameStateInitialValue(MAIN_ACTION_DONE, 0);
        $this->setGameStateInitialValue(BLUEPOINT_ACTIONS_REMAINING, 0);

        $this->setGlobalVariable(LAST_BLUE_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_YELLOW_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_RED_ROUTES, [null, null, null]);

        // Init game statistics
        $this->initStat('table', 'turnsNumber', 0);
        $this->initStat('player', 'turnsNumber', 0);
        $this->initStat('player', STAT_POINTS_WITH_COMPLETED_DESTINATIONS, 0);
        $this->initStat('player', STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS, 0);
        $this->initStat('player', STAT_LOOPS, 0);
        $this->initStat('player', STAT_TICKETS_USED, 0);
        $this->initStat('player', STAT_TICKETS_EARNED, 0);
        $this->initStat('player', STAT_RED_LOCATIONS_REACHED, 0);
        $this->initStat('player', STAT_BLUE_LOCATIONS_REACHED, 0);
        $this->initStat('player', STAT_KEPT_ADDITIONAL_DESTINATION_CARDS, 0);

        // setup the initial game situation here

        $this->createDestinations();

        $this->createTrainCars();

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

        $result['claimedRoutes'] = $this->getClaimedRoutes();
        $result['visibleTrainCards'] = $this->getSharedDestinationCards();
        $result['revealedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getRevealedDestinationsIds($currentPlayerId)));

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
            $player['sharedCompletedDestinationsCount'] = count($this->destinations->getCardsInLocation('shared', $playerId));
            if ($isEnd) {
                $player['uncompletedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getUncompletedDestinationsIds($playerId)));
            } else {
                $player['uncompletedDestinations'] = [];
            }
        }

        // deck counters
        $result['trainCarDeckCount'] = $this->getRemainingTrainCarCardsInDeck();
        $result['destinationDeckCount'] = $this->getRemainingDestinationCardsInDeck();
        $result['trainCarDeckMaxCount'] = 110;
        $result['destinationDeckMaxCount'] = 30;

        $result['expansion'] = EXPANSION;
        $result['isGlobetrotterBonusActive'] = $this->isGlobetrotterBonusActive();
        $result['isLongestPathBonusActive'] = $this->isLongestPathBonusActive();

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
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345

        // Example:
        //        if( $from_version <= 1404301345 )
        //        {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
        //            $this->applyDbUpgradeToAllDB( $sql );
        //        }
        //        if( $from_version <= 1405061421 )
        //        {
        //            // ! important ! Use DBPREFIX_<table_name> for all tables
        //
        //            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
        //            $this->applyDbUpgradeToAllDB( $sql );
        //        }
        //        // Please add your future database scheme changes here
        //
        //


    }
}
