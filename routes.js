const express = require('express');
const mysql = require('mysql');
const { exit } = require('process');
const router = express.Router();
const conn = getConnection();
const pass = "password"

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database : "todo"
    })
}

router.get('/', (req, res) => {
    //Pass the authentication state to the page
    console.log(req.oidc.isAuthenticated());
    console.log(req.oidc.user);
    res.render("index", {
        title: "Larry the Listmaker", 
        isAuthenticated: req.oidc.isAuthenticated(),
        //get some user details
        user: req.oidc.user, 
    });
});

// get todo info from db
router.get('/get_todos', (req, res) =>{
    const queryString = "SELECT * FROM todos WHERE complete = '0' ORDER BY DATE_CREATED DESC"
    conn.query(queryString, (err, rows, fields) =>{
        if (err) {
            console.log("failed to query @ /get_todo: " + err);
        }
        console.log("Getting data from database at @ /get_todos");
        res.json(rows);
    })
});

// get completed todo info from db
router.get('/get_complete_todos', (req, res) =>{
    const queryString = "SELECT * FROM todos WHERE complete = '1' ORDER BY DATE_CREATED DESC"
    conn.query(queryString, (err, rows, fields) =>{
        if (err) {
            console.log("failed to query @ /complete_todo: " + err);
        }
        console.log("Getting data from database at @ /complete_todos");
        res.json(rows);
    })
});

// insert todo info to db
router.post('/add_todo', (req, res) =>{
    const todo = req.body.add_todo_input;
    const queryString = "INSERT INTO todos (todo) VALUES (?)";
    conn.query(queryString, [todo], (err, rows, fields) => {
        if (err){
            console.log("failed to insert @ /add_todo: " + todo + " " + err);
        }
        console.log("@ /add_todo : " + todo + " added");
        res.redirect('/');
    })
});

// delete todo info from db
router.post('/delete_todo/:id', (req, res) =>{
    const todo_id = req.params.id;
    const queryString = "DELETE FROM todos WHERE todo_id = ?"; //DELETE STATEMENT
    conn.query(queryString, [todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to delete @ /delete_todo: " + todo_id + " " + err);
        }
        console.log("@ /delete_todo : with id " + todo_id + " deleted");
        res.redirect('/');
    })
});

// update todo colour in db
router.post('/palette/:todo/:id', (req, res) =>{
    const todo_id = req.params.todo;
    const colour = req.params.id;
    const queryString = "UPDATE todos SET colour = ? WHERE todo_id = ?";
    conn.query(queryString, [colour, todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /palette: " + todo_id + " " + colour + " " + err);
        }
        console.log("@ /palette : with id " + todo_id + " and colour " + colour + " updated");
        res.redirect('/');
    })
});

// update todo progress / in/complete info in db
router.get('/update/:id/:mode/:value', (req, res) =>{
    const todo_id = req.params.id;
    const todo_mode = req.params.mode;
    const todo_value = req.params.value;
    let queryString = '';
    let string = '';
    if ( todo_mode == "progress"){
        queryString = "UPDATE todos SET progress = ? WHERE todo_id = ?";
        string = [todo_value, todo_id];
    }
    else if ( todo_mode == "complete"){
        queryString = "UPDATE todos SET COMPLETE = ?, DATE_COMPLETE = NOW() WHERE todo_id = ?";
        string = [todo_value, todo_id];
    }
    else if ( todo_mode == "delete"){
        queryString = "DELETE FROM todos WHERE todo_id = ?";
        string = [todo_id];
    }
    conn.query(queryString, string, (err, rows, fields) => {
        if (err){
            console.log("failed to complete mode" + todo_mode + "_update id:" + todo_id + "value:" + todo_value + " " + err);
        }
        console.log("Mode:" + todo_mode + " : with id " + todo_id + " and value " + todo_value + " updated");
        res.redirect('/');
    })
});

// update todo text in db
router.post('/change/:id', (req, res) =>{
    var todo=req.body.text;
    const todo_id = req.params.id;
    const queryString = "UPDATE todos SET TODO = ? WHERE todo_id = ?";
    conn.query(queryString, [todo, todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete text change: " + todo_id + " text: " + todo + " " + err);
        }
        console.log("@ /palette : with id: " + todo_id + " and text: " + todo + " updated");
        res.redirect('/');
    })
});

   
module.exports = router;
