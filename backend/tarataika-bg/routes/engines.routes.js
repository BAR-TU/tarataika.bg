module.exports = app => {
    const engines = require('../controllers/engines.controller.js');

    var router = require('express').Router();

    router.get('/', engines.findAll);

    app.use('/api/engines', router);
};