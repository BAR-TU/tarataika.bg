const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({username: user.username, id: user.id, role: user.role},
        "BAR-LogisticsTopJWTSecret1234")
        return accessToken;
};

const validateToken = (req, res, next) => {

    const accessToken = req.cookies["access-token"]

    if(!accessToken) {
        return res.status(400).json({error: "Потребителят не е валидиран!"});
    }

    try {
        const validToken = verify(accessToken, "BAR-LogisticsTopJWTSecret1234")
        if(validToken) {
            req.authenticated = true;
            req.id = validToken.id;
            req.username = validToken.username;
            req.role = validToken.role;
            return next();
        }
    } catch (err) {
        return res.status(400).json({error: err});
    }
};

module.exports = {createTokens, validateToken}