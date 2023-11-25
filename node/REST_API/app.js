const express = require('express')
const app = express()
const morgan = require('morgan') 
const bodyParser = require('body-parser')


const routeProducts = require('./routes/produtos') 
const routeOrder = require('./routes/pedido')

app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/products', routeProducts)
app.use('/orders', routeOrder)

app.use((req, res, next)=> {
    res.header('Acess-Control-Allow-Orgin', '*')
    res.header('Acess-Control-Allow-Header', 
                'Content-type, X-Request-Whidt, Content-Type , Accept, Authorization'
                
                )
    if (req.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Header', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next();
})

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app