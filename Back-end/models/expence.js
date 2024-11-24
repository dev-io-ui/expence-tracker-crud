const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expence = sequelize.define('expence', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,
    price: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,
    product_details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    catagary: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Expence;