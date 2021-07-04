module.exports = app => {
    const vehicleExtras = require('../controllers/vehicle-extras.controller');
  
    var router = require('express').Router();
  
    router.get('/:id', vehicleExtras.findAll);
  
    app.use('/api/vehicle-extras', router);
  };