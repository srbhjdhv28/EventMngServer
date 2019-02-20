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
    AddressId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    EventId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});
//# sourceMappingURL=Locations.js.map