"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utility/db"));
const Sequelize = require('sequelize');
exports.Events = db_1.default.define('events', {
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
    LocationId: {
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
});
//# sourceMappingURL=Events.js.map