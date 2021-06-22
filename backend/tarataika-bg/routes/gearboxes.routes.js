module.exports = app => {
    const gearboxes = require('../controllers/gearboxes.controller.js');

    var router = require('express').Router();

    router.get('/', gearboxes.findAll);

    app.use('/api/gearboxes', router);
};