<?php

/**
 * A route is a path from one city to another.
 * For double routes, there is 2 instances of Route.
 * 
 * from/to : cities ids
 * number : number of meeples to take the route
 * color (0 for gray, else see Color constants)
 */
class Route {
    public int $id;
    public int $from;
    public int $to;
    public int $number;
    public int $color;

    public function __construct(int $from, int $to, int $color, int $number = 1) {
        $this->from = $from;
        $this->to = $to;
        $this->number = $number;
        $this->color = $color;
    }
}

class ClaimedRoute {
    public int $routeId;
    public int $playerId;
    public bool $reverseDirection;

    public function __construct(array $db) {
        array_key_exists('route_id', $db) ? $this->routeId = intval($db['route_id']) : null;
        array_key_exists('player_id', $db) ? $this->playerId = intval($db['player_id']) : null;
        array_key_exists('reverse_direction', $db) ? $this->reverseDirection = boolval($db['reverse_direction']) : null;
    }
}
