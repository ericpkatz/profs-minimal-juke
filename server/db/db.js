const Sequelize = require('sequelize')

const config = {
  logging: false
};

if(process.env.LOG){
  config.logging = true; 
}
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/juke', config)

module.exports = db
