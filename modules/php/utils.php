<?php
require_once(__DIR__ . '/objects/destination.php');
require_once(__DIR__ . '/objects/route.php');

trait UtilTrait {

    //////////////////////////////////////////////////////////////////////////////
    //////////// Utility functions
    ////////////
    function getColorName(int $color) {
        switch ($color) {
            case BLUE:
                return clienttranslate("blue");
            case YELLOW:
                return clienttranslate("yellow");
            case RED:
                return clienttranslate("red");
        }
    }

    function array_find(array $array, callable $fn) {
        foreach ($array as $value) {
            if ($fn($value)) {
                return $value;
            }
        }
        return null;
    }

    function array_find_index(array $array, callable $fn) {
        foreach ($array as $index => $value) {
            if ($fn($value)) {
                return $index;
            }
        }
        return null;
    }

    function array_some(array $array, callable $fn) {
        foreach ($array as $value) {
            if ($fn($value)) {
                return true;
            }
        }
        return false;
    }

    function array_every(array $array, callable $fn) {
        foreach ($array as $value) {
            if (!$fn($value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Save (insert or update) any object/array as variable.
     */
    function setGlobalVariable(string $name, /*object|array*/ $obj) {
        $jsonObj = json_encode($obj);
        $this->DbQuery("INSERT INTO `global_variables`(`name`, `value`)  VALUES ('$name', '$jsonObj') ON DUPLICATE KEY UPDATE `value` = '$jsonObj'");
    }

    /**
     * Return a variable object/array.
     * To force object/array type, set $asArray to false/true.
     */
    function getGlobalVariable(string $name, $asArray = null) {
        $json_obj = $this->getUniqueValueFromDB("SELECT `value` FROM `global_variables` where `name` = '$name'");
        if ($json_obj) {
            $object = json_decode($json_obj, $asArray);
            return $object;
        } else {
            return null;
        }
    }

    /**
     * Delete a variable object/array.
     */
    function deleteGlobalVariable(string $name) {
        $this->DbQuery("DELETE FROM `global_variables` where `name` = '$name'");
    }

    /**
     * Transforms a Destination Db object to Destination class.
     */
    function getDestinationFromDb($dbObject) {
        if (!$dbObject || !array_key_exists('id', $dbObject)) {
            throw new BgaSystemException("Destination doesn't exists " . json_encode($dbObject));
        }

        //self::dump('************type_arg*******', $dbObject["type_arg"]);
        //self::dump('*******************', $this->DESTINATIONS[$dbObject["type"]][$dbObject["type_arg"]]);
        return new Destination($dbObject, $this->DESTINATIONS);
    }

    /**
     * Transforms a Destination Db object array to Destination class array.
     */
    function getDestinationsFromDb(array $dbObjects) {
        return array_map(fn ($dbObject) => $this->getDestinationFromDb($dbObject), array_values($dbObjects));
    }

    /**
     * Transforms a ClaimedRoute json decoded object to ClaimedRoute class.
     */
    function getClaimedRouteFromGlobal($dbObject) {
        //self::dump('*******************getClaimedRouteFromGlobal', $dbObject);
        if (
            $dbObject === null
        ) {
            return null;
        }
        if (!$dbObject) {
            throw new BgaSystemException("Claimed route doesn't exists " . json_encode($dbObject));
        }

        $class = new ClaimedRoute([]);
        foreach ($dbObject as $key => $value) $class->{$key} = $value;
        return $class;
    }

    function getInitialArrowsNumber() {
        return INITIAL_ARROW_COUNT;
    }

    function getInitialTicketsNumber() {
        return TICKETS_PER_PLAYER;
    }

    function getHighestCompletedDestinationsCount() {
        return $this->getUniqueIntValueFromDB("SELECT max(complete) FROM (select count(`card_location_arg`) as complete FROM destination WHERE `completed` = 1 GROUP BY `card_location_arg`) as unusedMandatoryAlias");
    }

    function getRemainingTicketsCount(int $playerId) {
        return $this->getUniqueIntValueFromDB("SELECT `player_remaining_tickets` FROM player WHERE player_id = $playerId");
    }

    function getNonZombiePlayersIds() {
        $sql = "SELECT player_id FROM player WHERE player_eliminated = 0 AND player_zombie = 0 ORDER BY player_no";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['player_id']), array_values($dbResults));
    }

    function getClaimedRoutes($playerId = null) {
        $sql = "SELECT route_id, player_id, reverse_direction FROM claimed_routes ";
        if ($playerId !== null) {
            $sql .= "WHERE player_id = $playerId ";
        }
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => new ClaimedRoute($dbResult), array_values($dbResults));
    }

    function getClaimedRoute($routeId) {
        $sql = "SELECT route_id, player_id, reverse_direction FROM claimed_routes WHERE route_id = $routeId ";
        $dbResult = self::getObjectFromDB($sql, true);
        return new ClaimedRoute($dbResult);
    }

    function getRouteOrigin(Route $route, ClaimedRoute $claimed) {
        return $claimed->reverseDirection ? $route->to : $route->from;
    }

    function getRouteDestination(Route $route, ClaimedRoute $claimed): int {
        return $claimed->reverseDirection ? $route->from : $route->to;
    }

    function getRouteOriginFromRouteId(int $routeId) {
        $claimedRoute = $this->getClaimedRoute($routeId);
        $route = $this->getRoute($routeId);
        return $this->getRouteOrigin($route, $claimedRoute);
    }

    function getRouteDestinationFromRouteId(int $routeId) {
        $claimedRoute = $this->getClaimedRoute($routeId);
        $route = $this->getRoute($routeId);
        return $this->getRouteDestination($route, $claimedRoute);
    }

    function getPlayersIds() {
        return array_keys($this->loadPlayersBasicInfos());
    }

    function getPlayerCount() {
        return count($this->getPlayersIds());
    }

    function getPlayerIdByOrder($playerOrder = 1) {
        return $this->getUniqueIntValueFromDB("SELECT player_id FROM player where `player_no` = $playerOrder");
    }

    function getLastPlayer() {
        return $this->getPlayerIdByOrder($this->getPlayerCount());
    }

    function getPlayerName(int $playerId) {
        return self::getUniqueValueFromDb("SELECT player_name FROM player WHERE player_id = $playerId");
    }

    function isLastPlayer(int $playerId) {
        return $this->getLastPlayer() == $playerId;
    }

    function getPlayerScore(int $playerId) {
        return $this->getUniqueIntValueFromDB("SELECT player_score FROM player where `player_id` = $playerId");
    }

    function incScore(int $playerId, int $delta, $message = null, $messageArgs = []) {
        self::DbQuery("UPDATE player SET `player_score` = `player_score` + $delta where `player_id` = $playerId");

        self::notifyAllPlayers('points', $message !== null ? $message : '', [
            'playerId' => $playerId,
            'player_name' => $this->getPlayerName($playerId),
            'points' => $this->getPlayerScore($playerId),
            'delta' => $delta,
        ] + $messageArgs);
    }

    function getUniqueIntValueFromDB(string $sql) {
        return intval(self::getUniqueValueFromDB($sql));
    }

    function getUniqueBoolValueFromDB(string $sql) {
        return boolval(self::getUniqueValueFromDB($sql));
    }

    /* function isDestinationRevealed(int $destinationId) {
        $sql = "SELECT `revealed` FROM `destination` WHERE `card_id` =  $destinationId";
        return $this->getUniqueBoolValueFromDB($sql);
    }*/

    function getRevealedDestinationsIdsByPlayer(int $playerId) {
        $sql = "SELECT `card_id` FROM `destination` WHERE `card_location` = 'hand' AND `card_location_arg` = $playerId AND  `revealed` = 1";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getRevealedToDoDestinationsIds() {
        $sql = "SELECT `card_id` FROM `destination` WHERE `card_location` = 'hand' AND `revealed` = 1 AND `completed` = 0";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getCompletedDestinationsIds(int $playerId) {
        $sql = "SELECT `card_id` FROM `destination` WHERE `card_location` = 'hand' AND `card_location_arg` = $playerId AND  `completed` = 1";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getAllCompletedDestinationsIds() {
        $sql = "SELECT `card_id` FROM `destination` WHERE `completed` = 1";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getRevealedDestinationsIds() {
        $sql = "SELECT `card_id` FROM `destination` WHERE `revealed` = 1 and `card_location` = 'hand'";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getUncompletedDestinationsIds(int $playerId) {
        $sql = "SELECT `card_id` FROM `destination` WHERE `card_location` = 'hand' AND `card_location_arg` = $playerId AND  `completed` = 0";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }

    function getAllUncompletedDestinationsIds() {
        $sql = "SELECT `card_id` FROM `destination` WHERE `card_location` = 'hand' AND `completed` = 0";
        $dbResults = self::getCollectionFromDB($sql);
        return array_map(fn ($dbResult) => intval($dbResult['card_id']), array_values($dbResults));
    }


    function checkCompletedDestinations(int $playerId, int $reachedTarget) {

        $handDestinations = $this->getDestinationsFromDb($this->destinations->getCards($this->getAllUncompletedDestinationsIds()));
        $sharedDestinations = $this->getDestinationsFromDb($this->destinations->getCardsInLocation('shared'));

        foreach ($handDestinations as $destination) {
            if ($destination->to == $reachedTarget) {
                $this->completeDestination($destination->location_arg, $destination, false);
            }
        }
        foreach ($sharedDestinations as $destination) {
            if ($destination->to == $reachedTarget) {
                $this->completeDestination($playerId, $destination, true);
            }
        }
    }

    function completeDestination(int $playerId, Destination $destination, bool $shared) {
        self::DbQuery("UPDATE `destination` SET `completed` = 1 where `card_id` = $destination->id");

        $ownerId = $shared ? $playerId : $destination->location_arg;
        $this->incScore($ownerId, 1);
        $revealed = $this->isDestinationRevealed($destination->id);
        if ($revealed) {
            $this->incScore($ownerId, 1);
            self::incStat(1, STAT_POINTS_WITH_REVEALED_DESTINATIONS, $ownerId); 
        }

        if ($shared) {
            $this->destinations->moveCard($destination->id, 'sharedCompleted', $ownerId);
            $destination->location = 'sharedCompleted';
            $destination->location_arg = $ownerId;
            self::incStat(1, STAT_POINTS_WITH_SHARED_COMPLETED_DESTINATIONS, $playerId);
        }

        $msg = $shared ?
            clienttranslate('${player_name} reached a new shared destination: ${to}') :
            clienttranslate('${player_name} reached a new destination: ${to}');

        self::notifyAllPlayers('destinationCompleted', $msg, [
            'playerId' => $ownerId,
            'player_name' => $this->getPlayerName($ownerId),
            'destination' => $destination,
            'to' => $this->CITIES[$destination->to],
            'destinationRoutes' => [],
            'revealedTokenBack' => $revealed ? 1 : 0,
        ]);
    }

    function getDestinationIds(array $destinations) {
        $ids = [];
        foreach ($destinations as $dest) {
            $ids[] = $dest->id;
        }
        return $ids;
    }

    /**
     * Locations are not only green cities, but also blue and red points.
     */
    function getLocationColor(int $cityId): int {
        $color = 0;
        if ($cityId >= 100 && $cityId <= 180) {
            $color = GREEN_CITY;
        } else if ($cityId >= 181 && $cityId <= 201) {
            $color = RED_CITY;
        } else if ($cityId >= 182 && $cityId <= 221) {
            $color = BLUE_CITY;
        } else {
            throw new BgaSystemException("This city is not from any color " . $cityId);
        }
        return $color;
    }

    function getLocationName(int $cityId) {
        $color = $this->getLocationColor($cityId);
        switch ($color) {
            case RED_CITY:
                return clienttranslate("red point");
            case BLUE_CITY:
                return clienttranslate("blue point");
            case GREEN_CITY:
                return $this->CITIES[$cityId];
        }
    }

    function dbIncField(String $table, String $field, int $value, String $pkfield, String $key) {
        $this->DbQuery("UPDATE $table SET $field = $field+$value WHERE $pkfield = '$key'");
    }

    function noArrowLeft(): bool {
        return intval($this->getGameStateValue(REMAINING_BLUE_ARROWS)) == 0
            && intval($this->getGameStateValue(REMAINING_YELLOW_ARROWS)) == 0
            && intval($this->getGameStateValue(REMAINING_RED_ARROWS)) == 0;
    }

    function getColoredGameStateValue($gameStateValue, $color){
       return $this->getGameStateValue($gameStateValue."_". strtoupper($this->getColorName($color)));
    }
}
