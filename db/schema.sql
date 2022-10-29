DROP DATABASE IF EXISTS emp_track_db;
CREATE DATABASE emp_track_db;

USE emp_track_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

DROP TABLE IF EXISTS department_role;
CREATE TABLE department_role (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id) REFERENCES department(id)
);

DROP TABLE IF EXISTS department_employee;
CREATE TABLE department_employee (
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
FOREIGN KEY (role_id) REFERENCES department_role(id),
manager_id INT NULL,
FOREIGN KEY (manager_id) REFERENCES department_employee(id)
);