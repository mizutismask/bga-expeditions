<?php

require_once(__DIR__.'/objects/train-car.php');

trait TrainCarDeckTrait {

    /**
     * Create cards, place 5 on table, and check revealed cards are valid.
     */
    public function createTrainCars() {
        for ($color = 0; $color <= 8; $color++) {
            $trainCars[] = [ 'type' => $color, 'type_arg' => null, 'nbr' => ($color == 0 ? NUMBER_OF_LOCOMOTIVE_CARDS : NUMBER_OF_COLORED_CARDS)];
        }
        $this->trainCars->createCards($trainCars, 'deck');
        $this->trainCars->shuffle('deck');
    }

    /**
     * get remaining cards in deck (can include discarded ones, to know how many cards player can pick).
     */
    public function getRemainingTrainCarCardsInDeck(bool $includeDiscard = false, bool $includeVisible = false) {
        $remaining = intval($this->trainCars->countCardInLocation('deck'));

        if ($includeDiscard || $remaining == 0) {
            $remaining += intval($this->trainCars->countCardInLocation('discard'));
        }
        if ($includeVisible) {
            $remaining += intval($this->trainCars->countCardInLocation('table'));
        }

        return $remaining;
    }

}
