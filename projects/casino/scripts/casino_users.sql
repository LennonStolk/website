CREATE TABLE IF NOT EXISTS `casino_users` (
  `id` int(30) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `balance` int(30) NOT NULL,
  `profilepicture` mediumblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;