const connection = require('../config');
const Builder = require('./builder')

// function getAll({id, user_id, city_id,  page=1, size = 10}){
    
//     return new Promise((resolve, reject) => {
//             const params = []
//             const query = `Select * from apartments where (${!id ? '1' : params.push(id), 'id = ?'} ) 
//             and 
//             (${!cityId ? '' : params.push(cityId), 'cityId = ?'} )`
//             connection.query(query, params, (error, results, fields) => {
//                 if(error) {
//                     reject(error)
//                     return
//                 };
//             resolve(results) ;
//         });
//     })
// }

function getAll({rooms = -1, beds = -1, minprice = -1, maxprice = 9999999999999,user_id = -1, page = 1, size = 10}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allApartments(page, size)
                        .rooms(rooms)
                        .beds(beds)
                        .minprice(minprice)
                        .maxprice(maxprice)
                        .user_id(user_id)
                        .build()
        console.log(query, params); 
        connection.query(query, [...params,page,size], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


function byId(apartmentId){
    return new Promise((resolve, reject) => {
        
            connection.query(`Select A.*, group_concat(I.url) "images", C.name 'real_city_name'  from apartments A join images I on A.id = I.apartment_id join cities C where A.id = ?  `, [apartmentId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}

function getImagesById(apartmentId){
    return new Promise((resolve, reject) => {
        
            connection.query(`Select  group_concat(I.url) "images" from apartments A join images I on A.id = I.apartment_id join cities C where A.id = ?  `, [apartmentId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}
function newApartment(user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, available, property_type, main_image, status) {
    main_image = "images/apartment/" + main_image
    return new Promise((resolve, reject) => {

        connection.query(`INSERT INTO apartments (user_id,address,city_id,price,number_of_room,number_of_bath,sqft,sale_status,availability,property_type,main_image,status) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`, [user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, available, property_type, main_image, status],
         (error, results, fields) => {
            if (error) {  
                console.log(error);
                reject(error)
                return
            };
            resolve(results.insertId);
        })
    })
}

function addImages(apartment_id, array_of_images) {
    array_of_images.forEach(image => {
        console.log('!-!', image.filename);   
        imageURL = 'images/apartment/' + image.filename;
        return new Promise((resolve, reject) => {
        
            // let data = "";
            // array_of_images.map(image => data += (`(${apartment_id},${" ' " + image.filename+ " ' "}),`));
            // data = data.slice(0, data.length - 1)
            console.log(`INSERT INTO images(apartment_id, url) VALUES (${apartment_id},'${imageURL}')`)
            connection.query(`INSERT INTO images(apartment_id, url) VALUES (${apartment_id},'${imageURL}')` ,(error, result, fields) => {
                if (error){
                    console.log('my images error');
                    console.log(error);
                    reject(error)
                }
                console.log('res', result)
                resolve(result.data);
            })
        })
    })
}
    
    // console.log('imageURL: ' , imageURL)
    // console.log('apartment_id:', apartment_id)
    


module.exports = {getAll, byId, getImagesById, newApartment, addImages}