import express from "express";
import bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import {CONFIG}  from "./config";
import {UserController} from "./controllers/UserController";
import { EventController } from './controllers/EventController';
import sequelize from './utility/db';
const cors = require("cors");

const userController = new UserController();
const eventController = new EventController();

class Server {
    public app:express.Application;
    constructor (){
        this.app = express();
        sequelize.sync({force:false}).then(()=>{
            this.config();
            this.routes();
        });
    }

    public  config(): void{
        this.app.use(bodyParser.urlencoded({extended:true}));        
        this.app.use(bodyParser.json());
        this.app.use(cors());//Allows all requests
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, access-token");
            //if(req.url.includes('verifyEmail') || req.url.includes('registerUser') || req.url.includes('login')){
                next();
            // }else{
            //     console.log('test----'+req.headers['access-token']);
            //     let headerToken: any =  req.headers['access-token'];
            //     if(headerToken){
            //         jwt.verify(headerToken,CONFIG.secretKey,function(error:any){
            //             if(error){
            //                 res.status(500).send({auth:false,message:"Token Invalid"});
            //             }else{
            //                 next();
            //             }
            //         });
            //     }else{
            //         res.status(500).send({auth:false,message:"Token Not Found"});
            //     }
            // }
        });
        this.app.listen(process.env.PORT || 5002);
    }

    public routes (): void {
        // const router: express.Router = express.Router();
        this.app.use('/getNews', (req, res) => {
            res.send('The sedulous hyena ate the antelope!');
          });
        // this.app.use('/',router);
        // this.app.use('/users',userController.router);
        // this.app.use('/events', eventController.router);
    }

}
export default new Server().app;