USE employeeTrackerDB;

INSERT INTO department (id, name)
VALUES(01, "Sales"),
(02, "Marketing"),
(03, "Business Development"),
(04, "Finance"),
(05, "Engineering"),
(06, "Human Resources"),
(07, "Information Technology"),
(08, "Product Management"),
(09, "Customer Service");


INSERT INTO role (id, title, salary, department_id)
VALUES(10, "Director of Sales", 400000, 01),
(11, "Sales Manager", 200000, 01),
(12, "Sales Engineer", 225000, 01),
(13, "Inside Sales Manager", 150000, 01),
(14, "Outside Sales Manager", 150000, 01),
(20, "Director of Marketing", 400000, 02),
(21, "Marketing Manager", 200000, 02),
(22, "Branding Manager", 225000, 02),
(23, "Technical Marketing Manager", 150000, 02),
(24, "Website Marketing Manager", 150000, 02),
(25, "Junior Marketer", 75000, 02),
(30, "Director of Business Development", 400000, 03),
(31, "Business Development Manager", 200000, 03),
(32, "Business Development Intern", 25000, 03),
(40, "Chief Financial Officer", 400000, 04),
(41, "VP of Finance", 200000, 04),
(42, "Financial Analyst", 25000, 04),
(50, "Chief Technical Officer", 400000, 05),
(51, "VP of Engineering", 200000, 05),
(52, "Director of Engineering", 25000, 05),
(53, "Chief Architect", 400000, 05),
(54, "Architect", 200000, 05),
(55, "Engineer", 25000, 05),
(56, "QA Manager", 400000, 05),
(57, "QA Analyst", 200000, 05),
(58, "Project Manager", 25000, 05),
(60, "VP of Human Resources", 400000, 06),
(61, "Director of Human Resources", 200000, 06),
(62, "Human Resources Manager", 25000, 06),
(70, "VP of Information Technology", 400000, 07),
(71, "Director of IT", 200000, 07),
(72, "IT Manager", 25000, 07),
(73, "IT Specialist", 25000, 07),
(80, "VP of Product Management", 400000, 08),
(81, "Director of Product Management", 200000, 08),
(82, "Product Manager", 25000, 08),
(90, "VP of Customer Service", 400000, 09),
(91, "Director of Customer Service", 200000, 09),
(92, "Customer Service Manager", 25000, 09),
(93, "Customer Service Rep", 25000, 09);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(501, "John", "Smith", 73, 502), -- IT Specialist
(502, "Malia", "Roberts", 72, 503),	-- IT Manager
(503, "Ryan", "Jones", 71, 504),		-- Director of IT
(504, "Sarah", "Smiles", 70, null),	-- VP of IT
(505, "Sydney", "Oaks", 73, 502),	-- IT Specialist
(506, "Chad", "Norwood", 73, 502),	-- IT Specialist
(507, "Joe", "Ellis", 73, 502),	-- IT Specialist
(508, "John", "Mayfield", 73, 502),	-- IT Specialist

(509, "Eleanor", "Shellstrop", 80, null),	-- VP of Product Mgmt
(510, "John", "Doe", 81, 509),	-- Director of Product Mgmt
(511, "Dan", "Fischer", 82, 510),	-- Product Manager
(512, "Julie", "Lynch", 82, 510),	-- Product Manager
(513, "Elvis", "Parsley", 82, 510),	-- Product Manager

(514, "Stefan", "Spice", 60, null),	-- VP of HR
(515, "Damian", "Salvatore", 61, 514),	-- Director of HR
(516, "Elena", "Gilbert", 62, 515),	-- HR Manager
(517, "Dave", "Bannister", 62, 515),	-- HR Manager
(518, "Chris", "Lee", 62, 515),	-- HR Manager

(519, "Bruce", "Lee", 90, null),	-- VP of Customer Service
(520, "Bruce", "Wayne", 91, 504),		-- Director of Customer Service
(521, "Clark", "Kent", 92, 503),	-- Customer Service Manager
(522, "Peter", "Parker", 93, 502), -- Customer Service Rep
(523, "Scott", "Summers", 93, 502),	-- Customer Service Rep
(524, "Kitty", "Hawk", 93, 502),	-- Customer Service Rep
(525, "Dan", "Levy", 93, 502),	-- Customer Service Rep
(526, "Levi", "Ackerman", 93, 502),	-- Customer Service Rep

(527, "Alexis", "Rose", 50, null),	-- CTO
(528, "Logan", "Fell", 51, 527),		-- VP Engineering
(529, "Xavier", "Roberts", 52, 528),	-- Director of Engineering
(530, "Charles", "Xavier", 53, 529), -- Chief Architect
(531, "Winston", "Hayes", 54, 530),	-- Architect
(532, "Daryl", "Hall", 54, 530),	-- Architect
(533, "John", "Oates", 54, 530),	-- Architect
(534, "Cecilia", "Deckhart", 55, 533),	-- Engineer
(535, "Roni", "Johnson", 55, 533),	-- Engineer
(536, "Joe", "Kim", 55, 533),	-- Engineer
(537, "Spencer", "Neige", 55, 533),	-- Engineer
(538, "Sabina", "Berkeley", 55, 533),	-- Engineer

(539, "Sofia", "Pando", 40, null),	-- CFO
(540, "Elliot", "Mankoff", 41, 539),	-- VP Finance
(541, "Noah", "Ryder", 42, 540),	-- Financial Analyst
(542, "Summer", "Reyes", 42, 540),	-- Financial Analyst
(543, "Joni", "Mitchell", 42, 540);	-- Financial Analyst


