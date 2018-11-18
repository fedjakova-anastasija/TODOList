INSERT INTO user VALUES(1, 'Анастасия', 'Федякова', 'nastya', '827ccb0eea8a706c4c34a16891f84e7b', 'nastya@mail.ru');
DROP DATABASE IF EXISTS db_todo_list;

CREATE DATABASE IF NOT EXISTS db_todo_list
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

USE db_todo_list;

/*user*/
DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
  id       INT(11)     NOT NULL AUTO_INCREMENT,
  name     TEXT        NOT NULL,
  surname  TEXT        NOT NULL,
  login    VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email    VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB;

SELECT *
FROM user;

/*user_page*/
DROP TABLE IF EXISTS user_page;
CREATE TABLE IF NOT EXISTS user_page (
  id          INT(11) NOT NULL AUTO_INCREMENT,
  id_user     INT(11) NOT NULL,
  json_string TEXT    NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user)
  REFERENCES user (id)
    ON DELETE CASCADE
)
  ENGINE = InnoDB;

SELECT *
FROM user_page;