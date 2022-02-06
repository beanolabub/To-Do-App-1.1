CREATE DATABASE `todo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */	

CREATE TABLE `todos` (
  `todo_id` int(11) NOT NULL AUTO_INCREMENT,
  `TODO` mediumtext DEFAULT NULL,
  `COMPLETE` tinyint(4) NOT NULL DEFAULT 0,
  `DATE_COMPLETE` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `LIST` varchar(85) DEFAULT NULL,
  `DATE_CREATED` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`todo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4	
