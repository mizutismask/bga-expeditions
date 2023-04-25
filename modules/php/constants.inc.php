<?php

/* 
 * Game version 
 */
define('VISIBLE_LOCOMOTIVES_COUNTS_AS_TWO_CARDS', true); // Says if it is possible to take only one visible locomotive. // TODO MAPS
define('RESET_VISIBLE_CARDS_WITH_LOCOMOTIVES', 3); // Resets visible cards when 3 locomotives are visible (null means disabled)
define('TRAIN_CARS_NUMBER_TO_START_LAST_TURN', 2); // 2 means 0, 1, or 2 will start last turn
define('TRAIN_CARS_PER_PLAYER', 45);
define('TICKETS_PER_PLAYER', 3);
define('ADDITIONAL_DESTINATION_MINIMUM_KEPT', 1); // Minimum number of destinations cards to keep at pick destination action.
define('UNUSED_DESTINATIONS_GO_TO_DECK_BOTTOM', true); // Indicates if unpicked destinations cards go back to the bottom of the deck.
define('POINTS_FOR_LONGEST_PATH', 10); // points for maximum longest countinuous path (null means disabled)
define('POINTS_FOR_GLOBETROTTER', 15); // points for maximum completed destinations (null means disabled)
define('MINIMUM_PLAYER_FOR_DOUBLE_ROUTES', 4); // 4 means 2-3 players cant use double routes
define('NUMBER_OF_LOCOMOTIVE_CARDS', 14);
define('NUMBER_OF_COLORED_CARDS', 12);
define('NUMBER_OF_SHARED_DESTINATION_CARDS', 6);
define('DESTINATIONS_TO_REVEAL_COUNT', 4);


define('EXPANSION', 0); // 0 => base game
define('CITIES_NOT_FAR_ENOUGH_FROM_START', [
    113, 114, 129, 130, 131, 132, 133, 134, 137, 149, 153, 154,
]);
define('FAR_DESTINATIONS_MINIMUM', 4);
/* 
 * Colors 
 */
define('BLUE', 1);
define('YELLOW', 2);
define('RED', 3);
define('COLORS', [BLUE, YELLOW, RED]);

define('BLUE_CITY', 1);
define('GREEN_CITY', 2);
define('RED_CITY', 3);
/*
 * State constants
 */
define('ST_BGA_GAME_SETUP', 1);

define('ST_DEAL_INITIAL_DESTINATIONS', 10);
define('ST_MULTIPLAYER_CHOOSE_INITIAL_DESTINATIONS_OLD', 20);
define('ST_MULTIPLAYER_CHOOSE_INITIAL_DESTINATIONS', 21);
define('ST_PRIVATE_CHOOSE_INITIAL_DESTINATIONS', 22);

define('ST_PLAYER_REVEAL_DESTINATION', 23);


define('ST_PLAYER_CHOOSE_ACTION', 30);
define('ST_PLAYER_CHOOSE_ADDITIONAL_DESTINATIONS', 32);
define('ST_PLAYER_USE_TICKET', 34);

define('ST_NEXT_PLAYER', 80);
define('ST_NEXT_REVEAL', 81);

define('ST_DEBUG_END_GAME', 97);
define('ST_END_SCORE', 98);

define('ST_END_GAME', 99);
define('END_SCORE', 100);

/*
 * Options
 */

define('SHOW_TURN_ORDER', 'SHOW_TURN_ORDER');

/*
 * Variables (numbers)
 */

define('LAST_TURN', 'LAST_TURN');
define('TICKETS_USED', 'TICKETS_USED');
define('REMAINING_BLUE_ARROWS', 'REMAINING_BLUE_ARROWS');
define('REMAINING_YELLOW_ARROWS', 'REMAINING_YELLOW_ARROWS');
define('REMAINING_RED_ARROWS', 'REMAINING_RED_ARROWS');
define('NEW_LOOP_COLOR', 'NEW_LOOP_COLOR');
define('MAIN_ACTION_DONE', 'MAIN_ACTION_DONE');
define('BLUEPOINT_ACTIONS_REMAINING', 'BLUEPOINT_ACTIONS_REMAINING');

/*
 * Global variables (objects)
 */
define('LAST_BLUE_ROUTES', 'LAST_BLUE_ROUTES');//array of the 3 last arrows
define('LAST_YELLOW_ROUTES', 'LAST_YELLOW_ROUTES');//array of the 3 last arrows
define('LAST_RED_ROUTES', 'LAST_RED_ROUTES');//array of the 3 last arrows

/*
    Stats
*/
define('STAT_KEPT_ADDITIONAL_DESTINATION_CARDS', 'keptAdditionalDestinationCards');
define('STAT_POINTS_WITH_COMPLETED_DESTINATIONS', 'pointsWithCompletedDestinations');
define('STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS', 'pointsLostWithUncompletedDestinations');
define('STAT_RED_LOCATIONS_REACHED', 'redLocationsReached');
define('STAT_BLUE_LOCATIONS_REACHED', 'blueLocationsReached');
define('STAT_TICKETS_EARNED', 'ticketsEarned');
define('STAT_TICKETS_USED', 'ticketsUsed');
define('STAT_LOOPS', 'loops');
