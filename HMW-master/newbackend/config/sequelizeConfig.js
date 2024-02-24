const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig'); // Assuming the name of your PostgreSQL connection configuration file
// console.log(dbConfig)
const sequelize = new Sequelize('hospital','ammar','test1234',{
  host:'localhost',
  dialect: 'postgres', // Specify the dialect explicitly if not already specified in dbConfig
});




module.exports = sequelize;
