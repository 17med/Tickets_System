
import projectModel from "../Model/ProjectModel.js";
import mongoose from "mongoose";
import {json} from "express";
import Auth from "../services/Auth.js";
import TicketModel from "../Model/TicketModel.js";
export default class ProjectController {

    static async Insert(req,res){


        var r=req.body;

        r.dataCrt=(new Date()).toISOString()
        try{
            const d=new projectModel(r);
            const reslt=await d.save()
            console.log(reslt);
            res.send({"msg":"done"})
        }
        catch (e) {
            if(e.toString().indexOf("duplicate")){
                res.status(400).send({
                    "msg":"projecct exist"
                })

                return;
            }
            res.status(400).send({
                "msg":"error"
            })
        }
    }
    static async Get(req,res){
        try{
        const stx=req.params.id;


        const rest=await projectModel.findOne({"_id":stx})
        if(rest===null){
            res.status(404).send({"msg":"not found"})
            return;
        }
        var ls=JSON.parse(JSON.stringify(rest));
        delete ls[ "__v"];
        res.send(ls)
        }
        catch (e) {

            res.status(404).send({"msg":"not found"})
        }
    }
    static async GetAll(req,res){

        const reslt=await projectModel.find();
        if(await Auth.isadmin(req)){
        const tb=[]
        reslt.forEach((e)=>{
            const c=JSON.parse(JSON.stringify(e))
            delete c["__v"]
            c["id"]=c._id;
            delete c["_id"]
            tb.push(c)
        })

    
        console.log(req.cookies)
        res.type("json").send({"data":tb});}
        else{
            const res2=await TicketModel.find({"userId":(await Auth.getData(req.cookies.Authorization)).id})
            const listOfIds=[];
            res2.forEach((e)=>{
                listOfIds.push(e.projectId)
            })
            const reslt2=await projectModel.find({ _id: { $in: listOfIds } });

            const tb=[]
            reslt2.forEach((e)=>{

                const c=JSON.parse(JSON.stringify(e))
                delete c["__v"]
                c["id"]=c._id;
                delete c["_id"]
                tb.push(c)
            })
            res.type("json").send({"data":tb});
        }
    }

    static async Update(req,res) {

        const id = req.params.id;

        const r = JSON.parse(JSON.stringify(req.body));
        delete r.id;
        try {
            const rest = await projectModel.findOneAndUpdate({"id": id}, r);
            if(rest==null){
                throw new Error("not found")
            }
            res.send({"msg": "done"})
        } catch (e) {
            console.log(e.toString())
            res.status(404).send({"msg": "not found"})
        }
    }


}