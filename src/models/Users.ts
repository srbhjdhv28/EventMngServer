import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Users = sequelize.define('Users', {
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
    type: Sequelize.STRING,
    allowNull: true
    },
    dob: {
    type: Sequelize.DATE,
    allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: true
    }
});