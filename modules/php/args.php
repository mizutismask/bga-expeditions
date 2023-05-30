<?php

trait ArgsTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Game state arguments
    ////////////

    /*
        Here, you can create methods defined as "game state arguments" (see "args" property in states.inc.php).
        These methods function is to return some additional information that is specific to the current
        game state.
    */
    function argChooseAdditionalDestinations() {
        $playerId = intval(self::getActivePlayerId());

        $destinations = $this->getPickedDestinationCards($playerId);

        return [
            'minimum' => ADDITIONAL_DESTINATION_MINIMUM_KEPT,
            '_private' => [          // Using "_private" keyword, all data inside this array will be made private
                'active' => [       // Using "active" keyword inside "_private", you select active player(s)
                    'destinations' => $destinations,   // will be send only to active player(s)
                ]
            ],
        ];
    }

    function argChooseAction() {
        $playerId = intval(self::getActivePlayerId());

        $possibleRoutes = $this->claimableRoutes($playerId);
        $loopToResolve =!empty($this->getGameStateValue(NEW_LOOP_COLOR));
        $mainActionDone=boolval($this->getGameStateValue(MAIN_ACTION_DONE));
        $hasBlueActions=intval($this->getGameStateValue(BLUEPOINT_ACTIONS_REMAINING))>0;
        $canPass = $mainActionDone && !$loopToResolve && !$hasBlueActions;
        $canUseTicket = $this->canUseTicket($playerId) && !$loopToResolve && !$hasBlueActions;//no loop needing resolving nor blue point
        return [
            'possibleRoutes' => $possibleRoutes,
            'canUseTicket' => $canUseTicket,
            'canPass' => $canPass,
            'remainingArrows' => [BLUE => $this->getRemainingArrows(BLUE), YELLOW => $this->getRemainingArrows(YELLOW), RED => $this->getRemainingArrows(RED)],
            'loopToResolve' => $loopToResolve,
            //'canPlaceArrow' => !$mainActionDone,
            'mainActionDone' => $mainActionDone,
        ];
    }

    function argUseTicket() {
        $playerId = intval(self::getActivePlayerId());
        return [
            'possibleRoutes' => $this->claimableRoutes($playerId),
            'unclaimableRoutes' => $this->unclaimableRoutes(),
            'remainingArrows' => [BLUE => $this->getRemainingArrows(BLUE), YELLOW => $this->getRemainingArrows(YELLOW), RED => $this->getRemainingArrows(RED)]
        ];
    }

    function unclaimableRoutes() {
        return array_map(
            fn ($claimedRoute) => $this->getRoute($claimedRoute->routeId),
            array_values(
                array_filter(
                    [$this->getLastClaimedRoute(BLUE), $this->getLastClaimedRoute(YELLOW), $this->getLastClaimedRoute(RED)],
                    fn ($route) => $route != null
                )
            ),
        );
    }

    function argRevealDestination() {
        $playerId = intval(self::getActivePlayerId());
        return [
            '_private' => [          // Using "_private" keyword, all data inside this array will be made private
                'active' => [       // Using "active" keyword inside "_private", you select active player(s)
                    'allDestinations' => $this->getPickedDestinationCards($playerId),
                    'possibleDestinations' => $this->getRevealableDestinations(
                        intval(self::getActivePlayerId())
                    ),  // will be send only to active player(s)
                ]
            ],
        ];
    }
}
