"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Events_1 = require("../models/Events");
const Locations_1 = require("../models/Locations");
const Users_1 = require("../models/Users");
const Participants_1 = require("../models/Participants");
const Address_1 = require("../models/Address");
Events_1.Events.hasMany(Locations_1.Locations, { foreignKey: 'EventId', sourceKey: 'id' });
Locations_1.Locations.belongsTo(Events_1.Events, { foreignKey: 'EventId', targetKey: 'id' });
Events_1.Events.hasMany(Participants_1.Participants, { foreignKey: 'EventId', sourceKey: 'id' });
Participants_1.Participants.belongsTo(Events_1.Events, { foreignKey: 'EventId', targetKey: 'id' });
Address_1.Address.hasMany(Locations_1.Locations, { foreignKey: 'AddressId', sourceKey: 'id' });
Locations_1.Locations.belongsTo(Address_1.Address, { foreignKey: 'AddressId', sourceKey: 'id' });
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
        const userId = req.query.uid;
        //    let eventQuery = "SELECT e.*, Users.Id, Users.FirstName as OwnerFirstName, Users.LastName as OwnerLastName, Locations.LocationName, a.*, p.* FROM EVENTS AS e INNER JOIN Users ON (e.UserId = '"+userId+"') INNER JOIN Locations ON (e.LocationId = Locations.Id) INNER JOIN Address AS a ON (a.Id = Locations.AddressId) INNER JOIN Participants AS p ON (p.EventId = e.Id) WHERE e.UserId = Users.Id ";
        Events_1.Events.findAll({ where: { UserId: userId }, include: [{ model: Locations_1.Locations }, { model: Participants_1.Participants }, { model: Users_1.Users }] }).then((records) => {
            res.send(records);
        }).catch((error) => {
            res.status(500).send({ auth: false, message: "Error in fetching data", error: error });
        });
    }
}
exports.EventController = EventController;
//# sourceMappingURL=EventController.js.map