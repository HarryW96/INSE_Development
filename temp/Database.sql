create database if not exists bookit;

CREATE TABLE IF NOT EXISTS bookit.user(
  U_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fName VARCHAR(20) NOT NULL,
  lName VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(45),
  email VARCHAR(45),
  phoneNum VARCHAR(30),
  password VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS bookit.event(
  E_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event_Name VARCHAR(40) NOT NULL,
  eDate DATE NOT NULL,
  location VARCHAR(40) NOT NULL,
  capacity INT NOT NULL,
  descrp VARCHAR(300) NOT NULL,
  image VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS bookit.ticket (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `event_name` varchar(45) NOT NULL,
 `event_date` date NOT NULL,
 `user_name` varchar(45) NOT NULL,
 `user_id` int(11) NOT NULL,
 `event_img` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`id`)
);
