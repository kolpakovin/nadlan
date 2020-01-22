const connection = require('../config');

function addImages(apartment_id, array_of_images) {
    console.log('array_of_images: ' , array_of_images)
    return new Promise((resolve, reject) => {
        
        let data = "";
        array_of_images.map(image => data += (`(${apartment_id},${" ' " + image.filename+ " ' "}),`));
        data = data.slice(0, data.length - 1)
        connection.query(`INSERT INTO images(apartment_id, url) VALUES ${data}`, (err, result, fields) => {
            if (error){
                console.log(error);
                reject(error)
            }
            resolve(result);
        })
    })
}

module.exports = addImages;