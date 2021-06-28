const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const {createTokens, validateToken} = require('../JWT/JWT');

exports.register = (req, res) => {
    const { username, password, phone_number, email } = req.query;
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            password: hash,
            phone_number: phone_number,
            email: email,
            role: "user"
        }).then(() => {
            res.json("Успешна регистрация!");
        }).catch((err) => {
            if(err) {
                res.status(400).json({error: err});
            }
        });
    });
};

exports.login = async (req, res) => {
    const {username, password} = req.query;

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

            res.json("Logged in");
        }
    });
};

exports.profile = (req, res) => {
    res.json("Profile");
};