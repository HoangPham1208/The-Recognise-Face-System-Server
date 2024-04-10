// const dbConfig = require('../config/dbConfig')
const mysql = require('mysql2')
// const db = mysql.createConnection({
//     host: dbConfig.host,
//     user: dbConfig.user,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     waitForConnections: dbConfig.waitForConnections,
//     connectionLimit: dbConfig.connectionLimit,
//     queueLimit: dbConfig.queueLimit,
// })
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: process.env.waitForConnections,
    connectionLimit: process.env.connectionLimit,
    queueLimit: process.env.queueLimit,
})

// test
db.connect((error)=>{
    if (error) {
        console.log("Failed to connect to MySQL database ",process.env.database," : ",error)
        return
    }
    console.log('Connected to MySQL database', process.env.database)
})

module.exports = db