const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const port = 3000;

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/styles", express.static(path.join(__dirname, '/styles')));
app.use("/js", express.static(path.join(__dirname, '/js')));
app.use("/accounts", express.static(path.join(__dirname, '/accounts')));

app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/signup.html', function (req, res) {
    res.render('signup.html', {});
});

app.post('/signup', function (req, res) {
    console.log("Nickname: " + req.body.nickname);
    console.log("Password: " + req.body.password);

    var nickname = req.body.nickname.trim();
    var password = req.body.password.trim();

    var regex = /\W|_/g;

    if(regex.test(nickname)){
        res.render('signup.html', {msg: "Only alphanumeric characters are allowed."}, function(err,html){
            res.send(html);
        });
    }
    else if (fs.existsSync("accounts/" + nickname + ".json")) {
        res.render('signup.html', {msg: "This user already exists."}, function(err,html){
            res.send(html);
        });
    }
    else {
        var user = {
            Nickname: nickname,
            Password: password,
            IP: null,
            LANIP: null
        }

        var json = JSON.stringify(user);
        fs.writeFile("accounts/" + req.body.nickname + ".json", json, function (err) {
            if (err) {
                return console.error(err);
            }
        });
        res.render('signup.html', {msg: "You signed up!"}, function(err,html){
            res.send(html);
        });
    }
});

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

app.listen(port);

module.exports = app;