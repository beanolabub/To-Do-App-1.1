const path = require('path');
const express = require('express');
const layout = require('express-layout');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('images'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

const middlewares = [
    layout(),
    express.static(path.join(__dirname, 'public')), 
    bodyParser.urlencoded({extended : false})
]
app.use(middlewares);

app.use('/', routes);
app.listen(3535, () => {
    console.log('listening on port 3535');
});

app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));