    SELECT pedidos.id_pedidos,
           pedidos.quantidade,
           produtos.id_produtos,
           produtos.nome,
           produtos.preco
      FROM pedidos
      INNER JOIN produtos
        ON produtos.id_produtos = pedidos.id_produtos