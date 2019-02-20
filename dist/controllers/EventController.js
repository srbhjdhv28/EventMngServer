"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../config");
const jwt = __importStar(require("jsonwebtoken"));
const Events_1 = require("../models/Events");
const Locations_1 = require("../models/Locations");
const Users_1 = require("../models/Users");
const Participants_1 = require("../models/Participants");
Events_1.Events.hasMany(Locations_1.Locations, { foreignKey: 'EventId', sourceKey: 'id' });
Locations_1.Locations.belongsTo(Events_1.Events, { foreignKey: 'EventId', targetKey: 'id' });
Events_1.Events.hasMany(Participants_1.Participants, { foreignKey: 'EventId', sourceKey: 'id' });
Participants_1.Participants.belongsTo(Events_1.Events, { foreignKey: 'EventId', targetKey: 'id' });
Users_1.Users.hasMany(Events_1.Events, { foreignKey: 'UserId', sourceKey: 'id' });
Events_1.Events.belongsTo(Users_1.Users, { foreignKey: 'UserId', targetKey: 'id' });
class EventController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/getAllEvents', this.getAllEventsByUID);
    }
    // Description:
    getAllEventsByUID(req, res) {
        console.log(req.headers);
        const headerToken = req.headers['access-token'];
        const userId = req.query.uid;
        if (headerToken) {
            jwt.verify(headerToken, config_1.CONFIG.secretKey, function (err) {
                if (!err) {
                    //    let eventQuery = "SELECT e.*, Users.Id, Users.FirstName as OwnerFirstName, Users.LastName as OwnerLastName, Locations.LocationName, a.*, p.* FROM EVENTS AS e INNER JOIN Users ON (e.UserId = '"+userId+"') INNER JOIN Locations ON (e.LocationId = Locations.Id) INNER JOIN Address AS a ON (a.Id = Locations.AddressId) INNER JOIN Participants AS p ON (p.EventId = e.Id) WHERE e.UserId = Users.Id ";
                    Events_1.Events.findAll({ where: { UserId: userId }, include: [Locations_1.Locations, Participants_1.Participants, Users_1.Users] }).then((records) => {
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