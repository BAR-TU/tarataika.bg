const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const {createTokens, validateToken} = require('../JWT/JWT');
const {sign, verify} = require("jsonwebtoken");

exports.register = (req, res) => {

    if (req.body.username !== '' && req.body.password !== '' &&
    req.body.phone_number !== '' && req.body.email !== '') {

        const username = req.body.username;
        const password = req.body.password;
        const phone_number = req.body.phone_number;
        const email = req.body.email;

        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                username: username,
                password: hash,
                phone_number: phone_number,
                email: email,
                role: "user"
            }).then(() => {
                res.json("Успешна регистрация!");
            }).catch(() => {
                res.status(400).json({error: "Неуспешна регистрация!"});
            });
        });
    } else {
        res.status(400).json({error: "Неуспешна регистрация!"});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({where: {username: username}});

    if(!user){
        res.status(400).json({error: "Не съществува такъв потребител!"});
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if(!match) {
            res.status(400).json({error: "Грешна парола"});
        } else {

            const accessToken = createTokens(user);

            res.cookie("access-token", accessToken, {
                maxAge: 60*60*24*30*1000,
                httpOnly: true,
            });

            res.json(username);
        }
    });
};

exports.profile = (req, res) => {
    if (req.authenticated && req.id) {
        
        User.findOne({where: { id: req.id } }).then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Възникна грешка докато се сваляше информацията за потребителя."
            });
        });
    }
};

exports.logout = (req, res) => {

    res.cookie("access-token", {expires: Date.now()}); 

    res.json("Успешно излизане от профила.");
};