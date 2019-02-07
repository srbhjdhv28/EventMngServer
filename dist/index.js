"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const UserController_1 = require("./controllers/UserController");
const userController = new UserController_1.UserController();
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json());
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', 'Content-Type,saurabh, Content-Length, X-Requested-With, Accept');
            next();
        });
        this.app.listen(process.env.PORT || 5000);
    }
    routes() {
        const router = express_1.default.Router();
        this.app.use('/', router);
        this.app.use('/users', userController.router);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=index.js.map