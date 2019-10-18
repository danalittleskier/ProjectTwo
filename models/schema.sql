
-- DROP DATABASE IF EXISTS exampledb;
-- CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS toolzDEV_db;
DROP DATABASE IF EXISTS testdb;
CREATE DATABASE toolzDEV_db;

USE toolzDEV_db;

-- User Table
CREATE TABLE `User_Table`
(`user_id` INT AUTO_INCREMENT NOT NULL,
  `user_first_name` VARCHAR
(75) NOT NULL,
  `user_last_name` VARCHAR
(100) NOT NULL,
  `user_fullname` VARCHAR
(175) NOT NULL,
  `user_address` VARCHAR
(255),
  `username` VARCHAR
(100) NOT NULL,

  PRIMARY KEY
(`user_id`)
);

-- Credentials Table
CREATE TABLE `User_Login_Credentials`
(
  `login_id` INT AUTO_INCREMENT NOT NULL,
  `user_fullname` VARCHAR
(175) NOT NULL,
  `password` VARCHAR
(100) NOT NULL,
  `user_id` INT,


  PRIMARY KEY
(`login_id`),
  FOREIGN KEY
(`user_id`) REFERENCES `User_Table`
(`user_id`)
);

-- Tool Table`
CREATE TABLE `Tool_Table`
(
  `tool_id` INT AUTO_INCREMENT NOT NULL,
  `tool_name` VARCHAR
(100) NOT NULL,
  `tool_category` ENUM
('Power Tools', 'Abrasives', 'Masonry'),
  `tool_price
($)` DECIMAL
(7,2),
  `tool_owner` INT,

  PRIMARY KEY
(`tool_id`),
  FOREIGN KEY
(`tool_owner`) REFERENCES `User_Table`
(`user_id`)
);

-- Tools Request Table
CREATE TABLE `Request_Header`
(
  `request_id` INT AUTO_INCREMENT NOT NULL,
  `notification_sent` BOOLEAN,
  `requested_by` INT,
  `requested_to` INT,

  PRIMARY KEY
(`request_id`),
  FOREIGN KEY
(`requested_by`) REFERENCES `User_Table`
(`user_id`),
  FOREIGN KEY
(`requested_to`) REFERENCES `User_Table`
(`user_id`)
);

-- Tool Request Lines
CREATE TABLE `Request_Line`
(
  `request_line` INT NOT NULL,
  `request_id` INT,
  `tool_id` INT,

  FOREIGN KEY
(`request_id`) REFERENCES `Request_Header`
(`request_id`),
  FOREIGN KEY
(`tool_id`) REFERENCES `Tool_Table`
(`tool_id`)
);

-- Tool Ledger Entries (Transactions)
CREATE TABLE `Tool_Ledger_Entry`
(
  `transaction_id` INT AUTO_INCREMENT NOT NULL,
  `created_date` DATETIME,
  `return_date` DATETIME,
  `received` BOOLEAN,
  `overdue` BOOLEAN,
  `total
($)` DECIMAL
(10,2),
  `tool_owner` INT,
  `tool_borrower` INT,

  PRIMARY KEY
(`transaction_id`),
  FOREIGN KEY
(`tool_owner`) REFERENCES `User_Table`
(`user_id`),
  FOREIGN KEY
(`tool_borrower`) REFERENCES `User_Table`
(`user_id`)
);