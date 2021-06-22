module.exports = app => {
    const listings = require('../controllers/listings.controller.js');

    var router = require('express').Router();
    
    router.get('/criteria', listings.findByCriteria);

    router.get('/:id', listings.findById);

    app.use('/api/listings', router);
};