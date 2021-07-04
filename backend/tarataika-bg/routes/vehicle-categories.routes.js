module.exports = app => {
    const categories = require('../controllers/vehicle-categories.controller');
  
    var router = require('express').Router();
  
    router.get('/', categories.findAll);
  
    app.use('/api/vehicle-categories', router);
  };