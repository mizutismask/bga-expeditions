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
        $this->keepDestinationCards($playerId, $this->getDestinationIds($cards), $this->getInitialDestinationCardNumber());

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
        $cards = $this->getPickedDestinationCards($playerId);
        return array_values(array_filter($cards, fn ($card) =>  array_search(intval($card->type_arg) + 100, CITIES_NOT_FAR_ENOUGH_FROM_START, true) === false));
    }

    /**
     * Select kept destination cards for beginning choice. 
     * Unused destination cards are set back on the deck or discarded.
     */
    public function keepInitialDestinationCards(int $playerId, array $ids) {
        $this->keepDestinationCards($playerId, $ids, $this->getInitialDestinationCardNumber());
    }

    /**
     * Pick destination cards for pick destination action.
     */
    public function pickAdditionalDestinationCards(int $playerId) {
        return $this->pickDestinationCards($playerId, $this->getAdditionalDestinationCardNumber());
    }

    /**
     * Select kept destination cards for pick destination action. 
     * Unused destination cards are set back on the deck or discarded.
     */
    public function keepAdditionalDestinationCards(int $playerId, array $ids) {
        $this->keepDestinationCards($playerId, $ids, ADDITIONAL_DESTINATION_MINIMUM_KEPT);
    }

    /**
     * Get destination picked cards (cards player can choose).
     */
    public function getPickedDestinationCards(int $playerId) {
        $cards = $this->getDestinationsFromDb($this->destinations->getCardsInLocation("pick$playerId"));
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
     * move selected cards to player hand, and empty pick$playerId.
     */
    private function keepDestinationCards(int $playerId, array $ids, int $minimum) {
        if (count($ids) < $minimum) {
            throw new BgaUserException("You must keep at least $minimum cards.");
        }

        if (count($ids) > 0 && $this->getUniqueIntValueFromDB("SELECT count(*) FROM destination WHERE `card_location` != 'pick$playerId' AND `card_id` in (" . implode(', ', $ids) . ")") > 0) {
            throw new BgaUserException("Selected cards are not available.");
        }

        $this->destinations->moveCards($ids, 'hand', $playerId);

        $remainingCardsInPick = intval($this->destinations->countCardInLocation("pick$playerId"));
        if ($remainingCardsInPick > 0) {
            if (UNUSED_DESTINATIONS_GO_TO_DECK_BOTTOM) {
                $this->destinations->shuffle("pick$playerId");
                // we put remaining cards in pick at the bottom of the deck
                $this->DbQuery("UPDATE destination SET `card_location_arg` = card_location_arg + $remainingCardsInPick WHERE `card_location` = 'deck'");
                $this->destinations->moveAllCardsInLocationKeepOrder("pick$playerId", 'deck');
            } else {
                // we discard remaining cards in pick
                $this->destinations->moveAllCardsInLocationKeepOrder("pick$playerId", 'discard');
            }
        }

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
