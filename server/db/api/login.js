const connection = require('../config');
const crypto = require('crypto')

function login(email, password) {
    password = password.toString('base64')
    console.log(email,'__+__', password)
    return new Promise((resolve, reject) => {

        connection.query(`Select * from users where email = ? and password = ?`, [email, password], (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            console.log('results' ,results)
            resolve(results[0]);
        });
    })
}
function users() {
    return new Promise((resolve, reject) => {

        connection.query(`Select * from users`, (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            resolve(results);
        });
    })
}
function newUser({...details}){
    const {first_name, last_name, email, phone, status} = details;
    let {password} = details;
    // password = crypto.pbkdf2Sync(password, 'realtorrocks', 100000, 64, 'sha512');
    password = password.toString('base64');
    console.log(password)
    return new Promise((resolve, reject) => {
        
        connection.query(`INSERT INTO users (first_name, last_name, email, password, phone, status) VALUES ( ?,?,?,?,?,?);`,
        [first_name, last_name, email, password, phone, status], (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            resolve(results);
        });
    })
}
function deleteUser(id) {
    return new Promise((resolve, reject) => {

        connection.query(`Delete from users WHERE (id = ?)`, [id], (error, results, fields) => {
            if (error) {
                reject(error)
                return
            };
            resolve(results);
        });
    })
}
module.exports = { login, users, newUser, deleteUser }