const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  const query = `SELECT * FROM recipes WHERE name LIKE '%${partOfName}%'`;
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

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const name = req.body.name;
  const surname = req.body.surname;
  const query = 'INSERT INTO users (email, password, username, name, surname) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [email, password, username, name, surname], (err, rows) => {
    if (err) {
      console.error('Errore durante la registrazione:', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
