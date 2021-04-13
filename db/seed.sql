USE employeeTrackerDB;

INSERT INTO department (name)
VALUES("Sales"),
("Marketing"),
("Business Development"),
("Finance"),
("Engineering"),
("Human Resources"),
("Information Technology"),
("Product Management"),
("Customer Service");


INSERT INTO role (title, salary, department_id)
VALUES("Director of Sales", 400000, 1),
("Sales Manager", 200000, 1),
("Sales Engineer", 225000, 1),
("Inside Sales Manager", 150000, 1),
("Outside Sales Manager", 150000, 1),
("Director of Marketing", 400000, 2),
("Marketing Manager", 200000, 2),
("Branding Manager", 225000, 2),
("Technical Marketing Manager", 150000, 2),
("Website Marketing Manager", 150000, 2),
("Junior Marketer", 75000, 2),
("Director of Business Development", 400000, 3),
("Business Development Manager", 200000, 3),
("Business Development Intern", 25000, 3),
("Chief Financial Officer", 400000, 4),
("VP of Finance", 200000, 4),
("Financial Analyst", 25000, 4),
("Chief Technical Officer", 400000, 5),
("VP of Engineering", 200000, 5),
("Director of Engineering", 25000, 5),
("Chief Architect", 400000, 5),
("Architect", 200000, 5),
("Engineer", 25000, 5),
("QA Manager", 400000, 5),
("QA Analyst", 200000, 5),
("Project Manager", 25000, 5),
("VP of Human Resources", 400000, 6),
("Director of Human Resources", 200000, 6),
("Human Resources Manager", 25000, 6),
("VP of Information Technology", 400000, 7),
("Director of IT", 200000, 7),
("IT Manager", 25000, 7),
("IT Specialist", 25000, 7),
("VP of Product Management", 400000, 8),
("Director of Product Management", 200000, 8),
("Product Manager", 25000, 8),
("VP of Customer Service", 400000, 9),
("Director of Customer Service", 200000, 9),
("Customer Service Manager", 25000, 9),
("Customer Service Rep", 25000, 9);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("John", "Smith", 33, 2), -- IT Specialist		(1)
("Malia", "Roberts", 32, 3),	-- IT Manager 			(2)
("Ryan", "Jones", 31, 4),		-- Director of IT		(3)
("Sarah", "Smiles", 30, null),	-- VP of IT				(4)
("Sydney", "Oaks", 33, 2),	-- IT Specialist			(5)
("Chad", "Norwood", 33, 2),	-- IT Specialist			(6)
("Joe", "Ellis", 33, 2),	-- IT Specialist			(7)
("John", "Mayfield", 33, 2),	-- IT Specialist		(8)

("Eleanor", "Shellstrop", 34, null),	-- VP of Product Mgmt	(9)
("John", "Doe", 35, 9),	-- Director of Product Mgmt				(10)
("Dan", "Fischer", 36, 10),	-- Product Manager					(11)
("Julie", "Lynch", 36, 10),	-- Product Manager					(12)
("Elvis", "Parsley", 36, 10),	-- Product Manager				(13)

("Stefan", "Spice", 27, null),	-- VP of HR					(14)
("Damian", "Salvatore", 28, 14),	-- Director of HR		(15)
("Elena", "Gilbert", 29, 15),	-- HR Manager				(16)
("Dave", "Bannister", 29, 15),	-- HR Manager				(17)
("Chris", "Lee", 29, 15),	-- HR Manager					(18)

("Bruce", "Lee", 37, null),	-- VP of Customer Service			(19)
("Bruce", "Wayne", 38, 19),		-- Director of Customer Service	(20)
("Clark", "Kent", 39, 20),	-- Customer Service Manager			(21)
("Peter", "Parker", 40, 21), -- Customer Service Rep			(22)
("Scott", "Summers", 40, 21),	-- Customer Service Rep			(23)
("Kitty", "Hawk", 40, 21),	-- Customer Service Rep				(24)
("Dan", "Levy", 40, 21),	-- Customer Service Rep				(25)
("Levi", "Ackerman", 40, 21),	-- Customer Service Rep			(26)

("Alexis", "Rose", 18, null),	-- CTO							(27)
("Logan", "Fell", 19, 27),		-- VP Engineering				(28)
("Xavier", "Roberts", 20, 28),	-- Director of Engineering		(29)
("Charles", "Xavier", 21, 29), -- Chief Architect				(30)
("Winston", "Hayes", 22, 30),	-- Architect					(31)
("Daryl", "Hall", 22, 30),	-- Architect						(32)
("John", "Oates", 22, 30),	-- Architect						(33)
("Cecilia", "Deckhart", 23, 31),	-- Engineer					(34)
("Roni", "Johnson", 23, 31),	-- Engineer						(35)
("Joe", "Kim", 23, 31),	-- Engineer							(36)
("Spencer", "Neige", 23, 31),	-- Engineer						(37)
("Sabina", "Berkeley", 23, 31),	-- Engineer					(38)

("Sofia", "Pando", 15, null),	-- CFO					(39)
("Elliot", "Mankoff", 16, 39),	-- VP Finance			(40)
("Noah", "Ryder", 17, 40),	-- Financial Analyst		(41)
("Summer", "Reyes", 17, 40),	-- Financial Analyst	(42)
("Joni", "Mitchell", 17, 40);	-- Financial Analyst	(43)



