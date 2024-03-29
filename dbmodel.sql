
-- ------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- Expeditions implementation : © <Séverine Kamycki> <mizutismask@gmail.com>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here

-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.

-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):

-- completed destinations are persisted to avoid costly recomputations
CREATE TABLE IF NOT EXISTS `destination` (
  `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_type` varchar(16) NOT NULL,
  `card_type_arg` int(11) NOT NULL,
  `card_location` varchar(16) NOT NULL,
  `card_location_arg` int(11) NOT NULL,
  `completed` TINYINT unsigned NOT NULL DEFAULT FALSE,
  `revealed` TINYINT unsigned NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--normal direction is from->to, reverse is to->from
CREATE TABLE IF NOT EXISTS `claimed_routes` (
  `route_id` smallint unsigned NOT NULL,
  `player_id` int(11) NOT NULL,
  `reverse_direction` TINYINT unsigned NOT NULL DEFAULT FALSE, 
  PRIMARY KEY (`route_id`, `player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `player` ADD `player_remaining_tickets` INT UNSIGNED NOT NULL;

CREATE TABLE IF NOT EXISTS `global_variables` (
  `name` varchar(50) NOT NULL,
  `value` json,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
