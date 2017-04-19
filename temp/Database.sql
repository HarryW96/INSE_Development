create database if not exists bookit;

/*enables the system to store information to user, event and ticket*/
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

/* OLD TABLE STRUCTURE ABOVE */

create database if not exists bookit;

CREATE TABLE `event` (
 `E_ID` int(11) NOT NULL AUTO_INCREMENT,
 `event_Name` varchar(40) NOT NULL,
 `eDate` date NOT NULL,
 `location` varchar(40) NOT NULL,
 `capacity` int(11) NOT NULL,
 `descrp` varchar(300) NOT NULL,
 `image` varchar(45) DEFAULT NULL,
 PRIMARY KEY (`E_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=latin1

CREATE TABLE `ticket` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `event_name` varchar(45) NOT NULL,
 `event_date` date NOT NULL,
 `user_name` varchar(45) NOT NULL,
 `user_id` int(11) NOT NULL,
 `event_img` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1

CREATE TABLE `user` (
 `U_ID` int(11) NOT NULL AUTO_INCREMENT,
 `fName` varchar(20) NOT NULL,
 `lName` varchar(20) NOT NULL,
 `dob` date NOT NULL,
 `address` varchar(45) DEFAULT NULL,
 `email` varchar(45) NOT NULL,
 `phoneNum` varchar(30) DEFAULT NULL,
 `password` varchar(20) DEFAULT NULL,
 `profile_ref` varchar(100) DEFAULT NULL,
 PRIMARY KEY (`U_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1
