const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'sirisha23',
    database: 'smart-brain'
  }
})

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('success')
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  let date = new Date();
  date = date.toLocaleDateString() + " " + date.toLocaleTimeString();
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    }).into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: email,
            name: name,
            joined: `{${date}}`
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  db.select('*').from('users').where({
    id: id
  }).then(user => {
    console.log(user[0])
  }).catch(err => { res.status((400), 'no such user') })


})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  db.from('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries').then(entries => res.json(entries[0]))
    .catch(err => { res.status(400).json('unable to proess the request') })
  x
})

app.listen(3000, () => {
  console.log("app is running at port 3000")
})