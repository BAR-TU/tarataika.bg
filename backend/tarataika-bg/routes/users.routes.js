const { validateToken } = require('../JWT/JWT');

module.exports = app => {
    const users = require('../controllers/users.controller');
  
    var router = require('express').Router();
  
    router.post("/register", users.register);
    
    router.post("/login", users.login);
    
    router.get("/profile", validateToken, users.profile);

    router.post('/logout', users.logout);

    app.use('/api/users', router);
  };