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
    const queryString = "SELECT * FROM todos WHERE status = 0 ORDER BY created DESC"
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
    const queryString = "SELECT * FROM todos WHERE status = 1 ORDER BY created DESC"
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
    const queryString = "INSERT INTO todos (text) VALUES (?)";
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
    const id = req.params.id;
    const queryString = "DELETE FROM todos WHERE id = ?"; //DELETE STATEMENT
    conn.query(queryString, [id], (err, rows, fields) => {
        if (err){
            console.log("failed to delete @ /delete_todo: " + id + " " + err);
        }
        console.log("@ /delete_todo : with id " + id + " deleted");
        res.redirect('/');
    })
});

// update todo colour in db
router.post('/palette/:todo/:id', (req, res) =>{
    const id = req.params.todo;
    const colour = req.params.id;
    const queryString = "UPDATE todos SET colour = ? WHERE id = ?";
    conn.query(queryString, [colour, id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /palette: " + id + " " + colour + " " + err);
        }
        console.log("@ /palette : with id " + id + " and colour " + colour + " updated");
        res.redirect('/');
    })
});

// update todo progress / in/complete info in db
router.get('/update/:id/:mode/:value', (req, res) =>{
    const id = req.params.id;
    const todo_mode = req.params.mode;
    const todo_value = req.params.value;
    let queryString = '';
    let string = '';
    console.log(todo_mode);
    if ( todo_mode == "progress"){
        queryString = "UPDATE todos SET progress = ? WHERE id = ?";
        string = [todo_value, id];
    }
    else if ( todo_mode == "complete"){
        queryString = "UPDATE todos SET COMPLETE = ?, DATE_COMPLETE = NOW() WHERE id = ?";
        string = [todo_value, id];
    }
    else if ( todo_mode == "delete"){
        queryString = "DELETE FROM todos WHERE id = ?";
        string = [id];
    }
    conn.query(queryString, string, (err, rows, fields) => {
        if (err){
            console.log("failed to complete mode" + todo_mode + "_update id:" + id + "value:" + todo_value + " " + err);
        }
        console.log("Mode:" + todo_mode + " : with id " + id + " and value " + todo_value + " updated");
        res.redirect('/');
    })
});

// update todo text in db
router.post('/change/:id', (req, res) =>{
    var todo=req.body.text;
    const id = req.params.id;
    const queryString = "UPDATE todos SET text = ? WHERE id = ?";
    conn.query(queryString, [todo, id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete text change: " + id + " text: " + todo + " " + err);
        }
        console.log("@ /palette : with id: " + id + " and text: " + todo + " updated");
        res.redirect('/');
    })
});

   
module.exports = router;
