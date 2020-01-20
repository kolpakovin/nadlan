var express = require('express');
var router = express.Router();
const {getCityByCityId}  = require('../db/api/cities')


router.get('/', function (req, res, next) {
    (req.query)
        .then(apartments => res.status(200).json({ apartments }))
        .catch(error => res.status(500).json({ error: error.message }))
})

router.get('/:id', function (req, res, next) {
    getCityByCityId(req.params.id)
        .then(city => res.status(200).json({ city }))
        .catch(error => res.status(500).json({ error: error.message }))
})

module.exports = router;
