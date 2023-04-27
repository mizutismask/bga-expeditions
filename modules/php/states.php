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

    function hasReachedEndOfGameRequirements($playerId): bool {
        $end = count($this->getUncompletedDestinationsIds($playerId)) == 0;
        if ($end && intval(self::getGameStateValue(LAST_TURN) == 0)) {
            self::setGameStateValue(LAST_TURN, $this->getLastPlayer()); //we play until the last player to finish the round
            if (!$this->isLastPlayer($playerId)) {
                self::notifyAllPlayers('lastTurn', clienttranslate('${player_name} has no more destination cards, finishing round !'), [
                    'playerId' => $playerId,
                    'player_name' => $this->getPlayerName($playerId),
                ]);
            }
        }
        return $end;
    }

    function stNextPlayer() {
        $playerId = self::getActivePlayerId();

        self::incStat(1, 'turnsNumber');
        self::incStat(1, 'turnsNumber', $playerId);

        $this->setGameStateValue(TICKETS_USED, 0);
        $this->setGameStateValue(NEW_LOOP_COLOR, 0);
        $this->setGameStateValue(MAIN_ACTION_DONE, 0);

        $lastTurn = intval(self::getGameStateValue(LAST_TURN));

        // check if it was last action from the last player or if there is no arrow left
        if (
            $lastTurn == $playerId || $this->noArrowLeft() ||
            ($this->hasReachedEndOfGameRequirements($playerId) && $this->isLastPlayer($playerId))
        ) {
            $this->gamestate->nextState('endScore');
        } else {
            //finishing round or playing normally
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
        $sql = "SELECT player_id id, player_score score, player_no playerNo FROM player ORDER BY player_no ASC";
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
                    self::incStat(1, STAT_POINTS_WITH_COMPLETED_DESTINATIONS, $playerId);
                } else {
                    $totalScore[$playerId] += -1;
                    if ($this->isDestinationRevealed($destination->id)) {
                        $totalScore[$playerId] += -1;
                    }
                    self::incStat(1, STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS, $playerId);
                    $uncompletedDestinations[] = $destination;
                }
            }

            $destinationsResults[$playerId] = $uncompletedDestinations;
        }

        foreach ($players as $playerId => $playerDb) {
            self::DbQuery("UPDATE player SET `player_score` = $totalScore[$playerId] where `player_id` = $playerId");
            self::DbQuery("UPDATE player SET `player_score_aux` = `player_remaining_tickets` where `player_id` = $playerId");
        }

        $bestScore = max($totalScore);
        $playersWithScore = [];
        foreach ($players as $playerId => &$player) {
            $player['playerNo'] = intval($player['playerNo']);
            $player['ticketsCount'] = $this->getRemainingTicketsCount($playerId);
            $player['destinationsCount'] = intval($this->destinations->countCardInLocation('hand', $playerId));
            $tokensBackCount = $this->getRevealedTokensBackCount($playerId);
            $player['revealedTokensBackCount'] = $tokensBackCount;
            $player['completedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getCompletedDestinationsIds($playerId)));
            $player['uncompletedDestinations'] = $this->getDestinationsFromDb($this->destinations->getCards($this->getUncompletedDestinationsIds($playerId)));
            $player['revealedTokensLeftCount'] = DESTINATIONS_TO_REVEAL_COUNT - $tokensBackCount;
            $player['sharedCompletedDestinationsCount'] = count($this->destinations->getCardsInLocation('sharedCompleted', $playerId));
            $player['score'] = $totalScore[$playerId];
            $playersWithScore[$playerId] = $player;
        }
        self::notifyAllPlayers('bestScore', '', [
            'bestScore' => $bestScore,
            'players' => array_values($playersWithScore),
        ]);

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
