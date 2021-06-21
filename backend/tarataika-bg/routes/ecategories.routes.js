module.exports = app => {
    const eurocategories = require('../controllers/ecategories.controller.js');

    var router = require('express').Router();

    router.get('/', eurocategories.findAll);

    app.use('/api/eurocategories', router);
};