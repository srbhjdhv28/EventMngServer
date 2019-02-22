import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Locations = sequelize.define('Locations', {
    LocationName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    LocationType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    EventId: {
    type: Sequelize.INTEGER,
    allowNull: true
    },
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
    Country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PostalCode: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{freezeTableName: true});