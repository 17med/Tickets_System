import Auth from "../services/Auth.js";
import mongoose from "mongoose";
import ProjectModel from "../Model/ProjectModel.js";
import UserModel from "../Model/UserModel.js";

export default class TicketMiddleware {

    static async Insert(req,res,next){

            if(String(req.body.projectId)!==req.body.projectId || String(req.body.userId)!==req.body.userId ||  String(req.body.title)!==req.body.title || req.body.type===undefined){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            const c=await ProjectModel.findById(req.body.projectId);
            if(c==null){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            const c1=await  UserModel.findById(req.body.userId);
            if(c1==null){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            if(["Bug","Functionality","Features","Other"].indexOf(req.body.type)===-1){
                res.status(400).send({"msg":"bad request"})
                return;
            }
            next()

    }

}