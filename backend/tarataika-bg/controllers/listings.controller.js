const db = require('../models');
const Listings = db.listings;
const op = db.Sequelize.Op;
const Makes = db.makes;
const Model = db.models;
const Engine = db.engines;
const Gearbox = db.gearboxes;
const Location = db.locations;
const Paint = db.paints;
const Ecategory = db.eurocategories;
const Categories = db.vehiclesCategories;

exports.findById = (req, res) => {

    const id = req.params.id;

    Listings.findOne({ include: [
        {
            model: Makes,
            as: 'make',
            attributes: ["make_id", "make"]
        },
        {
            model: Model,
            as: 'model',
            attributes: ["model_id", "model", "make_id", "vehicle_category_id"]
        },
        {
            model: Engine,
            as: 'engine',
            attributes: ["id", "type"]
        },
        {
            model: Gearbox,
            as: 'gearbox',
            attributes: ["id", "type"]
        },
        {
            model: Location,
            as: 'location',
            attributes: ["id", "location", "coordinates"]
        },
        {
            model: Paint,
            as: 'paint',
            attributes: ["id", "paint"]
        },
        {
            model: Ecategory,
            as: 'ecategory',
            attributes: ["id", "category"]
        },
        {
            model: Categories,
            as: 'vehicle_category',
            attributes: ["vehicle_category_id", "vehicle_category"]
        }
        
    ],
        where: {id: id}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured while retrieving listings."
        });
    });

};