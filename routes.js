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
    res.render('index');
});

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

router.post('/palette/:todo/:id', (req, res) =>{
    const todo_id = req.params.todo;
    const colour = req.params.id;
    const queryString = "UPDATE todos SET colour = ? WHERE todo_id = ?"; //UPDATE STATEMENT
    conn.query(queryString, [colour, todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /palette: " + todo_id + " " + colour + " " + err);
        }
        console.log("@ /palette : with id " + todo_id + " and colour " + colour + " updated");
        res.redirect('/');
    })
});

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

router.post('/change/:id', (req, res) =>{
    var todo=req.body.text;
    // let todo = document.getElementById('todo-text-' + todo_id).innerText;
    // const todo = req.params.todo;
    const todo_id = req.params.id;
    const queryString = "UPDATE todos SET TODO = ? WHERE todo_id = ?"; //UPDATE STATEMENT
    conn.query(queryString, [todo, todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete text change: " + todo_id + " text: " + todo + " " + err);
        }
        console.log("@ /palette : with id: " + todo_id + " and text: " + todo + " updated");
        res.redirect('/');
    })
});

   
module.exports = router;
