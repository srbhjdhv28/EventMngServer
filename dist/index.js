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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("./config");
const UserController_1 = require("./controllers/UserController");
const EventController_1 = require("./controllers/EventController");
const db_1 = __importDefault(require("./utility/db"));
const userController = new UserController_1.UserController();
const eventController = new EventController_1.EventController();
class Server {
    constructor() {
        this.app = express_1.default();
        db_1.default.sync({ force: false }).then(() => {
            this.config();
            this.routes();
        });
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(function (req, res, next) {
            console.log(req.url);
            console.log(req.url.includes('verifyEmail'));
            if (req.url.includes('verifyEmail') || req.url.includes('registerUser') || req.url.includes('login')) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header('Access-Control-Allow-Headers', 'Content-Type,access-token, Content-Length, X-Requested-With, Accept');
                next();
            }
            else {
                console.log('test----' + req.headers['access-token']);
                let headerToken = req.headers['access-token'];
                if (headerToken) {
                    jwt.verify(headerToken, config_1.CONFIG.secretKey, function (error) {
                        if (error) {
                            res.status(500).send({ auth: false, message: "Token Invalid" });
                        }
                        else {
                            res.header("Access-Control-Allow-Origin", "*");
                            res.header('Access-Control-Allow-Headers', 'Content-Type,access-token, Content-Length, X-Requested-With, Accept');
                            next();
                        }
                    });
                }
                else {
                    res.status(500).send({ auth: false, message: "Token Not Found" });
                }
            }
        });
        this.app.listen(process.env.PORT || 5002);
    }
    routes() {
        const router = express_1.default.Router();
        this.app.use('/', router);
        this.app.use('/users', userController.router);
        this.app.use('/events', eventController.router);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=index.js.map