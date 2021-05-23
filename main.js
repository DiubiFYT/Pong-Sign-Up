 var btn = document.getElementById("btn");

 let nickname = document.getElementById("nickname").value;
    let password = document.getElementById("password").value;

    let fs = require('fs');

    if (!fs.exists(nickname + '.json')) {
        let account = {
            nickname: nickname,
            password: password
        };

        let json = JSON.stringify(account);

        fs.writeFile(nickname + '.json', json);
        alert("Sign-Up succeeded!");
    }
    else {
        alert("This account already exists.");
    }
