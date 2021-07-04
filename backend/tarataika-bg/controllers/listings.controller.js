const db = require('../models');
const models = require('../models/models');
const Listings = db.listings;
const Op = db.Sequelize.Op;
const Makes = db.makes;
const Model = db.models;
const Engine = db.engines;
const Gearbox = db.gearboxes;
const Location = db.locations;
const Paint = db.paints;
const Ecategory = db.eurocategories;
const Categories = db.vehiclesCategories;
const VehicleExtras = db.vehicleExtras;
const Pictures = db.pictures;
let extrasChosen;
var yearCondition;

exports.findByCriteria = (req, res) => {
    var includeModels = [];

    if (req.query.make !== '---' && req.query.make !== '') {
        includeModels.push({
            model: Makes,
            as: 'make',
            attributes: ["make_id", "make"],
            where: { make: req.query.make }
        });
    } else {
        includeModels.push({
            model: Makes,
            as: 'make',
            attributes: ["make_id", "make"]
        });
    }
    if (req.query.model !== '---' && req.query.model !== '') {
        includeModels.push({
            model: Model,
            as: 'model',
            attributes: ["model_id", "model", "make_id", "vehicle_category_id"],
            where: { model: req.query.model}
        });
    } else {
        includeModels.push({
            model: Model,
            as: 'model',
            attributes: ["model_id", "model", "make_id", "vehicle_category_id"]
        });
    }
    if (req.query.engine !== '---' && req.query.engine !== '')
        includeModels.push({
            model: Engine,
            as: 'engine',
            attributes: ["id", "type"],
            where: { type: req.query.engine}
        });
    if (req.query.gearbox !== '---' && req.query.gearbox !== '')
        includeModels.push({
            model: Gearbox,
            as: 'gearbox',
            attributes: ["id", "type"],
            where: { type: req.query.gearbox}
        });
    if (req.query.location !== '---' && req.query.location !== '') {
        includeModels.push({
            model: Location,
            as: 'location',
            attributes: ["id", "location", "coordinates"],
            where: { location: req.query.location}
        });
    } else {
        includeModels.push({
            model: Location,
            as: 'location',
            attributes: ["id", "location", "coordinates"],
        });
    }
    if (req.query.paint !== '---' && req.query.paint !== '')
        includeModels.push({
            model: Paint,
            as: 'paint',
            attributes: ["id", "paint"],
            where: { paint: req.query.paint}
        });
    if (req.query.ecategory !== '---' && req.query.ecategory !== '')
        includeModels.push({
            model: Ecategory,
            as: 'ecategory',
            attributes: ["id", "category"],
            where: { category: req.query.ecategory}
        });
    if (req.query.category !== '---' && req.query.category !== '')
        includeModels.push({
            model: Categories,
            as: 'vehicle_category',
            attributes: ["vehicle_category_id", "vehicle_category"],
            where: { vehicle_category: req.query.category}
        });
        
        var wheres = [];
        let minYear = req.query.minYear;
        let maxYear = req.query.maxYear;

    if (req.query.maxYear !== '') {
        if (req.query.minYear !== '') {
            wheres.push({ first_registration: { [Op.gte]: minYear, [Op.lte]: maxYear } });
        } else {
            wheres.push({ first_registration: { [Op.lte]: maxYear } });
        }
    } else {
        if (req.query.minYear !== '') {
            wheres.push({ first_registration: { [Op.gte]: minYear } });
        }
    }

    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;

    if (req.query.maxPrice !== '') {
        if (req.query.minPrice !== '') {
            wheres.push({ price: { [Op.gte]: minPrice, [Op.lte]: maxPrice } });
        } else {
            wheres.push({ price: { [Op.lte]: maxPrice } });
        }
    } else {
        if (req.query.minPrice !== '') {
            wheres.push({ price: { [Op.gte]: minPrice } });
        }
    }

    let minPower = req.query.power;

    if (req.query.power !== '') {
        wheres.push({ power: { [Op.gte]: minPower } });
    }

    let maxRange = req.query.mileage;

    if (req.query.mileage !== '') {
        wheres.push({ mileage: { [Op.lte]: maxRange } });
    }
    
    extrasChosen = [];

    Object.keys(req.query).forEach(e => {
        if (req.query[e] === 'on') {
            extrasChosen.push(e);
        }
        })

        if (extrasChosen.length > 0) {
            includeModels.push({
                model: VehicleExtras,
                as: 'extras',
                attributes: ["extra_id", "extra"],
                through: {
                    attributes: ["listing_id", "extra_id"],
                },
                where: { 
                    extra: {
                        [Op.in]: extrasChosen
                    }
                }
            })
        }
    Listings.findAll({ include: includeModels,
        where: wheres
    }
    )
    .then(data => {
        if (extrasChosen.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (extrasChosen.length !== data[i].extras.length) {
                    data.splice(i, 1);
                }
            }
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Възникна грешка докато се сваляха обявите."
        });
    });
}

exports.update = (req, res) => {
    const id = req.query.id;
    Listings.update({ views: req.query.views }, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
              message: "Обявата беше обновена успешно!"
            });
          } else {
            res.send({
              message: 'Неуспешно обновяване на обява с id=${id}. Може би обявате не е била намерена или req.body е празно!'
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Грешка при обновяването на обява с id=" + id
          });
        });
}

exports.findMostlyViewed = (req, res) => {

    Listings.findAll({
        limit: 10,
        order: [['views', 'DESC']]
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Възникна грешка докато се сваляха обявите."
        });
    });
}

exports.findByIdInfo = (req, res) => {
    const id = req.params.id;

    Listings.findOne({ include: [
        {
            model: Makes,
            as: 'make',
            attributes: ['make_id', 'make']
        },
        {
            model: Model,
            as: 'model',
            attributes: ["model_id", "model", "make_id", "vehicle_category_id"]
        }
    ],
    where: { id: id }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Възникна грешка докато се сваляха обявите."
        });
    });
}

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
            attributes: ["id", "type"],
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
        },
        {
            model: VehicleExtras,
            as: 'extras',
            attributes: ["extra_id", "extra"],
            through: {
                attributes: ["listing_id", "extra_id"],
            }
        }
        
    ],
        where: {id: id}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Възникна грешка докато се сваляха обявите."
        });
    });

};

exports.addlisting = async (req, res) => {
     let makeid = "";
        await Makes.findOne({ where: {make: req.body.make}})
        .then(res => {
            makeid = res.make_id
        });

    let modelid = "";
        await Model.findOne({where: {model: req.body.model}})
        .then(res => {
        modelid = res.model_id
        });

    let categoryid = "";
        await Categories.findOne({where: {vehicle_category: req.body.category}})
        .then(res => {
            categoryid = res.vehicle_category_id
    });

    let price = req.body.price;

    let engine = "";
    await Engine.findOne({where: {type: req.body.engine}})
        .then(res => {
            engine = res.id
    });

    let mileage = req.body.mileage;

    let gearboxid = "";
    await Gearbox.findOne({where: {type: req.body.gearbox}})
        .then(res => {
            gearboxid = res.id
    });

    let vip_status = false;
    let views = 0;

    let locationid = "";
    await Location.findOne({where: {location: req.body.location}})
        .then(res => {
            locationid = res.id
    });

    let status = true;

    let paintid = "";
    await Paint.findOne({where: {paint: req.body.paint}})
        .then(res => {
            paintid = res.id
    });

    let info = req.body.info;

    let eurocategoryid = "";
    await Ecategory.findOne({where: {category: req.body.ecategory}})
        .then(res => {
            eurocategoryid = res.id
    });

    let first_registration = req.body.year;
    let power = req.body.power;

    let userid = req.id;

    let extras = [];
    Object.keys(req.body).forEach(e => {
        if(req.body[e] === 'on'){
            VehicleExtras.findOne({where: {extra: e}})
            .then(res => {
                extras.push(res.extra_id);
            });
        }
    });


    Listings.create({
        make_id: makeid,
        model_id: modelid,
        vehicle_category_id: categoryid,
        price: price,
        engine_id: engine,
        mileage: mileage,
        gearbox_id: gearboxid,
        user_id: userid,
        vip_status: vip_status,
        views: views,
        location_id: locationid,
        status: status,
        paint_id: paintid,
        info: info,
        eurocategory: eurocategoryid,
        first_registration: first_registration,
        power: power
     }).then((res ) => {
        const listingid = res.id;
        for(let i = 0; i < extras.length; i++){
            Listings.findOne({where: {id: listingid}})
            .then((listing) => {
                VehicleExtras.findOne({where: {extra_id: extras[i]}})
                .then((vehicle_extra) => {
                    listing.addExtras(vehicle_extra);
                });
            });
        }
        for(let j = 0; j<pictures.length; j++){
            Listings.findOne({where: {id: listingid}})
            .then((listing) => {
                Pictures.create({
                    
                })
                .then((picture_id) => {
                    listing.addExtras(picture_id);
                });
            });
        }
     });
}