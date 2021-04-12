DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50) NULL
);

CREATE TABLE role (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR(50) NULL,
  salary DECIMAL(15, 2),
  department_id INT
);

CREATE TABLE employee (
  id INTEGER NOT NULL PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
);
