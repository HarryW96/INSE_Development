create database if not exists bookit;

create table if not exists bookit.user(
  U_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  fName VARCHAR(20) NOT NULL,
  lName VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(45),
  email VARCHAR(45),
  phoneNum VARCHAR(30),
  password VARCHAR(20)
);

create table if not exists bookit.event(
  E_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  event_Name VARCHAR(40) NOT NULL,
  eDate DATE NOT NULL,
  location VARCHAR(40) NOT NULL,
  capacity INT NOT NULL,
  descrp VARCHAR(300) NOT NULL,
  image VARCHAR(45)
);
