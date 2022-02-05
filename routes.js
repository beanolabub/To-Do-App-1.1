const express = require('express');
const mysql = require('mysql');
const router = express.Router();

//console.log("express", express);
//console.log("mysql", mysql);
//console.log("router", router);

router.get('/', (req, res) => {
    res.render('index');
});

//router.post('/add_todo')
module.exports = router;
//console.log("routerGet", router);
console.log("module", module.exports);