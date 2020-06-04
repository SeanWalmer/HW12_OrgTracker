-- a set of entries to fill out a basic org business db

-- department entries 
INSERT INTO department (dept_name)
VALUES ('Leadership'),('Sales'),('Finance'),('development'),('legal');
--           1            2          3             4            5

-- role entries
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 500000, 1),('CFO', 250000, 1);
--              1                   2
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Person', 50000, 2),('Sales Manager', 90000, 2);
--                    3                          4
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 80000, 3);
--                   5
INSERT INTO role (title, salary, department_id)
VALUES ('Developer', 80000, 4),('Senior Developer', 100000, 4); 
--                  6                             7 
INSERT INTO role (title, salary, department_id)
VALUES ('Dev Team Lead', 110000, 4);
--                8
INSERT INTO role (title, salary, department_id)
VALUES ('Attorney', 150000, 5),('Paralegal', 50000, 5); 
--                  9                             10 

-- employee entries
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jessica', 'Barley', 1, 1),
('Tom', 'Smith', 2, 1),
('Brandon', 'Whittington', 4, 2),
('Haniya', 'Trejo', 3, 3),
('Fintan', 'Briggs', 3, 3),
('Amelia', 'tyson', 5, 2),
('Sufyaan', 'Galloway', 8, 1),
('Elana', 'Manning', 7, 7),
('Jemima', 'Shepherd', 6, 7),
('Veronica', 'Estrada', 9, 1),
('Nel', 'Wells', 10, 10);