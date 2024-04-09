const dbConfig = require('../config/dbConfig')
const mysql = require('mysql2')
const db = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: dbConfig.waitForConnections,
    connectionLimit: dbConfig.connectionLimit,
    queueLimit: dbConfig.queueLimit,
})

// test
db.connect((error)=>{
    if (error) {
        console.log("Failed to connect to MySQL database ",dbConfig.database," : ",error)
        return
    }
    console.log('Connected to MySQL database', dbConfig.database)
})

module.exports = db