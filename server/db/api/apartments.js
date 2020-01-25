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

function getAll({rooms = -1, beds = -1, minprice = -1, maxprice = 9999999999999,user_id = -1,city_id = -1, page = 1, size = 12}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allApartments(page, size)
                        .rooms(rooms)
                        .beds(beds)
                        .minprice(minprice)
                        .maxprice(maxprice)
                        .user_id(user_id)
                        .city_id(city_id)
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
        
            connection.query(`Select A.*, group_concat(I.url) "images", C.name 'real_city_name'  from apartments A left join images I on A.id = I.apartment_id join cities C where A.id = ?  `, [apartmentId], (error, results, fields) => {
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

            console.log(`INSERT INTO images(apartment_id, url) VALUES (${apartment_id},'${imageURL}')`)
            connection.query(`INSERT INTO images(apartment_id, url) VALUES (${apartment_id},'${imageURL}')` ,(error, result, fields) => {
                if (error){
                    console.log('my images error');
                    console.log(error);
                    reject(error)
                }
                resolve();
            })
        })
    })
}
function updateApartment(apartmentId){
    return new Promise((resolve, reject) => {
        
            connection.query(`UPDATE apartments SET address = 'HaMatmid 6221', city_id = '1102757', price = '3010101', number_of_room = '4', number_of_bath = '5', sqft = '525', sale_status = 'sale', property_type = 'ranch' WHERE (id = '104');`,
            (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}

    
    // console.log('imageURL: ' , imageURL)
    // console.log('apartment_id:', apartment_id)
    


module.exports = {getAll, byId, getImagesById, newApartment, addImages, updateApartment}