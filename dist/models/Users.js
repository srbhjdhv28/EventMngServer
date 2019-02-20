"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utility/db"));
const Sequelize = require('sequelize');
exports.Users = db_1.default.define('Users', {
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
//# sourceMappingURL=Users.js.map