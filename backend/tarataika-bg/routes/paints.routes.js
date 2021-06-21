module.exports = app => {
    const paints = require('../controllers/paints.controller.js');

    var router = require('express').Router();

    router.get('/', paints.findAll);

    app.use('/api/paints', router);
};