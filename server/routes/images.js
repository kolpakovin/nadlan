var express = require('express');
var router = express.Router();

router.get ('/', function(req, res, next) {
    (req.query)
        .then(apartments => res.status(200).json({apartments}))
        .catch(error => res.status(500).json({error: error.message}))
    })    