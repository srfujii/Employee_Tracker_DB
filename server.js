const mysql = require('mysql');
const inquirer = require('inquirer');

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
    console.log('Selecting all employees...\n');
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

const viewDepartments = () => {
    console.log('Selecting all departments...\n');
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        initInquirer();
    });
};

const viewRoles = () => {
    console.log('Selecting all roles...\n');
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        initInquirer();
    });
};



//   const showSongsByForeigner = () => {
//     console.log('Selecting all songs...\n');
//     connection.query('SELECT * FROM top1000 WHERE artist = "George Michael"', (err, results) => {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.table(results);
      
//     });
//   };  

//   const showTop50 = () => {
//     console.log('Selecting Top 50 songs...\n');
//     connection.query('SELECT * FROM top1000 WHERE position BETWEEN 1 and 50', (err, results) => {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.table(results);
      
//     });
//   };  

//   const showTopArtists = () => {
//     console.log('Selecting Top Artists...\n');
//     connection.query('SELECT artist, COUNT(*) FROM top1000 GROUP BY artist HAVING COUNT(*) > 1;', (err, results) => {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.table(results);
      
//     });
//   };  
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
            // "View All Employees By Manager", 
            // "Add New Employee", 
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