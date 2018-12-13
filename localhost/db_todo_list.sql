DROP DATABASE IF EXISTS db_todo_list;

CREATE DATABASE IF NOT EXISTS db_todo_list
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE db_todo_list;

/*user*/
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  id       	 INT(11)     NOT NULL AUTO_INCREMENT,
  `name`     VARCHAR(50) NOT NULL,
  surname 	 VARCHAR(50) NOT NULL,
  login   	 VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  email   	 VARCHAR(50) NOT NULL,
  info    	 VARCHAR(50) NOT NULL,
  image    	 VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB;

SELECT *
FROM user;

/*board*/
DROP TABLE IF EXISTS board;
CREATE TABLE IF NOT EXISTS board (
  id                INT(11) NOT NULL AUTO_INCREMENT,
  id_user           INT(11) NOT NULL,
  title 	 	 	VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user)
  REFERENCES `user` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM board;


/*status*/
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  id          INT(11) NOT NULL AUTO_INCREMENT,
  state       INT(11) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB;

SELECT *
FROM `status`;

/*item_type*/
DROP TABLE IF EXISTS item_type;
CREATE TABLE IF NOT EXISTS item_type (
  id             INT(11) NOT NULL AUTO_INCREMENT,
  `type`         VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB;

SELECT *
FROM item_type;

/*board_item*/
DROP TABLE IF EXISTS board_item;
CREATE TABLE IF NOT EXISTS board_item (
  id             INT(11) NOT NULL AUTO_INCREMENT,
  id_board       INT(11) NOT NULL,
  id_item_type   INT(11) NOT NULL,
  title          VARCHAR(50) NOT NULL,
  `position`     VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_board)
  REFERENCES `board` (id)
    ON DELETE CASCADE,
  FOREIGN KEY (id_item_type)
  REFERENCES `item_type` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM board_item;

/*image*/
DROP TABLE IF EXISTS image;
CREATE TABLE IF NOT EXISTS image (
  id             INT(11) NOT NULL AUTO_INCREMENT,
  id_board       INT(11) NOT NULL,
  image_path     VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_board)
  REFERENCES `board` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM image;

/*note*/
DROP TABLE IF EXISTS note;
CREATE TABLE IF NOT EXISTS note (
  id             INT(11) NOT NULL AUTO_INCREMENT,
  id_board       INT(11) NOT NULL,
  `text`         TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_board)
  REFERENCES `board` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM note;

/*list*/
DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  id          INT(11) NOT NULL AUTO_INCREMENT,
  id_board    INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_board)
  REFERENCES `board` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM `list`;

/*list_item*/
DROP TABLE IF EXISTS list_item;
CREATE TABLE IF NOT EXISTS list_item (
  id          INT(11) NOT NULL AUTO_INCREMENT,
  id_list     INT(11) NOT NULL,
  id_status   INT(11) NOT NULL,
  `text`	  VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_list)
  REFERENCES `list` (id)
    ON DELETE CASCADE,
  FOREIGN KEY (id_status)
  REFERENCES `status` (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM list_item;

SHOW TABLES;