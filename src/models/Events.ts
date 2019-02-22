import sequelize from '../utility/db';
const Sequelize = require('sequelize');
      
export const Events = sequelize.define('events', {
        EventType: {
          type: Sequelize.STRING,
          allowNull: true
        }, 
        Status: {
                type: Sequelize.STRING,
                allowNull: true
        },
        EventCode: {
                type: Sequelize.STRING,
                allowNull: true
        },
        StartTime: {
                type: Sequelize.STRING,
                allowNull: true
        },
        EndTime: {
                type: Sequelize.STRING,
                allowNull: true
        },
        UserId: {
                type: Sequelize.INTEGER,
                allowNull: true
        },
        StartDate: {
                type: Sequelize.DATE,
                allowNull: true
        },
        EndDate: {
                type: Sequelize.DATE,
                allowNull: true
        }
      },{freezeTableName: true});