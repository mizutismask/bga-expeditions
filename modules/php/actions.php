<?php

require_once(__DIR__ . '/objects/tunnel-attempt.php');

trait ActionTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Player actions
    //////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in nicodemus.action.php)
    */

    public function chooseInitialDestinations(array $ids) {
        self::checkAction('chooseInitialDestinations');

        $playerId = intval(self::getCurrentPlayerId());

        $this->keepInitialDestinationCards($playerId, $ids);


        $this->gamestate->setPlayerNonMultiactive($playerId, 'start');
        self::giveExtraTime($playerId);
    }

    public function revealDestination(int $id) {
        self::checkAction('revealDestination');

        $playerId = intval(self::getCurrentPlayerId());
        $this->revealDestinationCard($playerId, $id);

        self::giveExtraTime($playerId);
        $this->gamestate->nextState('nextReveal');
    }

    public function chooseAdditionalDestinations(int $keptDestinationsId, int $discardedDestinationId) {
        self::checkAction('chooseAdditionalDestinations');

        $playerId = intval(self::getActivePlayerId());

        $this->keepAdditionalDestinationCards($playerId, $keptDestinationsId, $discardedDestinationId);

        if ($keptDestinationsId)
            self::incStat(1, STAT_KEPT_ADDITIONAL_DESTINATION_CARDS, $playerId);

        $this->gamestate->nextState('continue');
    }

    public function drawDeckCards(int $number) {
        self::checkAction('drawDeckCards');

        $playerId = intval(self::getActivePlayerId());

        $drawNumber = $this->drawTrainCarCardsFromDeck($playerId, $number);


        $this->gamestate->nextState($number == 1 && $this->canTakeASecondCard(null) ? 'drawSecondCard' : 'nextPlayer');
    }

    public function drawTableCard(int $id) {
        self::checkAction('drawTableCard');

        $playerId = intval(self::getActivePlayerId());

        $card = $this->drawTrainCarCardsFromTable($playerId, $id);


        $this->gamestate->nextState($this->canTakeASecondCard($card->type) ? 'drawSecondCard' : 'nextPlayer');
    }

    public function drawSecondDeckCard() {
        self::checkAction('drawSecondDeckCard');

        $playerId = intval(self::getActivePlayerId());

        $this->drawTrainCarCardsFromDeck($playerId, 1, true);

        $this->gamestate->nextState('nextPlayer');
    }

    public function drawSecondTableCard(int $id) {
        self::checkAction('drawSecondTableCard');

        $playerId = intval(self::getActivePlayerId());

        $card = $this->drawTrainCarCardsFromTable($playerId, $id, true);


        $this->gamestate->nextState('nextPlayer');
    }

    public function drawDestinations() {
        self::checkAction('drawDestinations');

        $playerId = intval(self::getActivePlayerId());

        $remainingDestinationsCardsInDeck = $this->getRemainingDestinationCardsInDeck();
        if ($remainingDestinationsCardsInDeck == 0) {
            throw new BgaUserException(self::_("You can't take new Destination cards because the deck is empty"));
        }

        $this->pickAdditionalDestinationCards($playerId);

        $this->gamestate->nextState('tradeDestination');
    }

    public function useTicket() {
        self::checkAction('useTicket');

        $playerId = intval(self::getActivePlayerId());

        if ($this->getRemainingTicketsCount($playerId) == 0) {
            throw new BgaUserException(self::_("You don't have any ticket"));
        }
        if (self::getGameStateValue(TICKETS_USED) == 2) {
            throw new BgaUserException(self::_("You've already used 2 tickets on this turn"));
        }

        $this->dbIncField("player", "player_remaining_tickets", -1, "player_id", $playerId);
        self::notifyAllPlayers('msg', clienttranslate('${player_name} uses 1 ticket'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
        ]);
        $this->incGameStateValue(TICKETS_USED, 1);

        self::incStat(1, STAT_TICKETS_USED, $playerId);

        $this->gamestate->nextState('useTicket');
    }

    public function claimRoute(int $routeId, int $color) {
        self::checkAction('claimRoute');

        $playerId = intval(self::getActivePlayerId());

        //$route = $this->$this->getAllRoutes()[$routeId];

        $remainingTrainCars = $this->getRemainingArrows($color);
        if ($remainingTrainCars <= 0) {
            self::notifyPlayer($playerId, 'notEnoughTrainCars', _("All arrows of this color have been used"), []);
            return;
        }

        if ($this->getUniqueIntValueFromDB("SELECT count(*) FROM `claimed_routes` WHERE `route_id` = $routeId") > 0) {
            throw new BgaUserException("Route is already claimed.");
        }

        $possibleRoutes = $this->claimableRoutes($playerId);
        if (!$this->array_some($possibleRoutes, fn ($possibleRoute) => $possibleRoute->id == $routeId)) {
            throw new BgaUserException("You can't claim this route");
        }
        $this->applyClaimRoute($playerId, $routeId, $color, 0);
    }

    function applyClaimRoute(int $playerId, int $routeId, int $color, int $extraCardCost = 0) {
        if ($this->getGameStateValue(NEW_LOOP_COLOR)) {
            $this->setGameStateValue(NEW_LOOP_COLOR, 0);
        }
        $route = $this->getRoute($routeId);
        //self::dump('*******************applyClaimRoute', $routeId);
        // self::dump('*******************', $route);
        $reverseDirection = $this->guessDirection($route);
        $rdIntValue =  intval($this->guessDirection($route));
        //self::dump('**************reverseDirection*****', $reverseDirection);
        // save claimed route
        self::DbQuery("INSERT INTO `claimed_routes` (`route_id`, `player_id`,`reverse_direction`) VALUES ($routeId, $playerId, $rdIntValue)");

        $remainingArrows = $this->getRemainingArrows($color);
        $this->setRemainingArrows($color, $remainingArrows - 1);

        $this->setLastClaimedRoute(new ClaimedRoute([
            'route_id' => $routeId,
            'player_id' => $playerId,
            'reverse_direction' => $reverseDirection,
        ]), $color);

        self::notifyAllPlayers('claimedRoute', clienttranslate('${player_name} places a ${color} arrow on the route from ${from} to ${to}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'route' => $route,
            'from' => $this->getLocationName($reverseDirection ? $route->to : $route->from),
            'to' => $this->getLocationName($reverseDirection ? $route->from : $route->to),
            'color' => $this->getColorName($color),
        ]);

        $targetColor = $this->getLocationColor($reverseDirection ? $route->from : $route->to);
        $loop = $this->checkLoop($playerId, $route, $reverseDirection);
        $continuesPlaying = false;
        switch ($targetColor) {
            case GREEN_CITY:
                $this->checkCompletedDestinations($playerId, $route, $reverseDirection);
                break;
            case RED_CITY:
                self::incStat(1, STAT_RED_LOCATIONS_REACHED, $playerId);
                $this->earnTicket($playerId);
                $continuesPlaying = true;
                break;
            case BLUE_CITY:
                self::incStat(1, STAT_BLUE_LOCATIONS_REACHED, $playerId);
                if ($this->getRemainingArrows($color) == 0) {
                    self::notifyAllPlayers('msg', clienttranslate('There are no more {$color} arrows, so ${player_name} can not use the benefit of the blue location.'), [
                        'playerId' => $playerId,
                        'player_name' => $this->getPlayerName($playerId),
                        'color' => $this->getColorName($color),
                    ]);
                } else {
                    $continuesPlaying = true;
                }
                break;
        }
        if ($loop) {
            self::incStat(1, STAT_LOOPS, $playerId);
        }

        // in case there is less than 5 visible cards on the table, we refill with newly discarded cards
        //$this->checkVisibleTrainCarCards();
        self::dump('**************continuesPlaying****', $continuesPlaying);
        if (!$loop && !$continuesPlaying) {
            $this->gamestate->nextState('nextPlayer');
        }
    }

    private function earnTicket(int $playerId) {
        $this->dbIncField("player", "player_remaining_tickets", 1, "player_id", $playerId);
        self::incStat(1, STAT_TICKETS_EARNED, $playerId);
        self::notifyAllPlayers('msg', clienttranslate('${player_name} gains 1 ticket'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
        ]);
    }

    /**
     * Searches if there is a claimed route of the same color connected to the point of the new arrow
     */
    private function checkLoop($playerId, Route $claimedRoute, $reverseDirection): bool {
        $loop = false;
        $target = $reverseDirection ? $claimedRoute->from : $claimedRoute->to;
        $connectedRoutes = $this->getRoutesConnectedToCity($target, $claimedRoute->color);
        $claimedRoutes = $this->getClaimedRoutes();
        $claimedRoutesIds = array_map(fn ($claimedRoute) => $claimedRoute->routeId, array_values($claimedRoutes));
        $claimedConnectedRoutes = array_filter($connectedRoutes, fn ($route) => in_array($route->id, $claimedRoutesIds) && $route->id !== $claimedRoute->id);
        //self::dump('*******************loop with', $claimedConnectedRoutes);
        $loop = !empty($claimedConnectedRoutes);
        if ($loop) {
            $this->setGameStateValue(NEW_LOOP_COLOR, $claimedRoute->color);

            self::notifyAllPlayers('msg', clienttranslate('${player_name} made a loop with the ${color} expedition. A new arrow can be placed to continue it from any point.'), [
                'playerId' => $playerId,
                'player_name' => $this->getPlayerName($playerId),
                'color' => $this->getColorName($claimedRoute->color),
            ]);
        }
        return $loop;
    }

    function guessDirection(Route $claimedRoute): bool {
        $reversed = false;
        $previous = $this->getLastClaimedRoute($claimedRoute->color);
        if ($previous) {
            $previousRoute = $this->getRoute($previous->routeId);
            $previousTo = $previous->reverseDirection ? $previousRoute->from : $previousRoute->to;
            $this->logRoute("previousRoute", $previousRoute, $previous->reverseDirection);
            $junction = $previousTo == $claimedRoute->from ? $claimedRoute->from : $claimedRoute->to;
            $end = $junction == $claimedRoute->from ? $claimedRoute->to : $claimedRoute->from;
            $reversed = $junction > $end;
        } else {
            self::dump('*******************No previous route of color', $claimedRoute->color);
        }
        return $reversed;
    }

    function logRoute(string $msg, Route $route, bool $reverse) {
        self::dump('*******************' . $msg, "from " . ($reverse ? $route->to : $route->from) . " to " . ($reverse ? $route->from : $route->to));
    }

    function pass() {
        self::checkAction('pass');

        $args = $this->argChooseAction();

        if (!$args['canPass']) {
            throw new BgaUserException("You cannot pass");
        }

        $this->gamestate->nextState('nextPlayer');
    }

    public function claimTunnel() {
        self::checkAction('claimTunnel');

        $playerId = intval(self::getActivePlayerId());

        $tunnelAttempt = $this->getGlobalVariable(TUNNEL_ATTEMPT);

        $this->endTunnelAttempt(true);

        $this->applyClaimRoute($playerId, $tunnelAttempt->routeId, $tunnelAttempt->color, $tunnelAttempt->extraCards);
        // applyClaimRoute handles the call to nextState
    }

    public function skipTunnel() {
        self::checkAction('skipTunnel');

        $playerId = intval(self::getActivePlayerId());

        $this->endTunnelAttempt(true);

        self::notifyAllPlayers('log', /* TODO MAPS clienttranslate*/ ('${player_name} skip tunnel claim'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
        ]);

        $this->gamestate->nextState('nextPlayer');
    }

    function endTunnelAttempt(bool $storedTunnelAttempt) {
        // put back tunnel cards
        $this->trainCars->moveAllCardsInLocation('tunnel', 'discard');

        if ($storedTunnelAttempt) {
            $this->deleteGlobalVariable(TUNNEL_ATTEMPT);
        }
    }


    public function getRemainingArrows($color) {
        switch ($color) {
            case BLUE:
                return intval($this->getGameStateValue(REMAINING_BLUE_ARROWS));
            case YELLOW:
                return intval($this->getGameStateValue(REMAINING_YELLOW_ARROWS));
            case RED:
                return intval($this->getGameStateValue(REMAINING_RED_ARROWS));
        }
    }

    public function setRemainingArrows($color, $value) {
        switch ($color) {
            case BLUE:
                return $this->setGameStateValue(REMAINING_BLUE_ARROWS, $value);
            case YELLOW:
                return $this->setGameStateValue(REMAINING_YELLOW_ARROWS, $value);
            case RED:
                return $this->setGameStateValue(REMAINING_RED_ARROWS, $value);
        }
    }

    public function setLastClaimedRoute(ClaimedRoute $value, int $color) {
        switch ($color) {
            case BLUE:
                return $this->setGlobalVariable(LAST_BLUE_ROUTE, $value);
            case YELLOW:
                return $this->setGlobalVariable(LAST_YELLOW_ROUTE, $value);
            case RED:
                return $this->setGlobalVariable(LAST_RED_ROUTE, $value);
        }
    }

    /**
     * @return the last ClaimedRoute of the color if existing.
     */
    public function getLastClaimedRoute(int $color): ?ClaimedRoute {
        $arrayData = null;
        switch ($color) {
            case BLUE:
                $arrayData = $this->getGlobalVariable(LAST_BLUE_ROUTE, false);
                break;
            case YELLOW:
                $arrayData = $this->getGlobalVariable(LAST_YELLOW_ROUTE, false);
                break;
            case RED:
                $arrayData = $this->getGlobalVariable(LAST_RED_ROUTE, false);
                break;
        }
        $casted = $this->getClaimedRouteFromGlobal($arrayData);
        self::dump('*****************$getLastClaimedRoute**', $casted);
        return $casted;
    }

    function incGlobalVariable(string $globalVariableName, int $value) {
        $old = $this->getGameStateValue($globalVariableName);
        $this->setGameStateValue($globalVariableName, $old + $value);
    }
}
