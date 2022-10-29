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

function onStart(){
inquirer.prompt([{
    name : 'Choice',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Add Employee','Update Employee Role','View All Roles','Add Role','View All Deparments','Add Depertment','Quit']
}]).then(function(request){
    let tempFunk = request.Choice
    if(tempFunk == 'Add Employee') addEmployee() 
    if(tempFunk == 'Update Employee Role') updateEmp() 
    if(tempFunk == 'View All Roles') viewRole() 
    if(tempFunk == 'Add Role') addRole() 
    if(tempFunk == 'View All Deparments') viewDep() 
    if(tempFunk == 'Add Depertment') addDep() 
    if(tempFunk == 'Quit') quit() 
})
}

function addEmployee(){
console.log('1')
}

function updateEmp(){
console.log('2')
}

function viewRole(){
db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM department_role AS role JOIN department ON  role.department_id = department.id', function (err, results) {
        console.table(results);
        onStart()
  });
}

function addRole(){
console.log('4')
}

function viewDep(){
    db.query('SELECT dep.id, dep.name AS department FROM department AS dep', function (err, results) {
        console.table(results);
        onStart()
  });
}

function addDep(){
console.log('6')
}

function quit(){
console.log('^c')
}

onStart()