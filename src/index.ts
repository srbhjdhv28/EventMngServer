import express from "express";
import bodyParser from "body-parser";
import {UserController} from "./controllers/UserController";

const userController = new UserController();

class Server {
    public app:express.Application;
    constructor (){
        this.app = express();
        this.config();
        this.routes();
    }

    public  config(): void{
        this.app.use(bodyParser.urlencoded({extended:true}));        
        this.app.use(bodyParser.json());
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', 'Content-Type, No-Auth, Content-Length, X-Requested-With, Accept');
            res.header('Access-Control-Request-Headers', 'Content-Type, No-Auth, Content-Length, X-Requested-With, Accept');
            next();
            
        });
        this.app.listen(process.env.PORT || 5000);
    }

    public routes (): void {
        const router: express.Router = express.Router();
        this.app.use('/',router);
        this.app.use('/users',userController.router);
    }
}
export default new Server().app;