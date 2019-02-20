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
    AddressId: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    EventId: {
    type: Sequelize.INTEGER,
    allowNull: true
    }
});