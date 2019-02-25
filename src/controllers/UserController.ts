import {Request,Response,Router} from "express";
import {CONFIG}  from "../config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import { Events } from '../models/Events';
import { Users } from '../models/Users';

Users.hasMany(Events,{foreignKey: 'UserId', sourceKey: 'id'});
Events.belongsTo(Users,{foreignKey: 'UserId', targetKey: 'id'});

// const cn = pool;
let otpNum : any;
export class UserController{
    public router : Router;
    constructor () {
          this.router = Router();
          this.routes();
          
    }

    public routes(){
        this.router.post('/login',this.checkAndSaveUser);
        this.router.post('/verify',this.verifyToken);
        this.router.get('/verifyEmail',this.verifyEmail);
        this.router.post('/registerUser',this.registerNewUser);
    }

    public verifyEmail(req:Request, res:Response) : any{
        console.log('request email is'+req.headers);
        // Code to send Email to specified user
        if(!req.query.email) return res.status(500).send({auth:false,message:'Invalid Email'});
    
        let smtpTransport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                service:"Gmail",
                auth: {
                    type: 'OAuth2',
                    user:"mobdev123@gmail.com",
                    password:"#Ext@2017",
                    clientId:"308386072692-5ovrhbrf3od4i938qo6dchbipo71p1lu.apps.googleusercontent.com",
                    clientSecret:"t_Z5AgUDIpIgD4spJIe0jz7u",
                    refreshToken:'1/UToVD7wR43nzDbbJnI7MTo_inSomvSoXbeLdQJdL5_0',
                    accessToken:'ya29.GluaBiLi1ulqPVp5_toV3GeZnqW6wupFP33QxCua-K1qXW97NsrfUeEqmmCtvG3Dl9O74V-UFWUHUw1DmKB2LRyq4KwF4QZHYYb6ykGF0o9bvzlH86_kz7WTkPn_'
                } 
        });
        otpNum = Math.floor((Math.random() * 99999) + 10000);
        let mailOptions={
            from:"Event Manager",
            to : req.query.email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please verify your OTP.<br>"+otpNum 
        }
        console.log('otp=--------is---'+otpNum);
        smtpTransport.sendMail(mailOptions,function(err,response){
            
            if(err){
                console.log(err);
                res.send({auth:false,message:'Failed to send mail'});
            }else{
                console.log(response);
                res.send({auth:true,message:'Email Sent'});
            }
        });
    };

    public registerNewUser(req:Request,res:Response) : any {
        console.log(req.body);
        //Check if email is already registered.
        let requestedEmail = req.body.email;
        //let checkEmailProc = "CALL checkEmail(?,@emailRes); SELECT @emailRes;"
        Users.findAll({where:{Email:requestedEmail}}).then((records: any) => {
            if(records && records.length > 0){
                res.status(500).send({auth:false,message:'Email already registered'});
            }else{
                //Check for OTP first
                if(!req.body.otpNum) return res.status(500).send({auth:false,message:'No OTP found'});
                var otp = req.body.otpNum;
                delete req.body.otpNum
                console.log('saved OTP',otp,'recieved otp ',otpNum);
                req.body.dob = new Date(req.body.dob);
                //Check if OTP is valid
                if(otpNum == otp){
                    //Push new User in DB
                    let password = req.body.password;
                    bcrypt.hash(password,3,function(error,hash){
                        if(error){
                            res.send({auth:false,message:'failed to create hash pwd'});
                        }else{
                            console.log(hash);
                            req.body.password = hash;
                            Users.create(req.body).then((records:any) => {    
                                console.log(records);
                                res.send({auth:false,message:"User inserted with hash pwd",record:records});
                            
                            }).catch((error: any) => {
                                console.log(error);
                                res.send({auth:false,message:"Failed to create user"});
                            });
                        }
                    });
                }else{
                    return res.status(500).send({auth:false,message:'Invalid OTP sent'});
                }
            }
        });
    }

    public verifyToken(req: Request, res: Response) : void {
        // let headerToken: any =  req.headers['access-token'];
        // console.log(headerToken);
        // if(headerToken){
        //     jwt.verify(headerToken,CONFIG.secretKey,function(error:any){
        //         if(error){
        //             res.send({auth:false,message:'Token Invalid'})
        //         }else{
        //             res.send({auth:true,message:"Token Valid"});
        //         }
        //     });
        // }
    }

    public checkAndSaveUser(req : Request, res: Response) : void {
        let email = req.body.email;
        let password = req.body.password;
        Users.findAll({where:{email:email}}).then((records: any) => {
            console.log('recordss---'+JSON.stringify(records));
            if(records && records.length > 0){
                bcrypt.compare(password,records[0].Password,function(error,result){
                        if(result){
                            const token = jwt.sign({id:records[0].Id},CONFIG.secretKey,{expiresIn:"2 days"}); //120000 = 2minutes
                            const userData = {
                                userId : records[0].id,
                                firstName : records[0].FirstName,
                                lastName :records[0].LastName
                            };
                            res.send({auth:true,message:"Password Matched",token:token,userData});
                        }else{
                            res.send({auth:false,message:"Password not valid"});
                        }
                });
            }else{
                res.status(500).send({auth:true,message:"Record not Found"});
            }
        }).catch((error: any) => {
            res.status(500).send({auth:true,error: error, message:"Failed to fetch data"});
        });
    } 
}
