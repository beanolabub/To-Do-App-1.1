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
})

module.exports = router;
