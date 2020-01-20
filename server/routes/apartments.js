var express = require('express');
var router = express.Router();

const {getAll, byId, getImagesById, newApartment}  = require('../db/api/apartments')

router.get ('/', function(req, res, next) {
    console.log('get apartments', req.query);
    console.log('cookies', req.cookies);
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
router.post('/', function(req, res, next) {
    newApartment(req.body)
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
