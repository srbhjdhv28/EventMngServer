"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utility/db"));
const Sequelize = require('sequelize');
exports.Users = db_1.default.define('Users', {
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
}, { freezeTableName: true });
//# sourceMappingURL=Users.js.map