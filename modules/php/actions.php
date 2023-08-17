<?php

trait ActionTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Player actions
    //////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in nicodemus.action.php)
    */
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
        self::notifyAllPlayers('ticketUsed', clienttranslate('${player_name} uses 1 ${ticket}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'canceled' => false,
            "ticket" => 1,
        ]);
        $this->incGameStateValue(TICKETS_USED, 1);

        self::incStat(1, STAT_TICKETS_USED, $playerId);

        $this->gamestate->nextState('useTicket');
    }

    public function undoTicket() {
        self::checkAction('undoTicket');
        $playerId = intval(self::getActivePlayerId());
        $this->dbIncField("player", "player_remaining_tickets", 1, "player_id", $playerId);
        self::notifyAllPlayers('ticketUsed', clienttranslate('${player_name} cancels the use of ${ticket}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'canceled' => true,
            "ticket" => 1,
        ]);
        $this->incGameStateValue(TICKETS_USED, -1);
        self::incStat(-1, STAT_TICKETS_USED, $playerId);
        $this->gamestate->nextState('continue');
    }

    /**
     * @param reverseDirection is provided only if routes can be taken in both direction
     */
    public function claimRoute(int $routeId, int $color, ?bool $reverseDirection) {
        self::checkAction('claimRoute');

        $playerId = intval(self::getActivePlayerId());

        $route = $this->getRoute($routeId);
        if ($route->color != $color) {
            self::notifyPlayer($playerId, 'msg', _("You clicked on a route of a different color than the one you selected"), []);
            return;
        }

        $remaining = $this->getRemainingArrows($color);
        if ($remaining <= 0) {
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
        $this->applyClaimRoute($playerId, $routeId, $color, $reverseDirection);
    }

    function applyClaimRoute(int $playerId, int $routeId, int $color, ?bool $choosedReverseDirection = null) {

        $route = $this->getRoute($routeId);
        //self::dump('*******************applyClaimRoute', $routeId);
        // self::dump('*******************', $route);
        if ($choosedReverseDirection) {
            $reverseDirection = $choosedReverseDirection;
        } else {
            $reverseDirection = $this->guessDirection($route);
        }
        //self::dump('**************reverseDirection*****', $reverseDirection);
        // save claimed route
        $reverseDirectionInt = intval($reverseDirection);
        self::DbQuery("INSERT INTO `claimed_routes` (`route_id`, `player_id`,`reverse_direction`) VALUES ($routeId, $playerId, $reverseDirectionInt)");

        $remainingArrows = $this->getRemainingArrows($color);
        $this->setRemainingArrows($color, $remainingArrows - 1);

        $this->setLastClaimedRoute(new ClaimedRoute([
            'route_id' => $routeId,
            'player_id' => $playerId,
            'reverse_direction' => $reverseDirection,
        ]), $color);

        //updating context
        $mainAction = false;
        if ($this->getGameStateValue(NEW_LOOP_COLOR)) {
            $this->setGameStateValue(NEW_LOOP_COLOR, 0);
        } else if ($this->gamestate->state()['name'] === "useTicket") {
            //it’s not the main action
        } else if ($this->getGameStateValue(BLUEPOINT_ACTIONS_REMAINING)) {
            $this->incGameStateValue(BLUEPOINT_ACTIONS_REMAINING, -1);
        } else {
            $mainAction = true;
            $this->setGameStateValue(MAIN_ACTION_DONE, 1);
        }

        $target = $reverseDirection ? $route->from : $route->to;
        $from = $reverseDirection ? $route->to : $route->from;
        $destinationColor = $this->getLocationColor($target);
        $mainActionMention = $mainAction ? clienttranslate("(Mandatory arrow)") : "";

        self::notifyAllPlayers('claimedRoute', clienttranslate('${player_name}: ${from} ${arrowColor} ${to} ${mainActionMention}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'route' => $route,
            'reverseDirection' => $reverseDirection,
            'from' => $this->getLocationName($reverseDirection ? $route->to : $route->from),
            'to' => $this->getLocationName($reverseDirection ? $route->from : $route->to),
            'arrowColor' => $color,
            'ticketsGained' => $destinationColor == RED ? 1 : 0,
            'isDestinationBlue' => $destinationColor == BLUE ? 1 : 0,
            'claimedRoutes' => $this->getClaimedRoutes(),
            'mainActionMention' => $mainActionMention,
            'i18n' => array('mainActionMention'),
        ]);
        $this->incGlobalVariable(ARROW_COUNT_BY_TURN, 1);

        $this->applyDestinationColorEffect($playerId, $target, $color);
        $loop = $this->checkLoop($playerId, $route, $reverseDirection);
        $this->updateArrowsStateValues($color, $loop, $from === STARTING_POINT,  $routeId);

        $this->nextState($playerId, $loop);
        // in case there is less than 6 visible cards on the table, we refill
        $this->checkVisibleSharedCardsAreEnough();
    }

    function updateArrowsStateValues($color, $loop, $fromStartingPoint,  $routeId) {
        $loopHappenedOnceMin = intval($this->getColoredGameStateValue("ARROWS_SINCE_LOOP", $color)) != -1;
        switch ($color) {
            case BLUE:
                if ($loop) {
                    $this->setGameStateValue(ARROWS_SINCE_LOOP_BLUE, 0);
                } else if ($loopHappenedOnceMin) {
                    $this->incGameStateValue(ARROWS_SINCE_LOOP_BLUE, 1);
                }
                if ($fromStartingPoint) {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_BLUE, $routeId);
                } else {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_BLUE, 0);
                }
                break;
            case YELLOW:
                if ($loop) {
                    $this->setGameStateValue(ARROWS_SINCE_LOOP_YELLOW, 0);
                } else  if ($loopHappenedOnceMin) {
                    $this->incGameStateValue(ARROWS_SINCE_LOOP_YELLOW, 1);
                }
                if ($fromStartingPoint) {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_YELLOW, $routeId);
                } else {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_YELLOW, 0);
                }
                break;
            case RED:
                if ($loop) {
                    $this->setGameStateValue(ARROWS_SINCE_LOOP_RED, 0);
                } else if ($loopHappenedOnceMin) {
                    $this->incGameStateValue(ARROWS_SINCE_LOOP_RED, 1);
                }
                if ($fromStartingPoint) {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_RED, $routeId);
                } else {
                    $this->setGameStateValue(LAST_ARROW_FROM_START_RED, 0);
                }
                break;
        }
    }
    private function nextState($playerId, $loop) {
        if ($this->noArrowLeft() || $this->isTurnFinished($playerId, $loop)) {
            $this->gamestate->nextState('nextPlayer');
        } else {
            $this->gamestate->nextState('continue');
        }
    }

    private function isTurnFinished($playerId, $loop) {
        return boolval($this->getGameStateValue(MAIN_ACTION_DONE)) && !$loop && !$this->canUseTicket($playerId) && $this->getGameStateValue(BLUEPOINT_ACTIONS_REMAINING) == 0;
    }

    private function canUseTicket($playerId) {
        return $this->getRemainingTicketsCount($playerId) > 0 && $this->getGameStateValue(TICKETS_USED) < 2;
    }

    private function applyDestinationColorEffect(int $playerId, int $destination, int $routeColor): void {
        $destinationColor = $this->getLocationColor($destination);
        switch ($destinationColor) {
            case GREEN_CITY:
                $this->checkCompletedDestinations($playerId, $destination);
                break;
            case RED_CITY:
                $this->earnTicket($playerId);
                break;
            case BLUE_CITY:
                self::incStat(1, STAT_BLUE_LOCATIONS_REACHED, $playerId);
                if ($this->noArrowLeft()) {
                    self::notifyAllPlayers('msg', clienttranslate('There are no arrows of any color left, so ${player_name} can not use the benefit of the blue location.'), [
                        'playerId' => $playerId,
                        'player_name' => $this->getPlayerName($playerId),
                    ]);
                } else {
                    $this->incGameStateValue(BLUEPOINT_ACTIONS_REMAINING, 1);
                    self::notifyAllPlayers('msg', clienttranslate('${color} expedition ends on a blue point, so ${player_name} can play again.'), [
                        'playerId' => $playerId,
                        'player_name' => $this->getPlayerName($playerId),
                        'color' => $this->getColorName($routeColor),
                    ]);
                }
                break;
        }
    }

    public function unclaimRoute(int $routeId) {
        self::checkAction('unclaimRoute');

        $playerId = intval(self::getActivePlayerId());

        if ($this->getUniqueIntValueFromDB("SELECT count(*) FROM `claimed_routes` WHERE `route_id` = $routeId") == 0) {
            throw new BgaUserException("There is no arrow on this route.");
        }

        $possibleRoutes = $this->unclaimableRoutes($playerId);
        if (!$this->array_some($possibleRoutes, fn ($possibleRoute) => $possibleRoute->id == $routeId)) {
            throw new BgaUserException("You can only remove the arrow at the end of an expedition");
        }

        $route = $this->getRoute($routeId);
        $claimedRoute = $this->getClaimedRoute($routeId);

        $remainingArrows = $this->getRemainingArrows($route->color);
        $this->setRemainingArrows($route->color, $remainingArrows + 1);

        $target = $this->getRouteDestination($route, $claimedRoute);
        $origin = $this->getRouteOrigin($route, $claimedRoute);
        $destinationColor = $this->getLocationColor($origin);

        self::notifyAllPlayers('unclaimedRoute', clienttranslate('${player_name} removes a ${color} arrow on the route from ${from} to ${to}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'route' => $route,
            'reverseDirection' => $claimedRoute->reverseDirection,
            'from' => $this->getLocationName($origin),
            'to' => $this->getLocationName($target),
            'color' => $this->getColorName($route->color),
            'ticketsGained' => $destinationColor == RED ? 1 : 0,
        ]);
        $this->applyDestinationColorEffect($playerId, $origin, $route->color);

        $loop = $this->checkLoopAfterUnclaim($playerId, $route, $claimedRoute->reverseDirection);
        self::DbQuery("DELETE FROM `claimed_routes` where `route_id` = $routeId");
        $this->unshiftLastClaimedRoute($route->color);

        self::notifyAllPlayers('newLastArrow', "", [
            'newLastArrow' => $this->getLastArrows()[$route->color],
        ]);

        $this->nextState($playerId, $loop);
    }

    private function earnTicket(int $playerId) {
        $this->dbIncField("player", "player_remaining_tickets", 1, "player_id", $playerId);
        self::incStat(1, STAT_TICKETS_EARNED, $playerId);
        self::notifyAllPlayers('msg', clienttranslate('${player_name} gains 1 ${ticket}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'ticket' => 1,
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
            $this->loopFound($playerId, $claimedRoute->color);
        }
        return $this->isLoopUsefull($loop, $claimedRoute->color);
    }

    private function loopFound(int $playerId, int $color, bool $removingArrow = false) {
        self::incStat(1, STAT_LOOPS, $playerId);

        if ($this->getRemainingArrows($color) === 0) {
            self::notifyAllPlayers('msg', clienttranslate('There are no more ${color} arrows, so ${player_name} can not use the benefit of the loop just made.'), [
                'playerId' => $playerId,
                'player_name' => $this->getPlayerName($playerId),
                'color' => $this->getColorName($color),
            ]);
        } else {
            $this->setGameStateValue(NEW_LOOP_COLOR, $color);

            if (!$removingArrow) {
                self::notifyAllPlayers('msg', clienttranslate('${player_name} made a loop with the ${color} expedition. A new arrow can be placed to continue it from any point.'), [
                    'playerId' => $playerId,
                    'player_name' => $this->getPlayerName($playerId),
                    'color' => $this->getColorName($color),
                ]);
            } else {
                self::notifyAllPlayers('msg', clienttranslate('${player_name} made a loop removing the last arrow from the ${color} expedition. A new arrow can be placed to continue it from any point.'), [
                    'playerId' => $playerId,
                    'player_name' => $this->getPlayerName($playerId),
                    'color' => $this->getColorName($color),
                ]);
            }
        }
    }

    /**
     * Searches if there is a coming in and out claimed route of the same color connected to the origin of the removed arrow
     */
    private function checkLoopAfterUnclaim($playerId, Route $unclaimedRoute, $reverseDirection): bool {
        $loop = false;
        $route = $this->getRoute($unclaimedRoute->id);
        $claimedRoute = $this->getClaimedRoute($unclaimedRoute->id);

        $origin = $this->getRouteOrigin($route, $claimedRoute);

        $claimedRoutes = $this->getClaimedRoutes();
        $comingOut = array_filter($claimedRoutes, fn ($route) => $this->getRoute($route->routeId)->color === $unclaimedRoute->color && $this->getRouteOriginFromRouteId($route->routeId) === $origin && $route->routeId !== $unclaimedRoute->id);
        $comingIn = array_filter($claimedRoutes, fn ($route) => $this->getRoute($route->routeId)->color === $unclaimedRoute->color && $this->getRouteDestinationFromRouteId($route->routeId) === $origin && $route->routeId !== $unclaimedRoute->id);
        //self::dump("*******************coming in", $comingIn);
        //self::dump("*******************coming out", $comingOut);
        //self::dump("*******************ARROWS_SINCE_LOOP",$this->getColoredGameStateValue("ARROWS_SINCE_LOOP", $route->color));
        //self::dump("*******************LAST_ARROW_FROM_START",$this->getColoredGameStateValue("LAST_ARROW_FROM_START", $route->color));
        $removingFromStartAfterLoop = $this->getColoredGameStateValue("ARROWS_SINCE_LOOP", $route->color) == 1 && $this->getColoredGameStateValue("LAST_ARROW_FROM_START", $route->color) == $unclaimedRoute->id;
        $loop = (!empty($comingOut) && !empty($comingIn)) || $removingFromStartAfterLoop;
        if ($loop) {
            $this->loopFound($playerId, $unclaimedRoute->color);
        }
        return $this->isLoopUsefull($loop, $unclaimedRoute->color);
    }

    private function isLoopUsefull($loop, $routeColor): bool {
        return $loop && $this->getRemainingArrows($routeColor) >= 0;
    }

    function guessDirection(Route $claimedRoute): bool {
        $reversed = false;
        $loopColor = $this->getGamestateValue(NEW_LOOP_COLOR);
        if ($loopColor) {
            //if there is at least one arrow at one of the end of this arrow, this end with arrow(s) becomes the origin of the claimed route
            $claimedRoutes = $this->getClaimedRoutes();
            $connectedRoutes = $this->getRoutesConnectedToCity($claimedRoute->from, $claimedRoute->color);
            $claimedRoutesIds = array_map(fn ($claimedRoute) => $claimedRoute->routeId, array_values($claimedRoutes));
            $claimedConnectedRoutes = array_filter($connectedRoutes, fn ($route) => in_array($route->id, $claimedRoutesIds) && $route->id !== $claimedRoute->id);
            $reversed = $claimedRoute->from > $claimedRoute->to;

            if (!$claimedConnectedRoutes) {
                $connectedRoutes = $this->getRoutesConnectedToCity($claimedRoute->to, $claimedRoute->color);
                $claimedConnectedRoutes = array_filter($connectedRoutes, fn ($route) => in_array($route->id, $claimedRoutesIds) && $route->id !== $claimedRoute->id);
                $reversed = $claimedRoute->to > $claimedRoute->from;
            }

            if (!$claimedConnectedRoutes) {
                throw new BgaSystemException("There is no claimed route from neither of the end points of " . $claimedRoute->from . "->" . $claimedRoute->to);
            }
        } else {
            $previous = $this->getLastClaimedRoute($claimedRoute->color);
            if ($previous) {
                $previousRoute = $this->getRoute($previous->routeId);
                $previousTo = $previous->reverseDirection ? $previousRoute->from : $previousRoute->to;
                $this->logRoute("previousRoute", $previousRoute, $previous->reverseDirection);
                $junction = $previousTo == $claimedRoute->from ? $claimedRoute->from : $claimedRoute->to;
                $end = $junction == $claimedRoute->from ? $claimedRoute->to : $claimedRoute->from;
                $reversed = $junction > $end;
            } else {
                // self::dump('*******************No previous route of color', $claimedRoute->color);
            }
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
        $max = 3;
        switch ($color) {
            case BLUE:
                $oldValue = $this->getGlobalVariable(LAST_BLUE_ROUTES);
                array_unshift($oldValue, $value);
                $shiftedArray = array_slice($oldValue, 0, $max);
                return $this->setGlobalVariable(LAST_BLUE_ROUTES, $shiftedArray);
            case YELLOW:
                $oldValue = $this->getGlobalVariable(LAST_YELLOW_ROUTES);
                array_unshift($oldValue, $value);
                $shiftedArray = array_slice($oldValue, 0, $max);
                return $this->setGlobalVariable(LAST_YELLOW_ROUTES, $shiftedArray);
            case RED:
                $oldValue = $this->getGlobalVariable(LAST_RED_ROUTES);
                array_unshift($oldValue, $value);
                $shiftedArray = array_slice($oldValue, 0, $max);
                return $this->setGlobalVariable(LAST_RED_ROUTES, $shiftedArray);
        }
    }

    public function unshiftLastClaimedRoute(int $color) {
        $max = 3;
        switch ($color) {
            case BLUE:
                $oldValue = $this->getGlobalVariable(LAST_BLUE_ROUTES);
                array_shift($oldValue);
                $shiftedArray = array_pad($oldValue, $max, null);
                return $this->setGlobalVariable(LAST_BLUE_ROUTES, $shiftedArray);
            case YELLOW:
                $oldValue = $this->getGlobalVariable(LAST_YELLOW_ROUTES);
                array_shift($oldValue);
                $shiftedArray = array_pad($oldValue, $max, null);
                return $this->setGlobalVariable(LAST_YELLOW_ROUTES, $shiftedArray);
            case RED:
                $oldValue = $this->getGlobalVariable(LAST_RED_ROUTES);
                array_shift($oldValue);
                $shiftedArray = array_pad($oldValue, $max, null);
                return $this->setGlobalVariable(LAST_RED_ROUTES, $shiftedArray);
        }
    }

    /**
     * @return the last ClaimedRoute of the color if existing.
     */
    public function getLastClaimedRoute(int $color): ?ClaimedRoute {
        $arrayData = null;
        switch ($color) {
            case BLUE:
                $arrayData = $this->getGlobalVariable(LAST_BLUE_ROUTES, false)[0];
                break;
            case YELLOW:
                $arrayData = $this->getGlobalVariable(LAST_YELLOW_ROUTES, false)[0];
                break;
            case RED:
                $arrayData = $this->getGlobalVariable(LAST_RED_ROUTES, false)[0];
                break;
        }
        $casted = $this->getClaimedRouteFromGlobal($arrayData);
        //self::dump('*****************$getLastClaimedRoute**', $casted);
        return $casted;
    }

    function incGlobalVariable(string $globalVariableName, int $value) {
        $old = $this->getGameStateValue($globalVariableName);
        $this->setGameStateValue($globalVariableName, $old + $value);
    }
}
