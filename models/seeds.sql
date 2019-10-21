DROP DATABASE IF EXISTS toolzDEV_db;
CREATE DATABASE toolzDEV_db;

USE toolzDEV_db;

INSERT INTO members (first_name, last_name , address, username, createdAt, updatedAt)
VALUES ("Tim", "Toolman", "1 Main St", "timtoolman", now(), now());

INSERT INTO members (first_name, last_name , address, username, createdAt, updatedAt)
VALUES ("Jim", "Builder", "1 Victory St", "jimbuilder", now(), now());

INSERT INTO tools (name, description, category, price, rented, renter, createdAt, updatedAt, MemberId)
VALUES ("Chainsaw", "A cool description", "Power Tools", 25.00, "N", null,now(), now(), 1);

INSERT INTO tools (name, description, category, price, rented, renter, createdAt, updatedAt, MemberId)
VALUES ("Belt Sander", "A device larger than most sanders out there", "Power Tools", 25.00, "N", null, now(), now(), 1);



