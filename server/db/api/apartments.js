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

function getAll({rooms = -1, beds = -1, minprice = -1, maxprice = 9999999999999,user_id = -1,city_id = -1, page = 1, size = 12, status = 'approved', sale_status = 'both'}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allApartments(page, size)
                        .rooms(rooms)
                        .beds(beds)
                        .minprice(minprice)
                        .maxprice(maxprice)
                        .user_id(user_id)
                        .city_id(city_id)
                        .status(status)
                        .sale_status(sale_status)
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
        
            connection.query(`Select A.*, group_concat(I.url) "images", C.name 'real_city_name'  from apartments A left join images I on A.id = I.apartment_id join cities C on A.city_id = C.id where A.id = ?  `, [apartmentId], (error, results, fields) => {
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
function getApartmentsByUserId(userId){
    return new Promise((resolve, reject) => {
        
            connection.query(`Select * from apartments where user_id = ? `, [userId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}
function newApartment(user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status) {
    main_image = "images/apartment/" + main_image
    return new Promise((resolve, reject) => {

        connection.query(`INSERT INTO apartments (user_id,address,city_id,price,number_of_room,number_of_bath, sqft, description, sale_status,availability,property_type,main_image,status) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`, [user_id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status],
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
function updateApartment(address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, main_image, apartment_id){
    main_image = "images/apartment/" + main_image
    return new Promise((resolve, reject) => {
        
            connection.query(`UPDATE apartments SET address = ?, city_id = ?, price = ?, number_of_room = ?, number_of_bath = ?, sqft = ?, description = ?, sale_status = ?, property_type = ?, main_image = ? WHERE (id = ?);`,
            [address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, main_image, apartment_id] ,(error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            resolve(results) ;
        });
    })
}
function deleteImagesId(apartmentId){
    console.log("delete")
    return new Promise((resolve, reject) => {
        
            connection.query(`DELETE FROM images WHERE (apartment_id = ?);`, [apartmentId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            console.log("results, ", results)
            resolve(results) ;
        });
    })
}
function deleteApartmentById(apartmentId){
    return new Promise((resolve, reject) => {
        
            connection.query(`DELETE FROM apartments WHERE (id = ?);`, [apartmentId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            console.log("results, ", results)
            resolve(results) ;
        });
    })
}
function apartmentsLength(){
    console.log("results")
    return new Promise((resolve, reject) => {
        
            connection.query(`SELECT * FROM apartments`, (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            console.log("results, ", results.data)
            resolve(results) ;
        });
    })
}
function confirmApartment(apartmentId){
    return new Promise((resolve, reject) => {
        
            connection.query(`UPDATE apartments SET status = 'approved' WHERE (id = '?');`, [apartmentId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            console.log("results, ", results.data)
            resolve(results) ;
        });
    })
}    
function deleteApartmentByUserId(userId){
    console.log('userId', userId)
    return new Promise((resolve, reject) => {
        
            connection.query(`DELETE FROM apartments WHERE (user_id = ?);`, [userId], (error, results, fields) => {
                if(error) {
                    reject(error)
                    return
                };
            console.log("results, ", results)
            resolve(results) ;
        });
    })
}

module.exports = {getAll, byId, getImagesById, newApartment, addImages, updateApartment, deleteImagesId, deleteApartmentById,
     apartmentsLength, confirmApartment, deleteApartmentByUserId, getApartmentsByUserId }