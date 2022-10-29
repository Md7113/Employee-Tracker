DROP DATABASE IF EXISTS emp_track_db;
CREATE DATABASE emp_track_db;

USE emp_track_db;

CREATE TABLE departmnet (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE departmnet_role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES departmnet(id)
);

CREATE TABLE departmnet_employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id) REFERENCES departmnet_role(id),
manager_id INT NULL,
FOREIGN KEY (manager_id) REFERENCES departmnet_employee(id)
);