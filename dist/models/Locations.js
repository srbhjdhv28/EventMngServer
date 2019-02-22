"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utility/db"));
const Sequelize = require('sequelize');
exports.Locations = db_1.default.define('Locations', {
    LocationName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    LocationType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    EventId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    AddressLine1: {
        type: Sequelize.STRING,
        allowNull: true
    },
    AddressLine2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    City: {
        type: Sequelize.STRING,
        allowNull: true
    },
    State: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PostalCode: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, { freezeTableName: true });
//# sourceMappingURL=Locations.js.map