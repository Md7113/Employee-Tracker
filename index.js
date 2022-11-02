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
console.log(`
*----------------------------------------------------------------------*
|    _       _     _________    _            _             _______     |
|   | |     | |   |  _______|  | |          | |           /  ___  \\    |
|   | |     | |   | |          | |          | |          /  /   \\  \\   |
|   | |_____| |   | |_______   | |          | |          |  |   |  |   |
|   |  _____  |   |  _______|  | |          | |          |  |   |  |   |
|   | |     | |   | |          | |          | |          |  |   |  |   |
|   | |     | |   | |_______   | |_______   | |_______   \\  \\___/  /   |
|   |_|     |_|   |_________|  |_________|  |_________|   \\_______/    |
|                                                                      |
|    _________     _       _    _________    ________     _________    |
|   |___   ___|   | |     | |  |  _______|  /  ____  \\   |  _______|   |
|       | |       | |     | |  | |          | |    | |   | |           |
|       | |       | |_____| |  | |_______   | |____| |   | |_______    |
|       | |       |  _____  |  |  _______|  |  __  __/   |  _______|   |
|       | |       | |     | |  | |          | |  \\ \\     | |           |
|       | |       | |     | |  | |_______   | |   \\ \\    | |_______    |
|       |_|       |_|     |_|  |_________|  |_|    \\_\\   |_________|   |
|                                                                      |
*----------------------------------------------------------------------*
`)
function onStart(){
inquirer.prompt([{
    name : 'Choice',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Add Employee','Update Employee Role','Update Employee Manager','View All Roles','Add Role','View All Deparments','Add Depertment','view cost of department','View All Employees','View All Employees by manager','View All Employees by deperatment','Quit']
}]).then(function(request){
    let tempFunk = request.Choice
    if(tempFunk == 'Add Employee') addEmployee() 
    if(tempFunk == 'Update Employee Role') updateEmp() 
    if(tempFunk == 'View All Roles') viewRole() 
    if(tempFunk == 'Add Role') addRole() 
    if(tempFunk == 'View All Deparments') viewDep() 
    if(tempFunk == 'Add Depertment') addDep() 
    if(tempFunk == 'View All Employees') viewEmp('role.id') 
    if(tempFunk == 'View All Employees by manager') viewEmp('manager') 
    if(tempFunk == 'View All Employees by deperatment') viewEmp('department') 
    if(tempFunk == 'Update Employee Manager') updateMan()
    if(tempFunk == 'Quit') quit() 
    if(tempFunk == 'view cost of department') sumCost()
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
    db.query(`SELECT CONCAT(dep.first_name,' ', dep.last_name) AS employee FROM department_employee AS dep`, function (err, results) {
        for(i=0;i<results.length;i++){
           employee.push(results[i].employee)
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
                    RoleId = results[0].id
                    let splitName = response.employeeSelect.split(' ')
                    db.query(`UPDATE department_employee SET role_id = '${RoleId}' WHERE first_name= '${splitName[0]}' AND last_name = '${splitName[1]}'`,function (err, results) {
                        onStart()
                    })
                })
            })
        })
    })
}

function updateMan(){
    let employee = []
    let managers = []
    let ManId 
    db.query(`SELECT CONCAT(dep.first_name,' ', dep.last_name) AS employee FROM department_employee AS dep`, function (err, results) {
        for(i=0;i<results.length;i++){
           employee.push(results[i].employee)
        }
    

        db.query(`SELECT CONCAT(dep.first_name,' ', dep.last_name) AS employee FROM department_employee AS dep`, function (err, results) {

            for(i=0;i<results.length;i++){
                managers.push(results[i].employee)
            }

            inquirer.prompt([{
                name : 'employeeSelect',
                message: 'Which employee would you like to update',
                type: 'list',
                choices: employee
            },{
                name : 'manAssign',
                message: 'What manager would you like to give them?',
                type: 'list',
                choices: managers
            }
            ]).then(function(response){
                let splitName = response.manAssign.split(' ')
                let splitName1 = response.employeeSelect.split(' ')
                db.query(`SELECT * FROM department_employee WHERE first_name= '${splitName[0]}' AND last_name = '${splitName[1]}'`, function (err, results) {
                    ManId = results[0].id
                    db.query(`UPDATE department_employee SET manager_id = '${ManId}' WHERE first_name= '${splitName1[0]}' AND last_name = '${splitName1[1]}'`,function (err, results) {
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
           tempId = results[0].id
        db.query(`INSERT INTO department_role (title , salary , department_id) VALUES ('${response.roleName}' ,'${response.roleSalary}' ,'${tempId}')`  ,function (err, results) {
                onStart()
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
            onStart()
  });
})
}

function viewEmp(passOrder){
    db.query(   `SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary ,department.name AS department , CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM department_employee AS emp 
                JOIN department_role AS role ON  emp.role_id = role.id
                JOIN department ON  role.department_id = department.id
                LEFT JOIN department_employee AS m ON m.id = emp.manager_id
                ORDER BY ${passOrder}`,
                 function (err, results) {
        console.table(results);
        onStart()
  });
}

function sumCost(){
    db.query('SELECT dep.name AS department, SUM(salary) AS cost FROM department_role JOIN department AS dep ON  department_role.department_id = dep.id GROUP BY department', function (err, results) {
        console.log(err)
        console.table(results);
        onStart()
      });
}


function quit(){
console.log('Thankyou for using sivad products')
process.exit()
}





onStart()