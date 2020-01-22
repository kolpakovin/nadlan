const connection = require('../config');

function getCityByCityId(id) {
    return new Promise((resolve, reject) => {

        connection.query(`SELECT C.*, CO.name 'country_name' FROM cities C join countries CO on C.country_id = CO.id where C.id = ?;`, [id] , (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            resolve(results);
        });
    })
}

function getAllCities() {
    return new Promise((resolve, reject) => {

        connection.query(`SELECT * FROM cities`, (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            resolve(results);
        });
    })
}

module.exports = {getCityByCityId, getAllCities}