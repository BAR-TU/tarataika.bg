module.exports = app => {
    const pictures = require('../controllers/pictures.controller');
  
    var router = require('express').Router();
  
    router.post("/upload", pictures.upload);
    
    router.get("/retrieve", pictures.getpictures);

    app.use('/api/pictures', router);
  };