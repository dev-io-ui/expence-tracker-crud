const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expence-Tracker','root','root',{
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;