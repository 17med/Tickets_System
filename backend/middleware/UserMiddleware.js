import Auth from "../services/Auth.js";
import mongoose from "mongoose";
export default class UserMiddleware {
    static async login(req,res,next){
        if(await Auth.islogin(req)){
            res.clearCookie("auth").status(401).send({"msg":"not authorized"})
            return;
        }else{
            if(req.body.username===undefined || req.body.password==undefined){
                res.status(500).send({"msg":"bad request"})
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
                res.status(500).send({"msg":"bad request"})
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

                res.status(500).send({"msg":"bad request"})
                return;
            }
            const x=await Auth.getData(req.cookies.auth);
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
                res.status(500).send({"msg":"bad request"})
                return;
            }
            const x=await Auth.getData(req.cookies.auth);
            if(req.body.id!=x.id){
                res.status(401).send({"msg":"not authorized"})
                return;
            }
            next()
        }

    }
}