import {Request,Response,Router} from "express";
import {CONFIG}  from "../config";
import * as jwt from "jsonwebtoken";
import { Events } from '../models/Events';
import { Locations } from '../models/Locations';
import {  Users } from '../models/Users';
import {  Participants } from '../models/Participants';
import {  Address } from '../models/Address';

Events.hasMany(Locations,{foreignKey: 'EventId', sourceKey: 'id'});
Locations.belongsTo(Events,{foreignKey: 'EventId', targetKey: 'id'});

Events.hasMany(Participants,{foreignKey: 'EventId', sourceKey: 'id'});
Participants.belongsTo(Events,{foreignKey: 'EventId', targetKey: 'id'});

Address.hasMany(Locations,{foreignKey: 'AddressId', sourceKey: 'id'});
Locations.belongsTo(Address,{foreignKey: 'AddressId', sourceKey: 'id'});

Users.hasMany(Events,{foreignKey: 'UserId', sourceKey: 'id'});
Events.belongsTo(Users,{foreignKey: 'UserId', targetKey: 'id'});

export class EventController {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(){
        this.router.get('/getAllEvents',this.getAllEventsByUID);
    }
    // Description:
    public getAllEventsByUID(req: Request, res: Response){
        console.log(req.headers);
        const userId: any = req.query.uid; 
        //    let eventQuery = "SELECT e.*, Users.Id, Users.FirstName as OwnerFirstName, Users.LastName as OwnerLastName, Locations.LocationName, a.*, p.* FROM EVENTS AS e INNER JOIN Users ON (e.UserId = '"+userId+"') INNER JOIN Locations ON (e.LocationId = Locations.Id) INNER JOIN Address AS a ON (a.Id = Locations.AddressId) INNER JOIN Participants AS p ON (p.EventId = e.Id) WHERE e.UserId = Users.Id ";
        
        Events.findAll({where:{UserId:userId}, include: [{model:Locations},{model:Participants},{model:Users}]}).then((records: any) => {
            res.send(records);
        }).catch((error: any) => {
            res.status(500).send({auth:false, message:"Error in fetching data",error:error});
        });
    }
}