const db = require('../models');
const Pictures = db.pictures;

exports.upload = (req, res) => {

    console.log(req.file);
    Pictures.create({

    path: req.file.originalname,
    type: req.file.mimetype,
    img: req.file.buffer,
    listing_id: req.listingid

   }).then(() => {
    res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
        }).catch(err => {
        console.log(err);
    res.json({msg: 'Error', detail: err});
  });
};

exports.getpictures = (req, res) => {

  Pictures.findAll({where: {listing: req.query.listingid}})
  .then((data) =>{
    res.send(data);
  }).catch(err => {
    console.log(err);
    res.json({msg: 'Error', detail: err});
  });
}