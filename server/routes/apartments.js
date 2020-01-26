var express = require('express');
var router = express.Router();
const multer = require('multer');

const {getAll, byId, getImagesById, newApartment, addImages, updateApartment, deleteImagesId, deleteApartmentById, apartmentsLength}  = require('../db/api/apartments')

const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        console.log("Hello people in storage");
        cb(null, 'public/images/apartment')
    }, 
    filename: function(req, file, cb){
        cb(null, `${new Date().getMinutes()}-${file.originalname}`);
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
router.post('/', upload.array('images') ,async function(req, res, next) {
    try{
        // console.log('req.body: ',req.body)
        // console.log('req.files: ',req.files)
        const main_image = `${new Date().getMinutes()}-${req.files[0].originalname}`;
        const {user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, status} = req.body;
        const apartmentId = await newApartment(user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status)
        await addImages(apartmentId, req.files);
        res.status(201).json({id: apartmentId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

router.put('/:id', upload.array('images'), async function(req, res, next) {
    try{
        console.log("req.body: ", req.body)
        console.log('req.files: ',req.files)
        const main_image = `${new Date().getMinutes()}-${req.files[0].originalname}`;
        const { address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, apartmentId} = req.body;
        await updateApartment(address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, main_image, apartmentId)
        await deleteImagesId(apartmentId)
        await addImages(apartmentId, req.files);
        res.status(201).json({id: apartmentId});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})
router.delete('/:id', async function(req, res, next){
    try{
        console.log("req.params " ,req.params)
        deleteApartmentById(req.params.id)
    } catch(error){
        res.status(500).json({error: error.message});
    }
})
router.get('/length', async function(req, res, next){
    try{
        const apartmentsDataLength =  await apartmentsLength()
        console.log("apartmentsDataLength ", apartmentsDataLength)
        res.status(200).json(apartmentsDataLength);
    } catch(error){
        res.status(500).json({error: error.message});
    }
})
// router.get ('/', function(req, res, next) {
//     connection.query(`SELECT * from apartments`, function (error, results, fields) {
//   if (error) throw error;
//   res.json(results);
//   console.log(req.query)
// })})



module.exports = router;
