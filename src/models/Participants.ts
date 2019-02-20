import sequelize from '../utility/db';
const Sequelize = require('sequelize');

export const Participants = sequelize.define('Participants', {
    EventId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hcpId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    rsvp_status: {
        type: Sequelize.STRING,
        allowNull: true
    },
    signInId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    }
});