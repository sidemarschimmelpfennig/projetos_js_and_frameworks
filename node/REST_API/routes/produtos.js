const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const formattedDate = new Date().toISOString().replace(/[:.]/g,'-');
    cb(null, formattedDate + '-' + file.originalname.replace(/\s/g, '_'));
  }
})
const fileFilter = (req, file, cb) =>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
    cb(null, true)
  }
  else{
    cb(null, false)
    return('tipo da imagem nao aceitado pelo servidor !! ')
  }
}
const upload = multer({ 
  storage : storage,
  limits : {
    fileSize : 1024*1024*5
  },
  fileFilter: fileFilter
})


router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM produtos;',
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({ mensagem: 'Nenhum produto encontrado.' });
        }
        const response = {
          quantidade: result.length,
          produtos: result.map(prod => {
            return {
              id_produto: prod.id_produtos,
              nome: prod.nome,
              preco: prod.preco,
              imagem_produto : prod.imagem_produto,
              request: {
                tipo: 'GET',
                descricao: 'Retorna todos os produtos',
                url: 'http://localhost:3000/products/' + prod.id_produtos,
              }
            };
          })
        };
        return res.status(200).send(response);
      }
    );
  });
});

router.get('/:id_produtos', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'SELECT * FROM produtos WHERE id_produtos = ?',
      [req.params.id_produtos],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({ mensagem: 'Nenhum produto encontrado com esse ID.' });
        }
        const response = {
          quantidade: result.length,
          produtos: {
            id_produto: result[0].id_produtos,
            nome: result[0].nome,
            preco: result[0].preco,
            imagem_produto: result[0].imagem_produto,
            request: {
              tipo: 'GET',
              descricao: 'Retorna detalhes de um produto específico.',
              url: 'http://localhost:3000/products/',
            }
          }
        };
        return res.status(200).send(response);
      }
    );
  });
});

router.post('/', upload.single('produto_imagem'), (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'INSERT INTO produtos(nome, preco, imagem_produto ) VALUES (?, ?, ?)',
      [
        req.body.nome,
        req.body.preco,
        req.file.path.replace(/\\/g,'/'),
      ],
      (error, result, field) => {
        if (error) {
          conn.release();
          return res.status(500).send({ error: error });
        }
        if (req.body.nome === '') {
          conn.release();
          return res.status(400).send({ mensagem: 'O campo nome não pode ser vazio.' });
        }
        const response = {
          mensagem: 'Produto inserido com sucesso.',
          produtoCriado: {
            id_produto: result.id_produtos,
            nome: req.body.nome,
            preco: req.body.preco,
            imagem_produto : (req.file.path.replace(/\\/g,'/')),
            request: {
              tipo: 'POST',
              descricao: 'Insere um produto',
              url: 'http://localhost:3000/products/',
            }
          }
        };
        conn.release();
        res.status(201).send(response);
      }
    );
  });
});

router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE produtos
      SET nome = ?,
          preco = ?
      WHERE id_produtos = ?`,
      [
        req.body.nome,
        req.body.preco,
        req.body.id_produtos
      ],
      (error, result, field) => {
        if (error) {
          conn.release();
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: 'Produto alterado com sucesso.',
          produtoAlterado: {
            id_produto: req.body.id_produtos,
            nome: req.body.nome,
            preco: req.body.preco,
            request: {
              tipo: 'PATCH',
              descricao: 'Altera dados do produto pelo ID.',
              url: 'http://localhost:3000/products/',
            }
          }
        };
        conn.release();
        res.status(202).send(response);
      }
    );
  });
});

router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      'DELETE FROM produtos WHERE id_produtos = ?',
      [req.body.id_produtos],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          mensagem: 'Produto removido com sucesso',
          request: {
            tipo: 'POST',
            descricao: 'Insere um produto',
            url: 'http://localhost:3000/products/',
            body: {
              'nome': 'string',
              'preco': 'number'
            }
          }
        };
        res.status(202).send({ response: response });
      }
    );
  });
});

module.exports = router;
