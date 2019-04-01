const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/index').syncAndSeed
const User = require('./db/index').User
const Sequelize = require('sequelize')

var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
    User.findAll()
    .then(products => res.send(products))
    .catch(next)
  })

app.get('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
  .then(user => res.send(user))
  .catch(next)
})

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
    .then(user => res.send(user))
    .catch(next)
})

app.delete('/api/users/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.status(204))
  .catch(next)
})

app.put('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next)
})

syncAndSeed()
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))

