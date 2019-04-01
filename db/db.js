const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_users_rank', {logging: false})

module.exports = db