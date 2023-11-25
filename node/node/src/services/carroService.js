const db = require(`../db`)
module.exports = {
    searchAllCars : () =>{
        return new Promise((acepted, reject) =>{
            db.query('SELECT * FROM carros',(error, results )=>{
                if(error){reject(error); return} 
                acepted(results)
            }

            )
        })
    },
    searchOne : (codigo) => {
        return new Promise((acepted, rejected) =>{
            db.query(`SELECT * FROM carros WHERE codigo = ?`, [codigo], (error, results) =>{
                if (error){rejected(error); return}
                if (results.length > 0){
                    acepted(results[0])
                }
                else{
                    acepted(false)
                }
            })
        })

    },
    insertCar :(modelo, placa) => {
        return new Promise(( acepted,reject) =>{
        db.query(`INSERT INTO carros (modelo, placa) VALUES (?,?)`,
         [modelo, placa],
         (error , results)=>{
            if (error){reject(error);return}
            acepted(results.insertCodigo)
         })   
        })
    },
    alterCar :(codigo,modelo, placa) => {
        return new Promise(( acepted,reject) =>{
        db.query(`UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?`,
         [ modelo, placa, codigo],
         (error , results)=>{
            if (error){reject(error);return}
            acepted(results)
         })   
        })
    },
    deleteCar : (codigo) =>{
        return new Promise ((acepted, reject)=>{
            db.query("DELETE FROM carros WHERE codigo = ? ",[codigo],(error, results)=>{
                if (error){reject(error);return}
                acepted(results)
            }
            )
        })
    }
}