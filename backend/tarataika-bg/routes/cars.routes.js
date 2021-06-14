module.exports = app => {
    const cars = require('./../controllers/cars.controller');
  
    var router = require('express').Router();
  
    // Create a new Tutorial
    router.post('/', cars.create);
  
    // Retrieve all Tutorials
    router.get('/', cars.findAll);
  
    // Retrieve all published Tutorials
    router.get('/published', cars.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get('/:id', cars.findOne);
  
    // Update a Tutorial with id
    router.put('/:id', cars.update);
  
    // Delete a Tutorial with id
    router.delete('/:id', cars.delete);
  
    // Create a new Tutorial
    router.delete('/', cars.deleteAll);
  
    app.use('/api/cars', router);
  };