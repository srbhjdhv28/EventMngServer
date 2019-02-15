import {Request,Response,Router} from "express";
import pool from '../utility/db';
import config from "../config";
import * as jwt from "jsonwebtoken";

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
        const headerToken: any = req.headers['access-token'];
        const userId: any = req.query.uid;
        if(headerToken){
            jwt.verify(headerToken,config.secretKey, function(err:any){
                if(!err){    
                   let eventQuery = "SELECT e.*, Users.Id, Users.FirstName as OwnerFirstName, Users.LastName as OwnerLastName, Locations.LocationName, a.* FROM EVENTS AS e INNER JOIN Users ON (e.UserId = '"+userId+"') INNER JOIN Locations ON (e.LocationId = Locations.Id) INNER JOIN Address AS a ON (a.Id = Locations.AddressId) WHERE e.UserId = Users.Id ";
                    pool.query(eventQuery,function(r,records,m){
                        console.log(records);
                        res.send(records);
                    })
                }else{
                    res.status(500).send({auth:false, message:"Session Timeout",err:err});
                }
            });
        }else{
            res.status(500).send({auth:false, message:"No Valid Token"});
        }
    }
}