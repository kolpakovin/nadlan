var express = require('express');
var router = express.Router();
const multer = require('multer');

const {getAll, byId, getImagesById, newApartment, addImages, updateApartment, deleteImagesId, deleteApartmentById, apartmentsLength,
     confirmApartment, deleteApartmentByUserId, getApartmentsByUserId }  = require('../db/api/apartments')
const {deleteUser} = require('../db/api/login')

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
    const cookie = await JSON.parse(req.cookies['user']);
    console.log(cookie)
    const apartment = await byId(req.params.id)
    try{
        if(cookie.id == apartment[0].user_id || cookie.role_id === 1){
            await deleteImagesId(req.params.id)
            await deleteApartmentById(req.params.id)
            res.status(200).json(`Apartments of user:${req.params.userId} has been deleted`)
        }
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
router.put('/', async function(req, res, next){
    try{
        confirmApartment(req.body.id)
        res.status(200).json('Okk')
    } catch(error){
        res.status(500).json({error: error.message});
    }
})
router.delete('/user/:userId', async function(req, res, next){
    const cookie = JSON.parse(req.cookies['user'])
    console.log("req..", cookie.id);
    try{
        console.log(cookie.id === req.params.userId || cookie.role_id == 1)
        if(cookie.id === req.params.userId || cookie.role_id === 1){
            console.log("req.params " ,req.params.userId)
        const apartments = await getApartmentsByUserId(req.params.userId)
        console.log("apartments", apartments)
        await apartments.forEach(apartment =>  deleteImagesId(apartment.id))
        await deleteApartmentByUserId(req.params.userId)
        await deleteUser(req.params.userId)
        res.status(200).json(`Apartments of user:${req.params.userId} has been deleted`)
        }  
    } catch(error){
        res.status(500).json({error: error.message});
    }
})
module.exports = router;
