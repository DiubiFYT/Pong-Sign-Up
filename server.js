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

app.get('/', function (req, res) {
    res.render('index', {});
});

app.get('/signup.html', function (req, res) {
    res.render('signup.html', {});
});

app.post('/signup', function (req, res) {
    console.log("Nickname: " + req.body.nickname);
    console.log("Password: " + req.body.password);

    var nickname = req.body.nickname;
    var password = req.body.password;

    if (fs.existsSync("accounts/" + nickname + ".json")) {
        res.render('signuperror.html', {result: "This user already exists."}, function(err,html){
            res.send(html);
        });
    }
    else {
        var user = {
            nickname: nickname,
            password: password,
            ip: ip
        }

        var json = JSON.stringify(user);
        fs.writeFile("accounts/" + req.body.nickname + ".json", json, function (err) {
            if (err) {
                throw console.error(err);
            }
        });
        res.render('signup.html', {result: "This user already exists."}, function(err,html){
            res.send(html);
        });
    }
});

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

app.listen(port);

module.exports = app;