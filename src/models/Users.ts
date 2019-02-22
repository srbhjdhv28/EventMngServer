import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Users = sequelize.define('Users', {
    LastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Password: {
    type: Sequelize.STRING,
    allowNull: true
    },
    DOB: {
    type: Sequelize.DATE,
    allowNull: true
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Logo: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{freezeTableName: true});