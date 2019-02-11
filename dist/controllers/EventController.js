"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../utility/db"));
const config_1 = __importDefault(require("../config"));
const jwt = __importStar(require("jsonwebtoken"));
class EventController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/getAllEvents', this.getAllEventsByUID);
    }
    getAllEventsByUID(req, res) {
        console.log(req.headers);
        const headerToken = req.headers['access-token'];
        const userId = req.query.uid;
        if (headerToken) {
            jwt.verify(headerToken, config_1.default.secretKey, function (err) {
                if (!err) {
                    let eventQuery = "SELECT * FROM EVENTS WHERE UserId = '" + userId + "'";
                    db_1.default.query(eventQuery, function (r, records, m) {
                        console.log(records);
                        res.send(records);
                    });
                }
                else {
                    res.status(500).send({ auth: false, message: "Session Timeout", err: err });
                }
            });
        }
        else {
            res.status(500).send({ auth: false, message: "No Valid Token" });
        }
    }
}
exports.EventController = EventController;
//# sourceMappingURL=EventController.js.map