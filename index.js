const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '67363667Md!',
        database: 'emp_track_db'
    }
)
console.log(`*----------------------------------------------------------------*
|    _       _     _______    _          _           _______     |
|   | |     | |   |  _____|  | |        | |         /  ___  \\    |
|   | |     | |   | |        | |        | |        /  /   \\  \\   |
|   | |_____| |   | |_____   | |        | |        |  |   |  |   |
|   |  _____  |   |  _____|  | |        | |        |  |   |  |   |
|   | |     | |   | |        | |        | |        |  |   |  |   |
|   | |     | |   | |_____   | |_____   | |_____   \\  \\___/  /   |
|   |_|     |_|   |_______|  |_______|  |_______|   \\_______/    |
|                                                                |
*----------------------------------------------------------------*
`)
function onStart(){
inquirer.prompt([{
    name : 'Choice',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Add Employee','Update Employee Role','View All Roles','Add Role','View All Deparments','Add Depertment','View All Employees','Quit']
}]).then(function(request){
    let tempFunk = request.Choice
    if(tempFunk == 'Add Employee') addEmployee() 
    if(tempFunk == 'Update Employee Role') updateEmp() 
    if(tempFunk == 'View All Roles') viewRole() 
    if(tempFunk == 'Add Role') addRole() 
    if(tempFunk == 'View All Deparments') viewDep() 
    if(tempFunk == 'Add Depertment') addDep() 
    if(tempFunk == 'View All Employees') viewEmp() 
    if(tempFunk == 'Quit') quit() 
})
}

function addEmployee(){
    let managers = []
    let roles = []
    let tempRoleId
    let tempManId
    db.query('SELECT dep.first_name FROM department_employee AS dep', function (err, results) {

        for(i=0;i<results.length;i++){
            managers.push(results[i].first_name)
        }
    })

    db.query('SELECT dep.title FROM department_role AS dep', function (err, results) {

        for(i=0;i<results.length;i++){
            roles.push(results[i].title)
        }
    })

    inquirer.prompt([{
        name : 'firstName',
        message: 'What is the employees first name?',
        type: 'input'
    },{
        name : 'lastName',
        message: 'What is the employees last name?',
        type: 'input'
    },{
        name : 'role',
        message: 'What is the employees role?',
        type: 'list',
        choices: roles
    },{
        name : 'manager',
        message: 'Who is the employees manager?',
        type: 'list',
        choices: managers
    }
    ]).then(function(response){
        console.log(response)
        db.query('SELECT * FROM department_role WHERE title=?',response.role, function (err, results) {
            tempRoleId = results[0].id
            db.query('SELECT * FROM department_employee WHERE first_name=?',response.manager, function (err, results) {
                tempManId = results[0].id
                db.query(`INSERT INTO department_employee (first_name , last_name , role_id , manager_id) VALUES ('${response.firstName}' ,'${response.lastName}' ,'${tempRoleId}','${tempManId}')`  ,function (err, results) {
                    onStart()
                })
            })
        })
    })
}

function updateEmp(){
    let employee = []
    let roles = []
    let RoleId 
    db.query('SELECT dep.first_name FROM department_employee AS dep', function (err, results) {
        console.log(results)
        for(i=0;i<results.length;i++){
           employee.push(results[i].first_name)
        }
    

        db.query('SELECT dep.title FROM department_role AS dep', function (err, results) {

            for(i=0;i<results.length;i++){
                roles.push(results[i].title)
            }

            inquirer.prompt([{
                name : 'employeeSelect',
                message: 'Which employee would you like to update',
                type: 'list',
                choices: employee
            },{
                name : 'roleAssign',
                message: 'What role would you like to give them?',
                type: 'list',
                choices: roles
            }
            ]).then(function(response){
                db.query('SELECT * FROM department_role WHERE title=?',response.roleAssign, function (err, results) {
                    console.log(response.roleAssign)
                    console.log(response.employeeSelect)
                    RoleId = results[0].id
                    db.query(`UPDATE department_employee SET role_id = '${RoleId}' WHERE first_name = '${response.employeeSelect}'`,function (err, results) {
                        console.log(err)
                        console.table(results);
                        onStart()
                    })
                })
            })
        })
    })
}

function viewRole(){
db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM department_role AS role JOIN department ON  role.department_id = department.id ORDER BY role.id ASC', function (err, results) {
        console.table(results);
        onStart()
  });
}

function addRole(){
    departmentTemp = []
    let tempId
    db.query('SELECT dep.id, dep.name AS department FROM department AS dep', function (err, results) {
        
        for(i=0;i<results.length;i++){
            departmentTemp.push(results[i].department)
        }
    })

    inquirer.prompt([{
        name : 'roleName',
        message: 'What would you like to name the role?',
        type: 'input'
    },{
        name : 'roleSalary',
        message: 'What is the salary of the role?',
        type: 'input'
    },{
        name : 'roleDepart',
        message: 'What department does the role belong to?',
        type: 'list',
        choices: departmentTemp
    }
    ]).then(function(response){
        db.query('SELECT * FROM department WHERE name=?',response.roleDepart, function (err, results) {
            console.log(results)
           tempId = results[0].id
        db.query(`INSERT INTO department_role (title , salary , department_id) VALUES ('${response.roleName}' ,'${response.roleSalary}' ,'${tempId}')`  ,function (err, results) {
            db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM department_role AS role JOIN department ON  role.department_id = department.id ORDER BY role.id ASC', function (err, results) {
                console.table(results);
                onStart()
          });
      });
      })
    })
}

function viewDep(){
    db.query('SELECT dep.id, dep.name AS department FROM department AS dep', function (err, results) {
        console.table(results);
        onStart()
  });
}

function addDep(){
inquirer.prompt([{
    name : 'departmentName',
    message: 'What would you like to name the new department?',
    type: 'input'
}]).then(function(response){
    db.query('INSERT INTO department (name) VALUES(?)', response.departmentName ,function (err, results) {
        db.query('SELECT dep.id, dep.name AS department FROM department AS dep', function (err, results) {
            console.table(results);
            onStart()
      })
  });
})
}

function viewEmp(){
    db.query(   `SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary ,department.name AS department , m.first_name AS manager
                FROM department_employee AS emp 
                JOIN department_role AS role ON  emp.role_id = role.id
                JOIN department ON  role.department_id = department.id
                LEFT JOIN department_employee AS m ON m.id = emp.manager_id
                ORDER BY role.id ASC`,
                 function (err, results) {
        console.table(results);
        onStart()
  });
}

function quit(){
console.log('Thankyou for using sivad products')
}



onStart()