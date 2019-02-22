import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Address = sequelize.define('Address', {
    AddressLine1: {
      type: Sequelize.STRING,
      allowNull: true
    },
    AddressLine2: {
      type: Sequelize.STRING,
      allowNull: true
    },
    City: {
      type: Sequelize.STRING,
      allowNull: true
    },
    State: {
    type: Sequelize.STRING,
    allowNull: true
    },
    PostalCode: {
    type: Sequelize.STRING,
    allowNull: true
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{freezeTableName: true});