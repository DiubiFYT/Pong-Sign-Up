const express = require('express');
const connect = require('connect');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = 3000;

const serveStatic = require('serve-static');
const app = express();

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index', {});
});

app.post('/signup', function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
});

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

app.listen(port);

module.exports = app;