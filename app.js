// dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// creates database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MSWatch!",
    database: "business_db"
});
// ----------------------------------------------------- basic app transitions
// Starts application with welcome message
function startApp() {
    console.log(`\nWelcome! Accessing your Org employee database... \nWhat would you like to do first?`);
    chooseAction();
};
// choose what action you would like to perform
function chooseAction() {
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'Please select your next action',
            choices: ['View current Org data', 'Add a role/department/employee', 'Update employee role', 'quit']
        },
    ]
    // Run the employee build type based on response
    inquirer.prompt(questions).then(answers => {
        if (answers.type === 'View current Org data') {
            renderTable();
        } else if (answers.type === 'Add a role/department/employee') {
            addData();
        } else if(answers.type === 'Update employee role'){
            updateEmployee();
        }else{
            end();
        }
    });
};
function end(){
    console.log(`\nGoodbye!\n`)
    connection.end;
};
// ----------------------------------------------------- update database
// update and employee
function updateEmployee() {
    connection.query(`SELECT * FROM employee`, function (err, res) {
        let employees = res
        let employeeNames = res.map(function(employee){
            return `${employee.first_name} ${employee.last_name}`;
        });
        connection.query(`SELECT * FROM role`, function (err, res) {
            if (err) throw err;
            let roles = res;
            let roleTitles = res.map(function(role){
                return role.title
            });
            const questions = [
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Who would you like to promote?',
                    choices: employeeNames
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is their new role?',
                    choices: roleTitles
                }
            ]
            inquirer.prompt(questions).then(answers => {
                let roleID = 0
                let employeeID = 0
                for(var i = 0; i < roles.length; i++){
                    if(answers.role === roles[i].title){
                        roleID = roles[i].id
                    };
                };
                for(var i = 0; i < employees.length; i++){
                    if(answers.employee === `${employees[i].first_name} ${employees[i].last_name}`){
                        employeeID = employees[i].id
                    };
                };
                connection.query(
                    "UPDATE employee SET ? WHERE ?",
                    [
                      {
                        role_id: roleID
                      },
                      {
                        id: employeeID
                      }
                    ],
                    function(error) {
                      if (error) throw err;
                      console.log("Bid placed successfully!");
                      chooseAction();
                    }
                  );
            });
        });
    });
};
// ----------------------------------------------------- add to database tables
// decide what type of data to add
function addData(){
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'What would you like to add??',
            choices: ['Employee', 'Department', 'Role']
        },
    ]
    // Run the employee build type based on response
    inquirer.prompt(questions).then(answers => {
        if (answers.type === 'Employee') {
            addEmployee();
        } else if (answers.type === 'Department') {
            addDepartment();
        } else {
            addRole();
        }
    });
}
// add an employee to database
function addEmployee(){
    connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        let roles = res;
        let roleTitles = res.map(function(role){
            return role.title
        });
        connection.query(`SELECT * FROM employee`, function (err, res) {
            let managers = res
            // for (var i = 0; i < managers.length; i++){

            // };
            let managerNames = res.map(function(employee){
                return `${employee.first_name} ${employee.last_name}`;
            });
            const questions = [
                {
                    type: 'input',
                    name: 'firstName',
                    message: `First Name: `,
                    validate: function (value) {
                        if (value === '') {
                            return 'please enter a name';
                        } else {
                            return true;
                        };
                    },
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: `Last Name: `,
                    validate: function (value) {
                        if (value === '') {
                            return 'please enter a name';
                        } else {
                            return true;
                        };
                    },
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'what is their role?',
                    choices: roleTitles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'who is their manager?',
                    choices: managerNames
                },
                
            ]
            inquirer.prompt(questions).then(answers => {
                let roleID = 0
                let managerID = 0
                for(var i = 0; i < roles.length; i++){
                    if(answers.role === roles[i].title){
                        roleID = roles[i].id
                    };
                };
                for(var i = 0; i < managers.length; i++){
                    if(answers.manager === `${managers[i].first_name} ${managers[i].last_name}`){
                        managerID = managers[i].id
                    };
                };
                connection.query(
                    `INSERT INTO employee SET ?`,
                    {
                        first_name: answers.firstName,
                        last_name: answers.lastName,
                        role_id: roleID,
                        manager_id: managerID
                    },
                    function (err, res) {
                        console.log('\nemployee added!\n')
                        chooseAction();
                    }
                );
            });
        });
    });
};
// add department to database
function addDepartment(){
    const questions = [
        {
            type: 'input',
            name: 'department',
            message: `Department Name: `,
            validate: function (value) {
                if (value === '') {
                    return 'please enter a department';
                } else {
                    return true;
                };
            },
        }
    ]
    inquirer.prompt(questions).then(answers => {
        connection.query(
            `INSERT INTO department SET ?`,
            {
                dept_name: answers.department
            },
            function (err, res) {
                console.log('\ndepartment added!\n')
                chooseAction();
            }
        );
    });
};
// add role to database
function addRole(){
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        let depts = res;
        let deptNames = res.map(function(dept){
            return dept.dept_name
        });
        const questions = [
            {
                type: 'input',
                name: 'roleTitle',
                message: `Role Title: `,
                validate: function (value) {
                    if (value === '') {
                        return 'please enter a title';
                    } else {
                        return true;
                    };
                },
            },
            {
                type: 'input',
                name: 'salary',
                message: `Salary: `,
                validate: function (value) {
                    if (value === '') {
                        return 'please enter a salary';
                    } else {
                        return true;
                    };
                },
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does the role belong to?',
                choices: deptNames
            },
            
        ]
        inquirer.prompt(questions).then(answers => {
            let deptID = 0
            for(var i = 0; i < depts.length; i++){
                if(answers.department === depts[i].dept_name){
                    deptID = depts[i].id
                };
            };
            connection.query(
                `INSERT INTO role SET ?`,
                {
                    title: answers.roleTitle,
                    salary: parseInt(answers.salary),
                    department_id: deptID,
                },
                function (err, res) {
                    console.log('\nrole added!\n')
                    chooseAction();
                }
            );
        });
    });
};
// ----------------------------------------------------- render data from database
// Decides what data to render
function renderTable() {
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'What data would would you like to render?',
            choices: ['Employees', 'Departments', 'Roles']
        },
    ]
    // Run the employee build type based on response
    inquirer.prompt(questions).then(answers => {
        if (answers.type === 'Employees') {
            showAllEmployees();
        } else if (answers.type === 'Departments') {
            showDepartments();
        } else {
            showRoles();
        }
    });
}
// Render all employees to table
function showAllEmployees() {
    connection.query(`SELECT first_name, last_name, title, salary, dept_name 
     FROM employee 
     INNER JOIN role ON employee.role_id = role.id 
     INNER JOIN department ON role.department_id = department.id 
     ORDER BY department.id ASC`, function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        console.log('\n');
        chooseAction()
    });
};
// Render Departments to table
function showDepartments() {
    connection.query(`SELECT * FROM department`, function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        console.log('\n');
        chooseAction()
    });
};
// Render roles to table
function showRoles() {
    connection.query(`SELECT title, salary, dept_name 
     FROM role
     INNER JOIN department ON role.department_id = department.id 
     ORDER BY department.id ASC`, function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        // console.log(res);
        console.log('\n');
        chooseAction()
    });
};
// ----------------------------------------------------- start application
startApp();


// failed matchID function to be reused becase MatchProp wont be added as a property and it just looks for the literal property of matchProp =(
// function matchID(value, matchArray, matchProp){
//     for(var i = 0; i < matchArray.length; i++){
//         if(value === matchArray[i].matchProp){
//             return matchArray[i].id;
//         };
//     };
// };
