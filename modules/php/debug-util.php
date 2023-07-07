<?php

trait DebugUtilTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Utility functions
    ////////////

    function debugSetup() {
        if ($this->getBgaEnvironment() != 'studio') {
            return;
        }

        //$this->debugSetDestinationInHand(7, 2343492);

        //$this->debugClaimAllRoutes(2343492, 1);
        //$this->debugClaimAllRoutes(2343492, 0.3);
        //$this->debugClaimAllRoutes(2343493, 0.2);
        //$this->debugSetLastTurn();
        //$this->debugClaimRoutes(2343492, [94, 37, 32, 59, 22, 20, 77, 11, 79, 68, 55]);

        //$this->debugSetRemainingTrainCarDeck(1);

        //$this->gamestate->changeActivePlayer(2343492);
    }

    function debugRevealCards(bool $all = false) {
        $players = $this->getPlayersIds();
        $restriction = $all ? "" : " limit 4";
        foreach ($players as $playerId) {
            self::DbQuery("UPDATE `destination` set `revealed` = true WHERE `card_location_arg`= $playerId" . $restriction);
        }
        $this->gamestate->jumpToState(ST_PLAYER_CHOOSE_ACTION);
    }

    function rc(bool $all = false) {
        $this->debugRevealCards($all);
    }
    function cd() {
        $this->debugCompleteDestinations();
    }

    function debugCompleteDestinations() {
        $players = $this->getPlayersIds();
        $restriction = " limit " . ($this->getInitialDestinationCardNumber() - 1);
        foreach ($players as $playerId) {
            self::DbQuery("UPDATE `destination` set `completed` = true WHERE `card_location_arg`= $playerId" . $restriction);
        }
        $this->gamestate->jumpToState(ST_PLAYER_CHOOSE_ACTION);
    }

    function debugSetDestinationInHand($cardType, $playerId) {
        $card = $this->getDestinationFromDb(array_values($this->destinations->getCardsOfType(1, $cardType))[0]);
        $this->destinations->moveCard($card->id, 'hand', $playerId);
        return $card;
    }

    function debugEmptyDestinationDeck() {
        $this->destinations->moveAllCardsInLocation('deck', 'void');
    }

    function debugAlmostEmptyDestinationDeck() {
        $moveNumber = $this->getRemainingDestinationCardsInDeck() - 1;
        $this->destinations->pickCardsForLocation($moveNumber, 'deck', 'discard');
    }

    function exps() {
        $this->debugClaimExpeditionRoutes();
    }

    function clear() {
        self::DbQuery("DELETE FROM `claimed_routes`");
        $this->setGlobalVariable(LAST_BLUE_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_YELLOW_ROUTES, [null, null, null]);
        $this->setGlobalVariable(LAST_RED_ROUTES, [null, null, null]);
        $this->setGameStateValue(NEW_LOOP_COLOR, 0);
        $this->setGameStateValue(MAIN_ACTION_DONE, 0);
        $this->setGameStateValue(BLUEPOINT_ACTIONS_REMAINING, 0);
        $this->debugResetArrowsLeft();
        self::DbQuery("UPDATE `destination` set `completed` = false");
    }

    function debugClaimExpeditionRoutes(int $arrowsNb = 15) {
        foreach (COLORS as $color) {
            for ($i = 0; $i < $arrowsNb; $i++) {
                $claimableRoutes = $this->claimableRoutes($this->getActivePlayerId());
                $claimableRoutes = array_filter($claimableRoutes, fn ($r) => $r->color == $color);
                if ($claimableRoutes) {
                    $claimableIds = array_values(array_map(fn ($r) => $r->id, $claimableRoutes));
                    $claimedId = $claimableIds[bga_rand(0, count($claimableIds) - 1)];
                    $route = $this->array_find($this->ROUTES, fn ($r) => $r->id == $claimedId);
                    $this->debugClaimRoute($this->getActivePlayerId(), $route);
                } else {
                    break;
                }
            }
        }
    }

    function debugClaimRoute($playerId, $route) {
        $reverseDirection =  intval($this->guessDirection($route));
        self::DbQuery("INSERT INTO `claimed_routes` (`route_id`, `player_id`,`reverse_direction`) VALUES ($route->id, $playerId, $reverseDirection)");

        $remainingArrows = $this->getRemainingArrows($route->color);
        $this->setRemainingArrows($route->color, $remainingArrows - 1);

        $this->setLastClaimedRoute(new ClaimedRoute([
            'route_id' => $route->id,
            'player_id' => $playerId,
            'reverse_direction' => $reverseDirection,
        ]), $route->color);

        self::notifyAllPlayers('claimedRoute', clienttranslate('${player_name} places a ${color} arrow on the route from ${from} to ${to}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'route' => $route,
            'reverseDirection' => $reverseDirection,
            'from' => $this->getLocationName($reverseDirection ? $route->to : $route->from),
            'to' => $this->getLocationName($reverseDirection ? $route->from : $route->to),
            'color' => $this->getColorName($route->color),
            'claimedRoutes' => $this->getClaimedRoutes(),
        ]);
    }

    function debugArrowLeft() {
        $this->setRemainingArrows(BLUE, 0);
        $this->setRemainingArrows(YELLOW, 0);
        $this->setRemainingArrows(RED, 1);
    }

    function al() {
        $this->debugArrowLeft();
    }

    function debugResetArrowsLeft() {
        $this->setRemainingArrows(BLUE, 45);
        $this->setRemainingArrows(YELLOW, 45);
        $this->setRemainingArrows(RED, 45);
    }

    function loop() {
        $playerId = $this->getActivePlayerId();
        $this->clear();
        $routesInLoop = [9, 66, 471, 474];
        foreach ($routesInLoop as $routeId) {
            $this->debugClaimRoute($playerId, $this->ROUTES[$routeId]);
        }
    }

    function debugClaimAllRoutes($playerId, $ratio = 0.1) {
        foreach ($this->ROUTES as $id => $route) {
            if ((bga_rand(0, count($this->ROUTES) - 1) / (float)count($this->ROUTES)) < $ratio) {
                $this->debugClaimRoute($playerId, $id);
            }
        }
    }

    function debugClaimRoutes($playerId, $routesIds) {
        foreach ($routesIds as $routeId) {
            $this->debugClaimRoute($playerId, $routeId);
        }
    }

    // select all 3 destinations for each player
    function debugStart() {
        $playersIds = $this->getPlayersIds();
        foreach ($playersIds as $playerId) {
            $destinations = $this->getPickedDestinationCards($playerId);
            $ids = array_map(fn ($card) => $card->id, $destinations);
            $this->keepInitialDestinationCards($playerId, $ids);
        }

        $this->gamestate->jumpToState(ST_PLAYER_CHOOSE_ACTION);
    }

    public function debugReplacePlayersIds() {
        if ($this->getBgaEnvironment() != 'studio') {
            return;
        }

        // These are the id's from the BGAtable I need to debug.
        // SELECT JSON_ARRAYAGG(`player_id`) FROM `player`
        $ids = [90574255, 93146640];

        // Id of the first player in BGA Studio
        $sid = 2343492;

        foreach ($ids as $id) {
            // basic tables
            $this->DbQuery("UPDATE player SET player_id=$sid WHERE player_id = $id");
            $this->DbQuery("UPDATE global SET global_value=$sid WHERE global_value = $id");
            $this->DbQuery("UPDATE stats SET stats_player_id=$sid WHERE stats_player_id = $id");

            // 'other' game specific tables. example:
            // tables specific to your schema that use player_ids
            $this->DbQuery("UPDATE traincar SET card_location_arg=$sid WHERE card_location_arg = $id");
            $this->DbQuery("UPDATE destination SET card_location_arg=$sid WHERE card_location_arg = $id");
            $this->DbQuery("UPDATE claimed_routes SET player_id=$sid WHERE player_id = $id");

            ++$sid;
        }
    }

    function debug($debugData) {
        if ($this->getBgaEnvironment() != 'studio') {
            return;
        }
        die('debug data : ' . json_encode($debugData));
    }

    function endGame() {
        $this->gamestate->nextState("endGame");
    }

    /*
   * loadBug: in studio, type loadBug(20762) into the table chat to load a bug report from production
   * client side JavaScript will fetch each URL below in sequence, then refresh the page
   */
   /* public function loadBug($reportId) {
        $db = explode('_', self::getUniqueValueFromDB("SELECT SUBSTRING_INDEX(DATABASE(), '_', -2)"));
        $game = $db[0];
        $tableId = $db[1];
        self::notifyAllPlayers('loadBug', "Trying to load <a href='https://boardgamearena.com/bug?id=$reportId' target='_blank'>bug report $reportId</a>", [
            'urls' => [
                // Emulates "load bug report" in control panel
                "https://studio.boardgamearena.com/admin/studio/getSavedGameStateFromProduction.html?game=$game&report_id=$reportId&table_id=$tableId",

                // Emulates "load 1" at this table
                "https://studio.boardgamearena.com/table/table/loadSaveState.html?table=$tableId&state=1",

                // Calls the function below to update SQL
                "https://studio.boardgamearena.com/1/$game/$game/loadBugSQL.html?table=$tableId&report_id=$reportId",

                // Emulates "clear PHP cache" in control panel
                // Needed at the end because BGA is caching player info
                "https://studio.boardgamearena.com/admin/studio/clearGameserverPhpCache.html?game=$game",
            ]
        ]);
    }
*/
    /*
    * loadBugSQL: in studio, this is one of the URLs triggered by loadBug() above
    */
   /* public function loadBugSQL($reportId) {
        $studioPlayer = self::getCurrentPlayerId();
        $players = self::getObjectListFromDb("SELECT player_id FROM player", true);

        // Change for your game
        // We are setting the current state to match the start of a player's turn if it's already game over
        $sql = [
            "UPDATE global SET global_value=2 WHERE global_id=1 AND global_value=99"
        ];
        foreach ($players as $pId) {
            // All games can keep this SQL
            $sql[] = "UPDATE player SET player_id=$studioPlayer WHERE player_id=$pId";
            $sql[] = "UPDATE global SET global_value=$studioPlayer WHERE global_value=$pId";
            $sql[] = "UPDATE stats SET stats_player_id=$studioPlayer WHERE stats_player_id=$pId";
            $sql[] = "UPDATE gamelog SET gamelog_player=$studioPlayer WHERE gamelog_player=$pId";
            $sql[] = "UPDATE gamelog SET gamelog_current_player=$studioPlayer WHERE gamelog_current_player=$pId";
            $sql[] = "UPDATE gamelog SET gamelog_notification=REPLACE(gamelog_notification, $pId, $studioPlayer)";

            // TODO Add game-specific SQL updates for the tables, everywhere players ids are used in your game 
            $sql[] = "UPDATE deck SET card_location_arg=$studioPlayer WHERE card_location_arg=$pId";
            $sql[] = "UPDATE card SET card_location_arg=$studioPlayer WHERE card_location_arg=$pId";
            $sql[] = "UPDATE piece SET player_id=$studioPlayer WHERE player_id=$pId";
            $sql[] = "UPDATE log SET player_id=$studioPlayer WHERE player_id=$pId";
            $sql[] = "UPDATE log SET action_arg=REPLACE(action_arg, $pId, $studioPlayer)";

            // This could be improved, it assumes you had sequential studio accounts before loading
            // e.g., quietmint0, quietmint1, quietmint2, etc. are at the table
            $studioPlayer++;
        }
        $msg = "<b>Loaded <a href='https://boardgamearena.com/bug?id=$reportId' target='_blank'>bug report $reportId</a></b><hr><ul><li>" . implode(';</li><li>', $sql) . ';</li></ul>';
        self::warn($msg);
        self::notifyAllPlayers('message', $msg, []);

        foreach ($sql as $q) {
            self::DbQuery($q);
        }
        self::reloadPlayersBasicInfos();
        $this->gamestate->reloadState();
    }*/
}
