const express = require('express');
const mysql = require('mysql2') ;
const config = require('./config');

const app = express();
const port = process.env.PORT || 9000; 
const connection = mysql.createConnection(config.database);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida');
  }
});

// Rota de exemplo para recuperar dados do banco de dados
app.get('/dados', (req, res) => {
  const sql = 'SELECT * FROM nome_da_tabela'; // Substitua 'nome_da_tabela' pelo nome da sua tabela

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).json({ error: 'Erro ao recuperar dados do banco de dados' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
