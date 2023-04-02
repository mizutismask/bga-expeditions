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

    function argChooseInitialDestinationsOld() {
        $playersIds = $this->getPlayersIds();

        $private = [];

        foreach ($playersIds as $playerId) {
            $private[$playerId] = [
                'destinations' => $this->getPickedDestinationCards($playerId),
            ];
        }

        return [
            'minimum' => $this->getInitialDestinationMinimumKept(),
            '_private' => $private,
        ];
    }

    function argPrivateChooseInitialDestinations(int $playerId) {
        return [
            'minimum' => $this->getInitialDestinationMinimumKept(),
            'destinations' => $this->getPickedDestinationCards($playerId),
        ];
    }

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

        $trainCarsHand = $this->getTrainCarsFromDb($this->trainCars->getCardsInLocation('hand', $playerId));
        // we don't limit claimable routes to the number of remaining train cars, because the players don't understand why they can't claim the route
        // so instead they'll get an error when they try to claim the route, saying they don't have enough train cars left
        $remainingTrainCars = 99;
        $realRemainingTrainCars = $this->getRemainingTrainCarsCount($playerId);

        $possibleRoutes = $this->claimableRoutes($playerId);
        $maxHiddenCardsPick = min(2, $this->getRemainingTrainCarCardsInDeck(true));
        $maxDestinationsPick = min($this->getAdditionalDestinationCardNumber(), $this->getRemainingDestinationCardsInDeck());

        $canClaimARoute = false;
        $costForRoute = [];

        $canTakeTrainCarCards = $this->getRemainingTrainCarCardsInDeck(true, true);

        $canPass = true;
        $canUseTicket = self::getGameStateValue(TICKETS_USED) < 2 && $this->getRemainingTicketsCount($playerId) > 0;
        return [
            'possibleRoutes' => $possibleRoutes,
            'costForRoute' => $costForRoute,
            'maxHiddenCardsPick' => $maxHiddenCardsPick,
            'maxDestinationsPick' => $maxDestinationsPick,
            'canTakeTrainCarCards' => $canTakeTrainCarCards,
            'canUseTicket' => $canUseTicket,
            'canPass' => $canPass,
            'remainingArrows' => [BLUE=> $this->getRemainingArrows(BLUE), YELLOW => $this->getRemainingArrows(YELLOW), RED => $this->getRemainingArrows(RED)]
        ];
    }

    function argDrawSecondCard() {
        $maxHiddenCardsPick = min(1, $this->getRemainingTrainCarCardsInDeck(true));
        $availableVisibleCards = $this->getVisibleTrainCarCards(true);

        return [
            'maxHiddenCardsPick' => $maxHiddenCardsPick,
            'availableVisibleCards' => $availableVisibleCards,
        ];
    }

    function argUseTicket() {
        return [
            'possibleRoutes' => [],
        ];
    }

    function argConfirmTunnel() {
        $playerId = intval(self::getActivePlayerId());

        $tunnelAttempt = $this->getGlobalVariable(TUNNEL_ATTEMPT);

        $route = $this->ROUTES[$tunnelAttempt->routeId];
        $remainingTrainCars = $this->getRemainingTrainCarsCount($playerId);
        $trainCarsHand = $this->getTrainCarsFromDb($this->trainCars->getCardsInLocation('hand', $playerId));
        $tunnelCost = $this->canPayForRoute($route, $trainCarsHand, $remainingTrainCars, $tunnelAttempt->color, $tunnelAttempt->extraCards);
        $canPay = $tunnelCost != null;

        $extraCards = null;
        if ($canPay) {
            $routeCost = $this->canPayForRoute($route, $trainCarsHand, $remainingTrainCars, $tunnelAttempt->color);
            $extraCards = array_values(array_filter($tunnelCost, fn ($tunnelCard) => !$this->array_some($routeCost, fn ($routeCard) => $routeCard->id == $tunnelCard->id)));
        }

        return [
            'tunnelAttempt' => $tunnelAttempt,
            'canPay' => $canPay,
            'colors' => $extraCards == null ? '' : array_map(fn ($card) => $card->type, $extraCards), // for title bar
            'extraCards' => $tunnelAttempt->extraCards, // for title bar
        ];
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
