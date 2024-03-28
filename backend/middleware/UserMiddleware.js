import Auth from "../services/Auth.js";
import mongoose from "mongoose";
export default class UserMiddleware {
    static async login(req,res,next){
        if(await Auth.islogin(req)){
            res.clearCookie("auth").status(401).send({"msg":"not authorized"})
            return;
        }else{
            if(req.body.username===undefined || req.body.password==undefined){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            next()
        }
    }
    static async signIn(req,res,next){
        if(await Auth.islogin(req)===false){
            res.status(401).send({"msg":"not authorized"})
            return;
        }else{
            if(req.body.username===undefined || req.body.password==undefined || req.body.name===undefined){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            next()
        }
    }
    static async getAll(req,res,next){
        if(await Auth.islogin(req) && await Auth.isadmin(req)){
            next()
        }
        else{
            res.status(401).send({"msg":"not authorized"})
        }
    }
    static async UpdateSomeone(req,res,next){
        if(await Auth.islogin(req)!==false){
            res.status(401).send({"msg":"not authorized"})
            return;
        }
        else{
            if(!(req.body.id!==undefined && mongoose.isValidObjectId(req.body.id)===true) ){

                res.status(400).send({"msg":"bad request"})
                return;
            }
            const x=await Auth.getData(req.cookies.Authorization);
            if(x.isadmin==false){
                res.status(401).send({"msg":"not authorized"})
            }
            next()
        }
    }
    static async UpdateMe(req,res,next){
        if(await Auth.islogin(req)!==false){
            res.status(401).send({"msg":"not authorized"})
            return;
        }
        else{
            if(!(req.body.id!==undefined && mongoose.isValidObjectId(req.body.id)===true) ){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            const x=await Auth.getData(req.cookies.Authorization);
            if(req.body.id!=x.id){
                res.status(401).send({"msg":"not authorized"})
                return;
            }
            next()
        }

    }
    static ishadkey(req,res,next){
        if(req.body.key==process.env.secret){
            next()
        }
        else{
            res.status(400).send({"msg":"bad request"})
        }
    }
    static deleteuser(req,res,next){
        if(req.body.id===null || req.body.id===undefined){
            res.status(400).send({"msg":"bad request"})
            return;
        }
        if(mongoose.isValidObjectId(req.body.id)===false){
            res.status(400).send({"msg":"bad request"})
            return;
        }
        next()
    }
    static Transformstate(req,res,next){

        if(req.body.id===null || req.body.id===undefined){
            res.status(400).send({"msg":"bad request"})
            return;
        }
        next();
    }
}