<?php

/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * Expeditions implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 * 
 * states.inc.php
 *
 * Expeditions game states description
 *
 */

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: self::checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!

require_once("modules/php/constants.inc.php");

$basicGameStates = [

    // The initial state. Please do not modify.
    ST_BGA_GAME_SETUP => [
        "name" => "gameSetup",
        "description" => clienttranslate("Game setup"),
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => ["" => ST_DEAL_INITIAL_DESTINATIONS]
    ],

    // Final state.
    // Please do not modify.
    ST_END_GAME => [
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd",
    ],
];

$playerActionsGameStates = [

    ST_MULTIPLAYER_CHOOSE_INITIAL_DESTINATIONS_OLD => [
        "name" => "chooseInitialDestinations",
        "description" => clienttranslate('Other players must choose destination tickets'),
        "descriptionmyturn" => clienttranslate('${you} must choose destination tickets (minimum ${minimum})'),
        "type" => "multipleactiveplayer",
        "action" => "stChooseInitialDestinationsOld",
        "args" => "argChooseInitialDestinationsOld",
        "possibleactions" => ["chooseInitialDestinations"],
        "transitions" => [
            "start" => ST_PLAYER_CHOOSE_ACTION,
        ],
    ],

    ST_MULTIPLAYER_CHOOSE_INITIAL_DESTINATIONS => [
        "name" => "multiChooseInitialDestinations",
        "description" => clienttranslate('Other players must choose destination tickets'),
        "descriptionmyturn" => '',
        "type" => "multipleactiveplayer",
        "initialprivate" => ST_PRIVATE_CHOOSE_INITIAL_DESTINATIONS,
        "action" => "stChooseInitialDestinations",
        "possibleactions" => [],
        "transitions" => [
            "start" => ST_PLAYER_CHOOSE_ACTION,
        ],
    ],

    ST_PRIVATE_CHOOSE_INITIAL_DESTINATIONS => [
        "name" => "privateChooseInitialDestinations",
        "descriptionmyturn" => clienttranslate('${you} must choose destination tickets (minimum ${minimum})'),
        "type" => "private",
        "args" => "argPrivateChooseInitialDestinations",
        "possibleactions" => ["chooseInitialDestinations"],
        "transitions" => [],
    ],

    ST_PLAYER_CHOOSE_ACTION => [
        "name" => "chooseAction",
        "description" => clienttranslate('${actplayer} must start/continue an expedition or use tickets'),
        "descriptionmyturn" => clienttranslate('${you} must start/continue an expedition or use tickets'),
        "descriptionNoTrainCarsCards" => clienttranslate('${actplayer} must claim a route or draw destination tickets'),
        "descriptionmyturnNoTrainCarsCards" => clienttranslate('${you} must claim a route or draw destination tickets'),
        "type" => "activeplayer",
        "args" => "argChooseAction",
        "possibleactions" => [
            "drawDeckCards",
            "drawTableCard",
            "claimRoute",
            "drawDestinations",
            "useTicket",
            "pass",
        ],
        "transitions" => [
            "useTicket" => ST_PLAYER_USE_TICKET,
            "nextPlayer" => ST_NEXT_PLAYER,
        ]
    ],

    ST_PLAYER_DRAW_SECOND_CARD => [
        "name" => "drawSecondCard",
        "description" => clienttranslate('${actplayer} must draw a train car card'),
        "descriptionmyturn" => clienttranslate('${you} must draw a train car card'),
        "type" => "activeplayer",
        "args" => "argDrawSecondCard",
        "possibleactions" => [
            "drawSecondDeckCard",
            "drawSecondTableCard",
        ],
        "transitions" => [
            "nextPlayer" => ST_NEXT_PLAYER,
        ]
    ],

    ST_PLAYER_REVEAL_DESTINATION => [
        "name" => "revealDestination",
        "description" => clienttranslate('${actplayer} must reveal one destination'),
        "descriptionmyturn" => clienttranslate('${you} must reveal one of your destinations'),
        "type" => "activeplayer",
        "args" => "argRevealDestination",
        "possibleactions" => [
            "revealDestination",
        ],
        "transitions" => [
            "nextReveal" => ST_NEXT_REVEAL,
        ]
    ],

    ST_PLAYER_CHOOSE_ADDITIONAL_DESTINATIONS => [
        "name" => "chooseAdditionalDestinations",
        "description" => clienttranslate('${actplayer} can trade 1 destination for another'),
        "descriptionmyturn" => clienttranslate('${you} can trade 1 destination from your hand for another one among the 2 from the pile'),
        "type" => "activeplayer",
        "args" => "argChooseAdditionalDestinations",
        "possibleactions" => ["chooseAdditionalDestinations"],
        "transitions" => [
            "continue" => ST_PLAYER_CHOOSE_ACTION,
            "nextPlayer" => ST_NEXT_PLAYER,
        ],
    ],

    ST_PLAYER_CONFIRM_TUNNEL => [
        "name" => "confirmTunnel",
        "description" => /*TODO MAPS clienttranslate*/ ('${actplayer} must confirm tunnel claim using ${extraCards} extra card(s) ${colors}'),
        "descriptionmyturn" => /*TODO MAPS clienttranslate*/ ('${you} must confirm tunnel claim using ${extraCards} extra card(s) ${colors}'),
        "type" => "activeplayer",
        "args" => "argConfirmTunnel",
        "possibleactions" => ["claimTunnel", "skipTunnel"],
        "transitions" => [
            "nextPlayer" => ST_NEXT_PLAYER,
        ],
    ],
    ST_PLAYER_USE_TICKET => [
        "name" => "useTicket",
        "description" => clienttranslate('${actplayer} chooses to place another arrow, remove the last one of any expedition or trade a card'),
        "descriptionmyturn" => clienttranslate('${you} can place another arrow, remove the last one of any expedition or trade a card'),
        "type" => "activeplayer",
        "args" => "argUseTicket",
        "possibleactions" => [
            "unclaimRoute",
            "drawDestinations",
            "claimRoute"
        ],
        "transitions" => [
            "continue" => ST_PLAYER_CHOOSE_ACTION,
            "tradeDestination" => ST_PLAYER_CHOOSE_ADDITIONAL_DESTINATIONS,
            "nextPlayer" => ST_NEXT_PLAYER,
        ]
    ],
];

$gameGameStates = [

    ST_DEAL_INITIAL_DESTINATIONS => [
        "name" => "endScore",
        "description" => "",
        "type" => "game",
        "action" => "stDealInitialDestinations",
        "transitions" => [
            "" => ST_NEXT_REVEAL,
        ],
    ],

    ST_NEXT_PLAYER => [
        "name" => "nextPlayer",
        "description" => "",
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,
        "transitions" => [
            "nextPlayer" => ST_PLAYER_CHOOSE_ACTION,
            "endScore" => ST_END_SCORE,
        ],
    ],

    ST_NEXT_REVEAL => [
        "name" => "nextReveal",
        "description" => "",
        "type" => "game",
        "action" => "stNextReveal",
        "updateGameProgression" => true,
        "transitions" => [
            "nextPlayer" => ST_PLAYER_CHOOSE_ACTION,
            "nextReveal" => ST_PLAYER_REVEAL_DESTINATION,
        ],
    ],

    ST_END_SCORE => [
        "name" => "endScore",
        "description" => "",
        "type" => "game",
        "action" => "stEndScore",
        "transitions" => [
            "endGame" => ST_END_GAME,
        ],
    ],
];

$machinestates = $basicGameStates + $playerActionsGameStates + $gameGameStates;
