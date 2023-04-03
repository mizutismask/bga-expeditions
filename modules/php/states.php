<?php

trait StateTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Game state actions
    ////////////

    /*
        Here, you can create methods defined as "game state actions" (see "action" property in states.inc.php).
        The action method of state X is called everytime the current game state is set to X.
    */

    function stDealInitialDestinations() {
        $playersIds = $this->getPlayersIds();

        foreach ($playersIds as $playerId) {
            $this->pickInitialDestinationCards($playerId);
        }
        $this->pickInitialSharedDestinationCards();

        $this->gamestate->nextState('');
    }

    function stChooseInitialDestinationsOld() {
        $this->gamestate->setAllPlayersMultiactive();
    }

    function stChooseInitialDestinations() {
        $this->gamestate->setAllPlayersMultiactive();
        $this->gamestate->initializePrivateStateForAllActivePlayers();
    }

    function stNextPlayer() {
        $playerId = self::getActivePlayerId();

        self::incStat(1, 'turnsNumber');
        self::incStat(1, 'turnsNumber', $playerId);

        $this->setGameStateValue(TICKETS_USED, 0);
        $this->setGameStateValue(NEW_LOOP_COLOR, 0);

        $lastTurn = intval(self::getGameStateValue(LAST_TURN));

        // check if it was last action from player who started last turn
        if ($lastTurn == $playerId) {
            $this->gamestate->nextState('endScore');
        } else {
            if ($lastTurn == 0) {
                // check if last turn is started    
                if ($this->getLowestTrainCarsCount() <= TRAIN_CARS_NUMBER_TO_START_LAST_TURN) {
                    self::setGameStateValue(LAST_TURN, $playerId);

                    self::notifyAllPlayers('lastTurn', clienttranslate('${player_name} has ${number} train cars or less, starting final turn !'), [
                        'playerId' => $playerId,
                        'player_name' => $this->getPlayerName($playerId),
                        'number' => TRAIN_CARS_NUMBER_TO_START_LAST_TURN,
                    ]);
                }
            }

            $playerId = self::activeNextPlayer();
            self::giveExtraTime($playerId);
            $this->gamestate->nextState('nextPlayer');
        }
    }

    function stNextReveal() {
        $playerId = self::activeNextPlayer();
        $nextState = 'nextPlayer';
        if (count($this->getRevealedDestinationsIdsByPlayer($playerId)) < DESTINATIONS_TO_REVEAL_COUNT) {
            self::giveExtraTime($playerId);
            $nextState = 'nextReveal';
        }
        $this->gamestate->nextState($nextState);
    }

    function stEndScore() {
        $sql = "SELECT player_id id, player_score score FROM player ORDER BY player_no ASC";
        $players = self::getCollectionFromDb($sql);

        // points gained during the game : reached destinations
        $totalScore = [];
        foreach ($players as $playerId => $playerDb) {
            $totalScore[$playerId] = intval($playerDb['score']);
        }

        // failed destinations 
        $destinationsResults = [];
        $completedDestinationsCount = [];
        foreach ($players as $playerId => $playerDb) {
            $completedDestinationsCount[$playerId] = 0;
            $uncompletedDestinations = [];
            $completedDestinations = [];

            $destinations = $this->getDestinationsFromDb($this->destinations->getCardsInLocation('hand', $playerId));

            foreach ($destinations as &$destination) {
                $completed = boolval(self::getUniqueValueFromDb("SELECT `completed` FROM `destination` WHERE `card_id` = $destination->id"));
                if ($completed) {
                    $completedDestinationsCount[$playerId]++;
                    $completedDestinations[] = $destination;
                } else {
                    $totalScore[$playerId] += -1;
                    if ($this->isDestinationRevealed($destination->id)) {
                        $totalScore[$playerId] += -1;
                    }
                    $uncompletedDestinations[] = $destination;
                }
            }

            $destinationsResults[$playerId] = $uncompletedDestinations;
        }

        // we need to send bestScore before all score notifs, because train animations will show score ratio over best score
        $bestScore = max($totalScore);
        self::notifyAllPlayers('bestScore', '', [
            'bestScore' => $bestScore,
        ]);

        // now we can send score notifications

        // completed/failed destinations 
        foreach ($destinationsResults as $playerId => $destinations) {

            foreach ($destinations as $destination) {
                $destinationRoutes = $this->getDestinationRoutes($playerId, $destination);
                $completed = $destinationRoutes != null;
                $points = $completed ? 0 : -1; //positive points are count along the game


                self::notifyAllPlayers('scoreDestination', "", [
                    'playerId' => $playerId,
                    'player_name' => $this->getPlayerName($playerId),
                    'destination' => $destination,
                    'to' => $this->CITIES[$destination->to],
                    'destinationRoutes' => $destinationRoutes,
                ]);

                $message = clienttranslate('${player_name} ${gainsloses} ${absdelta} point with ${to}');
                $this->incScore($playerId, $points, $message, [
                    'delta' => $destination->points,
                    'absdelta' => 1,
                    'to' => $this->CITIES[$destination->to],
                    'i18n' => ['gainsloses'],
                    'gainsloses' => $completed ? clienttranslate('gains') : clienttranslate('loses'),
                ]);

                if ($completed) {
                    self::incStat(1, STAT_POINTS_WITH_COMPLETED_DESTINATIONS, $playerId);
                } else {
                    self::incStat(1, STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS, $playerId);
                }
            }
        }

        foreach ($players as $playerId => $playerDb) {
            self::DbQuery("UPDATE player SET `player_score_aux` = `player_remaining_tickets` where `player_id` = $playerId");
        }

        // highlight winner(s)
        foreach ($totalScore as $playerId => $playerScore) {
            if ($playerScore == $bestScore) {
                self::notifyAllPlayers('highlightWinnerScore', '', [
                    'playerId' => $playerId,
                ]);
            }
        }

        $this->gamestate->nextState('endGame');
    }
}
