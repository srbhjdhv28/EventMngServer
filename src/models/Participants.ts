import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Participants = sequelize.define('Participants', {
    EventId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    Role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    HCPId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    RSVP_Status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    SignInId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: true
    }
});