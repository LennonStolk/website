CREATE TABLE IF NOT EXISTS `blackjack_games` (
  `id` int(30) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `gamestate` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;