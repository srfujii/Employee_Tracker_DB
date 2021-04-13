const mysql = require('mysql');
const inquirer = require('inquirer');

let roleId;
let firstName;
let lastName;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'myMYSQLpassword',
  database: 'employeeTrackerDB',
});

// error will be an Error if one occurred during the query
// results will contain the results of the query
// fields will contain information about the returned results fields (if any)
const viewEmployees = () => {
    const queryString = `SELECT
	e.id,
    CONCAT(e.first_name, " " ,e.last_name) AS Employee,
    role.title,
    department.name,
    CONCAT("$",role.salary) AS Salary,
    IFNULL(CONCAT(m.first_name, " " ,m.last_name), 'NO MANAGER') AS Manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
INNER JOIN role ON e.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER BY e.id;`
    connection.query(queryString, (err, results) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        initInquirer();
    });
};

const viewEmployeesByDept = () => {
    connection.query("SELECT * FROM department", (error, result) => {
        if (error) throw error;

        inquirer.prompt([
            {
                message: "Which Department Would You Like to See Data For?",
                name: "whichDept",
                type: "list",
                choices: result.map((dept) => {
                    return {
                        name: `${dept.id}: ${dept.name}`,
                        value: dept
                    }
                })
            }
        ]).then(({ whichDept }) => {
            console.log(whichDept);

            connection.query(`SELECT
            e.id,
            CONCAT(e.first_name, ' ' ,e.last_name) AS Employee,
            role.title AS Title,
            department.name AS Department,
            CONCAT("$",role.salary) AS Salary,
            IFNULL(CONCAT(m.first_name, ' ' ,m.last_name), 'NO MANAGER') AS Manager
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        INNER JOIN role ON e.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE role.department_id = ?
        ORDER BY e.id;`, whichDept.id, (error, results) => {
            if (error) throw error;

            console.table(results);
            initInquirer();
        })
        })
    })
};



const viewEmployeesByManager = () => {
    connection.query(`SELECT id, first_name, last_name 
    FROM employee 
    WHERE (id IN (SELECT manager_id FROM employee));`, (error, result) => {
        if (error) throw error;

        inquirer.prompt([
            {
                message: "Which Manager Would You Like to See Direct Reports For?",
                name: "whichManager",
                type: "list",
                choices: result.map((manager) => {
                    console.log("Manager: ", manager);
                    return {
                        name: `${manager.id}: ${manager.first_name} ${manager.last_name}`,
                        value: manager
                    }
                })
            }
        ]).then(({ whichManager }) => {
            console.log("Which Manager.id" + whichManager.id);

            connection.query(`SELECT 
                e.id,
                CONCAT(e.first_name, ' ' ,e.last_name) AS Employee,
                role.title AS Title,
                department.name AS Department,
                CONCAT("$",role.salary) AS Salary
            FROM employee e
            INNER JOIN role ON e.role_id = role.id
            INNER JOIN department ON role.department_id = department.id
            WHERE e.manager_id = ?
            ORDER BY e.id;`, whichManager.id, (error, results) => {
                if (error) throw error;

                console.log(`
                ${whichManager.first_name} ${whichManager.last_name}'s Direct Reports: `);
                console.table(results);
                initInquirer();
            })
        })
    })
};   

const setRoleId = (roleID) => {
roleId = roleID;
return roleId;
}

const setFirstName = (fName) => {
    firstName = fName;
    return firstName;
}

const setLastName = (lName) => {
    lastName = lName;
    return lastName;
}

const addNewEmployee = () => {
// INSERT INTO employee (first_name, last_name, role_id, manager_id)
// VALUES ("Susan", "Fujii", 29, 15);

    connection.query(`SELECT 
    role.id AS ID, 
    role.title AS Title
    FROM role;`, (error, result) => {
    if (error) throw error;

    inquirer.prompt([
        {
            message: "What is the employee's first name?",
            type: "input",
            name: "empFirstName"
        },
        {
            message: "What is the employee's last name?",
            type: "input",
            name: "empLastName"
        },
        {
            message: "What is the employee's role?",
            type: "list",
            name: "roleName",
            choices: result.map((role) => {
                console.log("Role: ", role);
                return {
                    name: `${role.ID}: ${role.Title}`,
                    value: role
                }
            })
        }]).then(({ empFirstName, empLastName, roleName }) => {
                setRoleId(roleName.ID);
                setFirstName(empFirstName);
                setLastName(empLastName);
        
                connection.query(`SELECT id, first_name, last_name 
                FROM employee 
                WHERE (id IN (SELECT manager_id FROM employee));`, (error, result) => {
                    if (error) throw error;
        
                    inquirer.prompt([
                        {
                        message: "What is the employee's new manager's name?",
                        type: "list",
                        name: "whichManager",
                        choices: result.map((manager) => {
                            console.log("Manager: ", manager.id, manager.first_name, manager.last_name);
                            return {
                                name: `${manager.id}: ${manager.first_name} ${manager.last_name}`,
                                value: manager
                                }
                            })
                        }
                ]).then(({ whichManager }) => {
                    console.log("Manager Id: " + whichManager.id);
                    console.log("First Name: ", firstName);
                    console.log("Last Name: ", lastName);
                    console.log("Role Id: ", roleId);

                    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES ("${firstName}", "${lastName}", ${roleId}, ${whichManager.id});`, (error, result) => {
                            if (error) throw error;
                            
                        console.log("Successfully added new employee!");
                        initInquirer();
                    })
                })
            });
    });
})}

const viewDepartments = () => {
    connection.query(`SELECT
    department.id AS ID,
    department.name AS Department,
    SUM(role.salary) AS Utilized_Budget
FROM department
INNER JOIN role ON role.department_id = department.id
GROUP BY department.id;`, (err, results) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        initInquirer();
    });
};

const viewRoles = () => {
    connection.query(`SELECT
    role.id AS ID,
    role.title AS Title,
    department.name AS Department,
    CONCAT("$",role.salary) AS Salary
FROM role
INNER JOIN department ON role.department_id = department.id
ORDER BY department.name;`, (err, results) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        initInquirer();
    });
};

const initInquirer = () => {

    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: [
                "View All Employees", 
                "View All Employees By Department", 
                "View All Employees By Manager", 
                "Add New Employee", 
                "Remove Employee", 
                "Update Employee Role", 
                "Update Employee Manager", 
                "View All Roles", 
                "Add New Role", 
                "Remove Role", 
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Quit"
            ],
            name: "mainMenu"
        }
    ]).then(({ mainMenu }) => {

        switch (mainMenu) {
            case "View All Employees":
                return viewEmployees(); 
            case "View All Employees By Department":
                return viewEmployeesByDept(); 
            case "View All Employees By Manager":
                return viewEmployeesByManager(); 
            case "Add New Employee":
                return addNewEmployee(); 
            // "Remove Employee", 
            // "Update Employee Role", 
            // "Update Employee Manager", 
            case "View All Roles":
                return viewRoles();
            // "Add New Role", 
            // "Remove Role", 
            case "View All Departments":
                return viewDepartments();
            // "Add Department",
            // "Remove Department",
            case "Quit":
                return connection.end();
        }
    });
}


// Connect to the DB
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);

    initInquirer();
});