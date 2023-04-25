<?php

require_once(__DIR__ . '/objects/route.php');

class ConnectedCity {
    public int $city;
    public array $routes;

    public function __construct(int $city, array $routes) {
        $this->city = $city;
        $this->routes = $routes;
    }
}

trait MapTrait {

    /**
     * List routes a player can claim. Player can claim only if :
     * - it is not already claimed
     * - it's the beginning or the continuing of an expedition of the same color
     */
    public function claimableRoutes(int $playerId) {
        $claimableRoutes = [];
        $connectedRoutes = [];
        $loopColor = $this->getGamestateValue(NEW_LOOP_COLOR);
        if ($loopColor) {
            $connectedRoutes = $this->getRoutesOnExpedition($loopColor);
        } else {
            foreach (COLORS as $color) {
                $lastClaimedRoute = $this->getLastClaimedRoute($color);
                if (!$lastClaimedRoute) {
                    $connectedRoutes = array_merge($connectedRoutes,  $this->getRoutesConnectedToCity(100, $color)); //starting point
                } else {
                    $lastRoute = $this->getRoute($lastClaimedRoute->routeId);
                    $connectedRoutes = array_merge($connectedRoutes,  $this->getRoutesConnectedToCity($lastClaimedRoute->reverseDirection ? $lastRoute->from : $lastRoute->to, $color));
                }
            }
        }
        // remove routes already claimed
        $claimedRoutes = $this->getClaimedRoutes();
        $claimedRoutesIds = array_map(fn ($claimedRoute) => $claimedRoute->routeId, array_values($claimedRoutes));
        $claimableRoutes = array_filter($connectedRoutes, fn ($route) => !in_array($route->id, $claimedRoutesIds));
        return array_values($claimableRoutes);
    }

    /**
     * Indicates if destination is completed (continuous path linking both cities).
     */
    public function getDestinationRoutes(int $playerId, object $destination) {
        $claimedRoutes = $this->getClaimedRoutes($playerId);
        $claimedRoutesIds = array_map(fn ($claimedRoute) => $claimedRoute->routeId, array_values($claimedRoutes));

        $citiesConnectedToFrom = $this->getAccessibleCitiesFrom(new ConnectedCity($destination->from, []), [$destination->from], $claimedRoutesIds);

        $validConnections = array_values(array_filter($citiesConnectedToFrom, fn ($connectedCity) => $connectedCity->city == $destination->to));
        $count = count($validConnections);

        if ($count == 0) {
            return null;
        } else if ($count == 1) {
            return $validConnections[0]->routes;
        } else {
            $shortest = $validConnections[0];

            foreach ($validConnections as $validConnection) {
                if (count($validConnection->routes) < count($shortest->routes)) {
                    $shortest = $validConnection;
                }
            }

            return $shortest->routes;
        }
    }

    public function getAllRoutes() {
        $allRoutes = $this->ROUTES;
        array_walk($allRoutes, function (&$route, $id) {
            $route->id = $id;
        });
        return $allRoutes;
    }

    public function getRoute(int $routeId) {
        return $this->ROUTES[$routeId];
    }
    
    private function getRoutesConnectedToCity(int $city, int $color = 0) {
        $allRoutes = $this->getAllRoutes();
        $connectedRoutes = array_values(array_filter(
            $allRoutes,
            fn ($route) => ($route->from == $city || $route->to == $city) && (!$color || $route->color == $color)
        ));
        //self::dump('*******************getRoutesConnectedToCity connectedRoutes', $connectedRoutes);
        return $connectedRoutes;
    }

    private function getRoutesOnExpedition(int $color) {
        $routes = $this->getClaimedRoutes();
        $routes = array_filter($routes, fn ($route) => ($this->getRoute($route->routeId)->color == $color));
        //self::dump('*******************getRoutesOnExpedition color', $color);
        //self::dump('*******************getRoutesOnExpedition', $routes);

        $cities = [];
        foreach ($routes as $route) {
            $details = $this->getRoute($route->routeId);
            $cities[] = $details->from;
            $cities[] = $details->to;
        }
        $cities = array_unique($cities);
        //self::dump('*******************cities', $cities);

        $availableRoutes = [];
        foreach ($cities as $city) {
            $availableRoutes = array_merge($availableRoutes, $this->getRoutesConnectedToCity($city, $color));
        }
        //self::dump('*******************availableRoutes', $availableRoutes);
        return array_values($availableRoutes);
    }

    // return an array of ConnectedCity
    private function getAccessibleCitiesFrom(object $connectedCity, array $visitedCitiesIds, array $playerClaimedRoutesIds) {
        $connectedRoutes = $this->getRoutesConnectedToCity($connectedCity->city);

        // we only check route to cities we haven't checked, to avoid infinite loop
        $claimedConnectedRouteToExplore = array_values(array_filter($connectedRoutes, function ($route) use ($connectedCity, $visitedCitiesIds, $playerClaimedRoutesIds) {
            $cityOnOtherSideOfRoute = $route->from == $connectedCity->city ? $route->to : $route->from;
            return in_array($route->id, $playerClaimedRoutesIds) && !in_array($cityOnOtherSideOfRoute, $visitedCitiesIds);
        }));

        $connectedCities = array_map(function ($route) use ($connectedCity) {
            $cityOnOtherSideOfRoute = $route->from == $connectedCity->city ? $route->to : $route->from;
            return new ConnectedCity($cityOnOtherSideOfRoute, array_merge($connectedCity->routes, [$route]));
        }, $claimedConnectedRouteToExplore);

        $recursiveConnectedCities = $connectedCities; // copy
        $newVisitedCitiesIds = array_merge($visitedCitiesIds, array_map(fn ($cc) => $cc->city, $connectedCities));
        foreach ($connectedCities as $connectedCity) {
            $recursiveConnectedCities = array_merge(
                $recursiveConnectedCities,
                $this->getAccessibleCitiesFrom($connectedCity, $newVisitedCitiesIds, $playerClaimedRoutesIds)
            );
        }

        return $recursiveConnectedCities;
    }
}
