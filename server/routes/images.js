var express = require('express');
var router = express.Router();
const postImages = require('../db/api/images')
const multer = require('multer');


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

router.post ('/', upload.single("image"), function(req, res, next) {
    let images;
    for (let img in req.files){
        images.push(img)
    }
    console.log(req.query)
    postImages(req.query, images)
        .then(images => res.status(200).json({images}))
        .catch(error => res.status(500).json({error: error.message}))
    })    

 module.exports = router;