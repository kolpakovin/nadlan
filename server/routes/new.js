const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hesoyam321",
    database: "realtor",
    port:"3306"
});

app.get('/apartments',(req,res) =>{
    con.connect((err) => {
        if (err) throw err;
        const query = "SELECT * FROM apartments A JOIN cities C ON A.city_id = C.id JOIN countries CO ON C.country_id = CO.id;";
        con.query(query,  (err, result, fields) => {
            if (err) throw err;
            res.send(result);
        });
    });

});