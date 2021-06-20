module.exports = app => {
    const locations = require('../controllers/locations.controller.js');

    var router = require('express').Router();

    router.get('/', locations.findAll);

    app.use('/api/locations', router);
};