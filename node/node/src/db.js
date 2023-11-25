const mysql = require("mysql")


const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME 
})

connection.connect((error)=>{
    if (error) throw err 
    console.log(`conectado com o banco de Dados : ${process.env.DB_NAME}.db `) 
})

module.exports = connection