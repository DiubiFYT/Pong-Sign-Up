const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const port = 3000;

const app = express();

app.use( bodyParser.json() );

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/styles", express.static(path.join(__dirname, '/styles')));
app.use("/js", express.static(path.join(__dirname, '/js')));

app.get('/', function(req, res){
    res.render('index', {});
});

app.post('/signup', function (req, res) {
    console.log("Nickname: " + req.body.nickname);
    console.log("Password: " + req.body.password);

    let nickname = req.body.nickname;
    let password = req.body.password;

    if(!nickname && !password){
        return;
    }
    else if(fs.existsSync("accounts/" + nickname + ".json")){
        return;
    }
    else{
        let user = {
            nickname: req.body.nickname,
            password: req.body.password
        }
    
        let json = JSON.stringify(user);
        fs.writeFile("accounts/" + req.body.nickname + ".json", json, function(err){
            if(err){
                return console.error(err);
            }
        });
        res.redirect('signup.html');
    }
});

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname);
app.set('view engine', 'html');

app.listen(port);

module.exports = app;