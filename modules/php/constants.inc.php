<?php

/* 
 * Game version 
 */
define('INITIAL_ARROW_COUNT', 45);
define('TICKETS_PER_PLAYER', 3);
define('ADDITIONAL_DESTINATION_MINIMUM_KEPT', 1); // Minimum number of destinations cards to keep at pick destination action.
define('NUMBER_OF_SHARED_DESTINATION_CARDS', 6);
define('DESTINATIONS_TO_REVEAL_COUNT', 4);


define('EXPANSION', 0); // 0 => base game
define('CITIES_NOT_FAR_ENOUGH_FROM_START', [
    113, 114, 129, 130, 131, 132, 133, 134, 137, 149, 153, 154,
]);
define('FAR_DESTINATIONS_MINIMUM', 4);
define("STARTING_POINT",100);
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
define('ARROW_COUNT_BY_TURN', 'ARROW_COUNT_BY_TURN');

define('ARROWS_SINCE_LOOP_BLUE', 'ARROWS_SINCE_LOOP_BLUE');
define('ARROWS_SINCE_LOOP_YELLOW', 'ARROWS_SINCE_LOOP_YELLOW');
define('ARROWS_SINCE_LOOP_RED', 'ARROWS_SINCE_LOOP_RED');

define('LAST_ARROW_FROM_START_BLUE', 'LAST_ARROW_FROM_START_BLUE');
define('LAST_ARROW_FROM_START_YELLOW', 'LAST_ARROW_FROM_START_YELLOW');
define('LAST_ARROW_FROM_START_RED', 'LAST_ARROW_FROM_START_RED');

/*
 * Global variables (objects)
 */
define('LAST_BLUE_ROUTES', 'LAST_BLUE_ROUTES'); //array of the 3 last arrows
define('LAST_YELLOW_ROUTES', 'LAST_YELLOW_ROUTES'); //array of the 3 last arrows
define('LAST_RED_ROUTES', 'LAST_RED_ROUTES'); //array of the 3 last arrows

/*
    Stats
*/
define('STAT_KEPT_ADDITIONAL_DESTINATION_CARDS', 'keptAdditionalDestinationCards');
define('STAT_POINTS_WITH_PLAYER_COMPLETED_DESTINATIONS', 'pointsWithPlayerCompletedDestinations');
define('STAT_POINTS_LOST_WITH_UNCOMPLETED_DESTINATIONS', 'pointsLostWithPlayerUncompletedDestinations');
define('STAT_POINTS_WITH_SHARED_COMPLETED_DESTINATIONS', 'pointsWithSharedCompletedDestinations');
define('STAT_POINTS_WITH_REVEALED_DESTINATIONS', 'pointsWithRevealedDestinations');
define('STAT_BLUE_LOCATIONS_REACHED', 'blueLocationsReached');
define('STAT_TICKETS_EARNED', 'ticketsEarned');
define('STAT_TICKETS_USED', 'ticketsUsed');
define('STAT_LOOPS', 'loops');
define('STAT_BIGGEST_ARROW_COUNT', 'biggestArrowCount');
