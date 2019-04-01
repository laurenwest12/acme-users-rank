const Sequelize = require('sequelize')
const db = require('./db')
const User = require('./User')

const syncAndSeed = () => {
    return db.sync({force: true})
    .then (() => {
      return Promise.all([
        User.create({name: 'Foo', bio: 'Foo is fun', rank: 1}),
        User.create({name: 'Bar', bio: 'Bar is fun', rank: 3 }),
        User.create({name: 'Bazz', bio: 'Bazz is fun', rank:2}),
        ]
      )
    })
  }
  
module.exports = {
    syncAndSeed,
    User
}