<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Expeditions implementation : © <Séverine Kamycki> <mizutismask@gmail.com>
 *
 * This code has been produced on the BGA studio platform for use on https://boardgamearena.com.
 * See http://en.doc.boardgamearena.com/Studio for more information.
 * -----
 * 
 * expeditions.action.php
 *
 * Expeditions main action entry point
 *
 *
 * In this file, you are describing all the methods that can be called from your
 * user interface logic (javascript).
 *       
 * If you define a method "myAction" here, then you can call it from your javascript code with:
 * this.ajaxcall( "/expeditions/expeditions/myAction.html", ...)
 *
 */


class action_expeditions extends APP_GameAction {
    // Constructor: please do not modify
    public function __default() {
        if (self::isArg('notifwindow')) {
            $this->view = "common_notifwindow";
            $this->viewArgs['table'] = self::getArg("table", AT_posint, true);
        } else {
            $this->view = "expeditions_expeditions";
            self::trace("Complete reinitialization of board game");
        }
    }

    public function revealDestination() {
        self::setAjaxMode();

        $destinationId = self::getArg("destinationId", AT_posint, true);
        $this->game->revealDestination($destinationId);

        self::ajaxResponse();
    }


    public function chooseAdditionalDestinations() {
        self::setAjaxMode();

        $keptDestinationId = self::getArg("keptDestinationId", AT_posint, true);
        $discardedDestinationId = self::getArg("discardedDestinationId", AT_posint, true);

        $this->game->chooseAdditionalDestinations($keptDestinationId, $discardedDestinationId);

        self::ajaxResponse();
    }

    public function drawDestinations() {
        self::setAjaxMode();

        $this->game->drawDestinations();

        self::ajaxResponse();
    }

    public function claimRoute() {
        self::setAjaxMode();

        $routeId = self::getArg("routeId", AT_posint, true);
        $color = self::getArg("color", AT_posint, true);
        $reverseDirection = self::getArg("reverseDirection", AT_bool, false);

        $this->game->claimRoute($routeId, $color,$reverseDirection);

        self::ajaxResponse();
    }

    public function unclaimRoute() {
        self::setAjaxMode();

        $routeId = self::getArg("routeId", AT_posint, true);

        $this->game->unclaimRoute($routeId);

        self::ajaxResponse();
    }

    public function pass() {
        self::setAjaxMode();

        $this->game->pass();

        self::ajaxResponse();
    }

    public function useTicket() {
        self::setAjaxMode();

        $this->game->useTicket();

        self::ajaxResponse();
    }

    public function undoTicket() {
        self::setAjaxMode();

        $this->game->undoTicket();

        self::ajaxResponse();
    }
}
