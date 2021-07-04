module.exports = app => {
    const models = require('../controllers/models.controller');
  
    var router = require('express').Router();
  
    router.get('/category/:category/:make', models.findAllByCategoryAndMake);
  
    app.use('/api/models', router);
  };