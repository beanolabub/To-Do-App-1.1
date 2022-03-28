const express = require('express');
const mysql = require('mysql');
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
    const queryString = "SELECT * FROM todos WHERE complete = '0'"
    conn.query(queryString, (err, rows, fields) =>{
        if (err) {
            console.log("failed to query @ /get_todo: " + err);
        }
        console.log("Getting data from database at @ /get_todos");
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

router.post('/complete_todo/:id', (req, res) =>{
    const todo_id = req.params.id;
    const queryString = "UPDATE todos SET COMPLETE = '1' WHERE todo_id = ?"; //UPDATE STATEMENT
    conn.query(queryString, [todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /complete_todo: " + todo_id + " " + err);
        }
        console.log("@ /complete_todo : with id " + todo_id + " completed");
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

router.get('/complete_todos', (req, res) =>{
    const queryString = "SELECT * FROM todos WHERE complete = '1'"
    conn.query(queryString, (err, rows, fields) =>{
        if (err) {
            console.log("failed to query @ /complete_todo: " + err);
        }
        console.log("Getting data from database at @ /complete_todos");
        res.json(rows);
    })
});

router.post('/incomplete_todo/:id', (req, res) =>{
    const todo_id = req.params.id;
    const queryString = "UPDATE todos SET COMPLETE = '0', DATE_COMPLETE = NULL WHERE todo_id = ?"; //UPDATE STATEMENT
    conn.query(queryString, [todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /incomplete_todo: " + todo_id + " " + err);
        }
        console.log("@ /incomplete_todo : with id " + todo_id + " marked incomplete");
        res.redirect('/');
    })
});

router.post('/archive_todo/:id', (req, res) =>{
    const todo_id = req.params.id;
    const queryString = "UPDATE todos SET COMPLETE = '2', DATE_COMPLETE = NULL WHERE todo_id = ?"; //UPDATE STATEMENT
    conn.query(queryString, [todo_id], (err, rows, fields) => {
        if (err){
            console.log("failed to complete @ /archive_todo: " + todo_id + " " + err);
        }
        console.log("@ /archive_todo : with id " + todo_id + " marked incomplete");
        res.redirect('/');
    })
});

module.exports = router;
