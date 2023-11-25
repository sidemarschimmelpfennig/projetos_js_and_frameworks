const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool

router.get('/', (req,res, next) => {
   mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error : error})}
        conn.query(
        `SELECT pedidos.id_pedidos,
                pedidos.quantidade,
                produtos.id_produtos,
                produtos.nome,
                produtos.preco
           FROM pedidos
     INNER JOIN produtos
             ON produtos.id_produtos = pedidos.id_produtos `,
        (error, result, field) => {
            conn.release()
            if (error) { return res.status(500).send({error : error})}
            if (result.length === 0){return res.status(404).send({mensagem : 'Nao foi Encontrado nenhum pedido.'})}
            const response = {
                produtos : result.map(pedidos => {
                    return {
                        id_pedido  : pedidos.id_pedidos,
                        quantidade : pedidos.quantidade,
                        produto : {
                            id_produtos : pedidos.id_produtos,
                            nome : pedidos.nome,
                            preco : pedidos.preco
                        },
                        request : {
                            tipo : 'GET',
                            descricao : 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/orders/',
                        } 
                    }
                }) 
            }
            return res.status(200).send(response)
        })
    })
})
router.get('/:id_pedidos', (req,res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error : error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_pedidos = ? ',
            [req.params.id_pedidos],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({error : error})}
                if (result.length === 0) {return res.status(404).send({mensagem : 'Não foi encontrado nenhum pedido com esse ID.'})}
                const response = {
                    quantidade : result.length,
                    produtos : {
                        id_pedidos : req.body.id_pedidos,
                        quantidade : req.body.quantidade,
                        request :   {
                            tipo : 'GET',
                            descricao : 'Retorna detalhes de um pedido especifico.',
                            url: 'http://localhost:3000/products/',
                                    } 
                    }  
                }
                return res.status(200).send(response)
            }
         )
 
    })
})
router.post('/' , (req, res, next) => {
    mysql.getConnection((error, conn)=>{
    if (error){return res.status(500).send({error : error})}
    conn.query('SELECT * FROM produtos WHERE id_produtos = ?;', 
    [req.body.id_produtos],
    (error, result, field)=>{
        if(error) {return res.status(500).send({error : error})}
        if (result.length === 0){ return res.status(404).send({ mensagem : 'Produto nao encontrado'})}
            conn.query(
                'INSERT INTO pedidos(id_produtos,quantidade) VALUES (?,?)',
                [ req.body.id_produtos,req.body.quantidade],
                (error, result, field)=>{
                    conn.release()
                    if (error){return res.status(500).send({error : error})}
                    if (req.body.quantidade === null || req.body.id_produtos  ){
                        return res.status(400).send({mensagem : 'Campo de nome nao pode ser vazio'})
                    }
                   
                    const response = {
                        mensagem : 'Produto inserido com sucesso.',
                        produtoCriado :{
                                id_pedido  : result.id_pedidos, 
                                id_produto : req.body.id_produtos,
                                nome : req.body.quantidade,
                                request : {
                                    tipo : 'POST',
                                    descricao : 'Insere um pedido',
                                    url: 'http://localhost:3000/orders/',
                                } 
                            }
                        }   
                    res.status(201).send(response)
                })

    }
   
    )
    
   },
   
   
   )
}


)
router.patch ('/', (req, res,next) => {
    mysql.getConnection((error, conn)=>{
    if (error){return res.status(500).send({error : error})}
    conn.query(
        `UPDATE pedidos
            SET quantidade     = ?,
                id_produtos    = ?
         WHERE  id_pedidos     = ? 
        `,
        [
            req.body.id_produtos,
            req.body.quantidade,
            req.body.id_pedidos 
        ],
        (error, result, field)=>{
            conn.release()
            if (error){return res.status(500).send({error : error})}
            const response = {
                mensagem : 'Produto alterado com sucesso.',
                produtoAlterado :{
                        id_pedido: req.body.id_pedidos,
                        id_produto: req.body.id_produtos,
                        quantidade : req.body.quantidade,
                        request : {
                            tipo : 'PATCH',
                            descricao : 'Altera dados do pedido pelo ID.',
                            url: 'http://localhost:3000/orders/',
                        }
                }
            }            
            res.status(202).send(response)
        })
   })
})
router.delete ('/', (req, res,next) => {
    mysql.getConnection((error, conn)=>{
        if (error){return res.status(500).send({error : error})}
        conn.query(
            'DELETE  FROM pedidos WHERE id_pedidos = ?', [req.body.id_pedidos ],
            (error, result, field)=>{
                conn.release()
                if (error){return res.status(500).send({error : error})}
                const response = {
                    mensagem : 'Pedido removido com sucesso', 
                    request : {
                        tipo : 'POST',
                        descricao : 'Insere um pedido',
                        url: 'http://localhost:3000/orders/',
                        body : {
                            'quantidade'  : 'number',
                            'id_produtos' : 'number'
                        }
                    } 
                    }
                res.status(202).send({response : response})
            }
        )
    })
})

module.exports = router