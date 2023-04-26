<?php

require_once(__DIR__ . '/objects/destination.php');

trait DestinationDeckTrait {

    /**
     * Create destination cards.
     */
    public function createDestinations() {
        $destinations = $this->getDestinationToGenerate();

        $this->destinations->createCards($destinations, 'deck');
        $this->destinations->shuffle('deck');
    }

    /**
     * Pick destination cards for beginning choice.
     */
    public function pickInitialDestinationCards(int $playerId) {
        $cardsNumber = $this->getInitialDestinationCardNumber();
        $cards = $this->pickDestinationCards($playerId, $cardsNumber);

        $notFarEnough = array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) !== false);

        while ($cardsNumber - count($notFarEnough) < FAR_DESTINATIONS_MINIMUM) {
            //discard and repick until there is enough far destinations
            $toDiscard = array_shift($notFarEnough);
            unset($cards[array_search($toDiscard, $cards)]);
            $this->destinations->playCard($toDiscard->id);

            $replacements = $this->pickDestinationCards($playerId, 1);
            $replacement = array_shift($replacements);
            $cards[] = $replacement;
            $notFarEnough = array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) !== false);
        }
        $this->keepInitialDestinationCards($playerId, $this->getDestinationIds($cards), $this->getInitialDestinationCardNumber());

        return $cards;
    }

    /**
     * Pick destination cards for beginning choice.
     */
    public function pickInitialSharedDestinationCards() {
        $cards = $this->pickSharedDestinationCards(NUMBER_OF_SHARED_DESTINATION_CARDS);
        $notFarEnough = array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) !== false);

        while (count($notFarEnough) > 0) {
            //discard and repick until all destinations are far enough
            $toDiscard = array_shift($notFarEnough);
            unset($cards[array_search($toDiscard, $cards)]);
            $this->destinations->playCard($toDiscard->id);

            $replacements = $this->pickSharedDestinationCards(1);
            $replacement = array_shift($replacements);
            $cards[] = $replacement;
            $notFarEnough = array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) !== false);
        }

        return $cards;
    }

    public function getRevealableDestinations(int $playerId) {
        $cards = $this->getPlayerDestinationCards($playerId);
        return array_values(array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) === false));
    }

    /**
     * Pick destination cards for pick destination action.
     */
    public function pickAdditionalDestinationCards(int $playerId) {
        return $this->pickDestinationCards($playerId, $this->getAdditionalDestinationCardNumber());
    }

    /**
     * Select kept destination card for pick destination action. 
     * Unused destination cards are discarded.
     */
    public function keepAdditionalDestinationCards(int $playerId, int $keptDestinationsId, int $discardedDestinationId) {
        $this->keepDestinationCards($playerId, $keptDestinationsId, $discardedDestinationId);
    }

    /**
     * Get destination picked cards (cards player can choose).
     */
    public function getPickedDestinationCards(int $playerId) {
        $cards = $this->getDestinationsFromDb($this->destinations->getCardsInLocation("pick$playerId"));
        return $cards;
    }

    /**
     * Get destination cards in player hand.
     */
    public function getPlayerDestinationCards(int $playerId) {
        $cards = $this->getDestinationsFromDb($this->destinations->getCardsInLocation("hand",$playerId));
        return $cards;
    }

    /**
     * get remaining destination cards in deck.
     */
    public function getRemainingDestinationCardsInDeck() {
        $remaining = intval($this->destinations->countCardInLocation('deck'));

        if ($remaining == 0) {
            $remaining = intval($this->destinations->countCardInLocation('discard'));
        }

        return $remaining;
    }

    public function revealDestinationCard($playerId, $id) {
        $dest = $this->getDestinationFromDb($this->destinations->getCard($id));
        if ($dest->location != "hand" || $dest->location_arg != $playerId || $this->isDestinationRevealed($id)) {
            throw new BgaUserException("You can't reveal this card.");
        }
        $this->DbQuery("UPDATE destination SET `revealed` = true WHERE `card_id` = $id");

        $this->notifyAllPlayers('destinationRevealed', clienttranslate('${player_name} reveals ${to}'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'destination' => $dest,
            'to' => $this->CITIES[$dest->to],
        ]);
    }

    public function isDestinationRevealed($destinationId) {
        return $this->getUniqueBoolValueFromDB("SELECT `revealed` FROM destination WHERE `card_id` = $destinationId");
    }

    public function getRevealedTokensBackCount($playerId) {
        return $this->getUniqueIntValueFromDB("SELECT count(`card_id`) FROM destination WHERE `card_location_arg` = $playerId AND `revealed` = 1 and `completed` = 1");
    }

    /**
     * place a number of destinations cards to pick$playerId.
     */
    private function pickDestinationCards($playerId, int $number) {
        $cards = $this->getDestinationsFromDb($this->destinations->pickCardsForLocation($number, 'deck', "pick$playerId"));
        return $cards;
    }

    /**
     * place a number of destinations cards to shared location.
     */
    private function pickSharedDestinationCards(int $number) {
        $cards = $this->getDestinationsFromDb($this->destinations->pickCardsForLocation($number, 'deck', "shared"));
        return $cards;
    }

    /**
     * Get shared destination cards.
     */
    public function getSharedDestinationCards() {
        return $this->getDestinationsFromDb($this->destinations->getCardsInLocation("shared"));
    }

    /**
     * move selected card to player hand, discard other selected card from the hand and empty pick$playerId.
     */
    private function keepDestinationCards(int $playerId, int $keptDestinationsId, int $discardedDestinationId) {
        if ($keptDestinationsId xor $discardedDestinationId) {
            throw new BgaUserException("You must discard a destination to take another one.");
        }
        $traded = $keptDestinationsId && $discardedDestinationId;
        if ($traded) {
            if (
                $this->getUniqueIntValueFromDB("SELECT count(*) FROM destination WHERE `card_location` = 'pick$playerId' AND `card_id` = $keptDestinationsId") == 0
                || $this->getUniqueIntValueFromDB("SELECT count(*) FROM destination WHERE `card_location` = 'hand' AND `card_location_arg` = '$playerId' AND `card_id` = $discardedDestinationId") == 0
            ) {
                throw new BgaUserException("Selected cards are not available.");
            }

            if ($this->isDestinationRevealed($discardedDestinationId)) {
                $discardedCard = $this->getDestinationFromDb($this->destinations->getCard($discardedDestinationId));
                $message = clienttranslate('${player_name} ${gainsloses} ${absdelta} point discarding a revealed destination : ${to}');
                $this->incScore($playerId, -1, $message, [
                    'delta' => 1,
                    'absdelta' => 1,
                    'to' => $this->CITIES[$discardedCard->to],
                    'i18n' => ['gainsloses'],
                    'gainsloses' => clienttranslate('loses'),
                ]);
            }
            $this->destinations->moveCard($keptDestinationsId, 'hand', $playerId);
            $this->destinations->moveCard($discardedDestinationId, 'discard');

            $remainingCardsInPick = intval($this->destinations->countCardInLocation("pick$playerId"));
            if ($remainingCardsInPick > 0) {
                // we discard remaining cards in pick
                $this->destinations->moveAllCardsInLocationKeepOrder("pick$playerId", 'discard');
            }
        }
        $this->notifyAllPlayers('destinationsPicked', clienttranslate('${player_name} trades ${count} destination'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'count' => intval($traded),
            'number' => 0, //1-1 or 0-0
            'remainingDestinationsInDeck' => $this->getRemainingDestinationCardsInDeck(),
            '_private' => [
                $playerId => [
                    'destinations' => $this->getDestinationsFromDb([$this->destinations->getCard($keptDestinationsId)]),
                    'discardedDestination' => $this->getDestinationFromDb($this->destinations->getCard($discardedDestinationId)),
                ],
            ],
        ]);
    }

    /**
     * Move selected cards to player hand.
     */
    private function keepInitialDestinationCards(int $playerId, array $ids) {
        $this->destinations->moveCards($ids, 'hand', $playerId);
        $this->notifyAllPlayers('destinationsPicked', clienttranslate('${player_name} keeps ${count} destinations'), [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'count' => count($ids),
            'number' => count($ids),
            'remainingDestinationsInDeck' => $this->getRemainingDestinationCardsInDeck(),
            '_private' => [
                $playerId => [
                    'destinations' => $this->getDestinationsFromDb($this->destinations->getCards($ids)),
                ],
            ],
        ]);
    }
}
