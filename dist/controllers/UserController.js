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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer = __importStar(require("nodemailer"));
const Events_1 = require("../models/Events");
const Users_1 = require("../models/Users");
Users_1.Users.hasMany(Events_1.Events, { foreignKey: 'UserId', sourceKey: 'id' });
Events_1.Events.belongsTo(Users_1.Users, { foreignKey: 'UserId', targetKey: 'id' });
// const cn = pool;
let otpNum;
class UserController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/login', this.checkAndSaveUser);
        this.router.post('/verify', this.verifyToken);
        this.router.get('/verifyEmail', this.verifyEmail);
        this.router.post('/registerUser', this.registerNewUser);
    }
    verifyEmail(req, res) {
        console.log('request email is' + req.headers);
        // Code to send Email to specified user
        if (!req.query.email)
            return res.status(500).send({ auth: false, message: 'Invalid Email' });
        let smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: "Gmail",
            auth: {
                type: 'OAuth2',
                user: "mobdev123@gmail.com",
                password: "#Ext@2017",
                clientId: "308386072692-5ovrhbrf3od4i938qo6dchbipo71p1lu.apps.googleusercontent.com",
                clientSecret: "t_Z5AgUDIpIgD4spJIe0jz7u",
                refreshToken: '1/UToVD7wR43nzDbbJnI7MTo_inSomvSoXbeLdQJdL5_0',
                accessToken: 'ya29.GluaBiLi1ulqPVp5_toV3GeZnqW6wupFP33QxCua-K1qXW97NsrfUeEqmmCtvG3Dl9O74V-UFWUHUw1DmKB2LRyq4KwF4QZHYYb6ykGF0o9bvzlH86_kz7WTkPn_'
            }
        });
        otpNum = Math.floor((Math.random() * 99999) + 10000);
        let mailOptions = {
            from: "Event Manager",
            to: req.query.email,
            subject: "Please confirm your Email account",
            html: "Hello,<br> Please verify your OTP.<br>" + otpNum
        };
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                res.send({ auth: false, message: 'Failed to send mail' });
            }
            else {
                console.log(response);
                res.send({ auth: true, message: 'Email Sent' });
            }
        });
    }
    ;
    registerNewUser(req, res) {
        console.log(req.body);
        //Check if email is already registered.
        let requestedEmail = req.body.email;
        //let checkEmailProc = "CALL checkEmail(?,@emailRes); SELECT @emailRes;"
        Users_1.Users.findAll({ where: { Email: requestedEmail } }).then((records) => {
            if (records && records.length > 0) {
                res.status(500).send({ auth: false, message: 'Email already registered' });
            }
            else {
                //Check for OTP first
                if (!req.body.otpNum)
                    return res.status(500).send({ auth: false, message: 'No OTP found' });
                var otp = req.body.otpNum;
                delete req.body.otpNum;
                console.log('saved OTP', otp, 'recieved otp ', otpNum);
                req.body.dob = new Date(req.body.dob);
                //Check if OTP is valid
                if (otpNum == otp) {
                    //Push new User in DB
                    let password = req.body.password;
                    bcrypt.hash(password, 3, function (error, hash) {
                        if (error) {
                            res.send({ auth: false, message: 'failed to create hash pwd' });
                        }
                        else {
                            console.log(hash);
                            req.body.password = hash;
                            Users_1.Users.create(req.body).then((records) => {
                                console.log(records);
                                res.send({ auth: false, message: "User inserted with hash pwd", record: records });
                            }).catch((error) => {
                                console.log(error);
                                res.send({ auth: false, message: "Failed to create user" });
                            });
                        }
                    });
                }
                else {
                    return res.status(500).send({ auth: false, message: 'Invalid OTP sent' });
                }
            }
        });
    }
    verifyToken(req, res) {
        let headerToken = req.headers['access-token'];
        console.log(headerToken);
        if (headerToken) {
            jwt.verify(headerToken, config_1.CONFIG.secretKey, function (error) {
                if (error) {
                    res.send({ auth: false, message: 'Token Invalid' });
                }
                else {
                    res.send({ auth: true, message: "Token Valid" });
                }
            });
        }
    }
    checkAndSaveUser(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        Users_1.Users.findAll({ where: { email: email } }).then((records) => {
            console.log('recordss---' + JSON.stringify(records));
            if (records && records.length > 0) {
                bcrypt.compare(password, records[0].password, function (error, result) {
                    if (result) {
                        const token = jwt.sign({ id: records[0].Id }, config_1.CONFIG.secretKey, { expiresIn: "2 days" }); //120000 = 2minutes
                        const userData = {
                            userId: records[0].id,
                            firstName: records[0].firstName,
                            lastName: records[0].lastName
                        };
                        res.send({ auth: true, message: "Password Matched", token: token, userData });
                    }
                    else {
                        res.send({ auth: false, message: "Password not valid" });
                    }
                });
            }
            else {
                res.status(500).send({ auth: true, message: "Record not Found" });
            }
        }).catch((error) => {
            res.status(500).send({ auth: true, error: error, message: "Failed to fetch data" });
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map