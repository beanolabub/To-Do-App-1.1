const path = require('path');
const express = require('express');
const layout = require('express-layout');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');
const { auth } = require('express-openid-connect');
require('dotenv').config();
require('dotenv').config({ path: '.env' });

const middlewares = [
    layout(),
    express.static(path.join(__dirname, 'public')), 
    bodyParser.urlencoded({extended : false})
]

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.static('images'));
app.use(middlewares);
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(auth(config));
app.use('/', routes);

app.listen(3535, () => {
    console.log("listening on port 3535, I'll be the tall one in pink");
});
