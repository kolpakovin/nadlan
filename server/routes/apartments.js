var express = require('express');
var router = express.Router();
const multer = require('multer');

const {getAll, byId, getImagesById, newApartment}  = require('../db/api/apartments')

const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        console.log("Hello people in storage");
        cb(null, 'public/images/apartment')
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
const upload = multer({storage})

router.get ('/', function(req, res, next) {
    console.log('get apartments', req.query);
    getAll(req.query)
        .then(apartments => res.status(200).json({apartments}))
        .catch(error => res.status(500).json({error: error.message}))
    })    

router.get ('/:id', function(req, res, next) {
    byId(req.params.id)
    .then(apartment => res.status(200).json({apartment}))
    .catch(error => res.status(500).json({error: error.message})) 
})
router.get ('/:id/images', function(req, res, next) {
    getImagesById(req.params.id)
    .then(apartment => res.status(200).json({apartment}))
    .catch(error => res.status(500).json({error: error.message})) 
})
router.post('/', upload.single('main_image') ,function(req, res, next) {
    console.log('req.body: ',req.body)
    console.log('req.file: ',req.file)
    const main_image = req.file.originalname;
    const {user_id, address, city_id, price, rooms, baths,sqft, sale_status, available, property_type, status} = req.body;
    console.log('req.body: ',req.body)
    newApartment(user_id, address, city_id, price, rooms, baths ,sqft, sale_status, available, property_type, main_image, status)
    .then(apartment => res.status(200).json({apartment}))
    .catch(error => res.status(500).json({error: error.message})) 
})




// router.get ('/', function(req, res, next) {
//     connection.query(`SELECT * from apartments`, function (error, results, fields) {
//   if (error) throw error;
//   res.json(results);
//   console.log(req.query)
// })})



module.exports = router;
