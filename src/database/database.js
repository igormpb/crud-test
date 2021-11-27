const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: 'crud'
});

db.connect((err) => {
    if(err){
        console.error(`ERROR CONNECTING: ${err.stack}`);
        return;
    }

    console.log('bd is connect!')
});

module.exports = db;