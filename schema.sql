-- ------------------- forming the database ---------------------------

-- Drops db if it exists already | comment out this next line if you dont want to risk wiping your db
DROP DATABASE IF EXISTS Business_db;

-- creates business_db | if you wish to use this for your business you can replace 'Business' with your business's name and then replace it in in the app.js file where it selects the database to work from 
CREATE database Business_db;

-- selects the db to use for the rest of this code
USE Business_db;

-- --------------------------------------------------------------------

-- ------------------ creating needed tables --------------------------

-- creates a table to store basic employee data
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- creates a table to store basic roll data that can be associated with employees
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- creates a table of departments that roles can be assigned to
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

-- --------------------------------------------------------------------