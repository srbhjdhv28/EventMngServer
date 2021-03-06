"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utility/db"));
const Sequelize = require('sequelize');
exports.Participants = db_1.default.define('Participants', {
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
//# sourceMappingURL=Participants.js.map