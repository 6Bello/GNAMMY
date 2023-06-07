const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '8888',
    password: 'root',
    database: 'GNAMMY'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
  } else {
    console.log('Connessione al database stabilita');
  }
});

app.get('/getRecipes', function(req, res){
    const query = 'SELECT * \
                   FROM recipes\
                    ORDER BY id DESC\
                  '
    connection.query(query, function(error, results, fields){
        if(error){
            res.status(500).send(error);
        }else{
            res.send(results);
        }
    })
})

//search recipes
app.get('/getRecipesByName/:partOfName', (req, res) => {
  const partOfName = req.params.partOfName;
  const query = `SELECT * \
                 FROM recipes\
                  WHERE name LIKE "%${partOfName}%"\
                  ORDER BY\
                  CASE\
                    WHEN name LIKE "${partOfName}%" THEN 1\
                    ELSE 2\
                  END;\
                `
  connection.query(query, function(error, results, fields){
      if(error){
          res.status(500).send(error);
      }else{
          res.send(results);
      }
  })
})

// Endpoint per recuperare i dati dell'immagine dal database
app.get('/images/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT image FROM recipes WHERE id = ${id}`;

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Errore durante il recupero dei dati dell\'immagine:', err);
      res.sendStatus(500);
    } else if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      const image = rows[0].image;
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': image.length,
      });
      res.end(image);
    }
  });
});

// Resto del tuo codice server...

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
