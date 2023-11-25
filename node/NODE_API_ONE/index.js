const express = require("express")
const {cors} = require("cors")
const app = express()
const mongoose = require("mongoose")
const Person = require("./Model/Person")


// forma de ler JSON => middlers
app.use(
    express.urlencoded({
        extended : true,
    })
)
app.use(
    express.json()
)

const personRoutes = require('./routes/personRoutes')

app.get("/ping",(req,res)=>{
    res.json({

        mensage : "Api Conectada com sucesso !!"
    }
    )
} )

// rota inicial endPoint

const DB_USER = 'sidemarschi'
const DB_PASSWORD =encodeURIComponent('@F1f2f3f4f5f6')

// entregar portas
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mvh6spz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`)
.then(()=>{
    console.log("conectado com sucesso")
    app.listen(3100)
}).catch((err)=> console.log(err))




