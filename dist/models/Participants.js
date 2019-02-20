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
//# sourceMappingURL=Participants.js.map