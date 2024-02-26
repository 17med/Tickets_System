
import projectModel from "../Model/ProjectModel.js";
import mongoose from "mongoose";
import {json} from "express";
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
                res.status(500).send({
                    "msg":"projecct exist"
                })

                return;
            }
            res.status(500).send({
                "msg":e.msg
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
        const tb=[]
        reslt.forEach((e)=>{
            const c=JSON.parse(JSON.stringify(e))
            delete c["__v"]
            c["id"]=c._id;
            delete c["_id"]
            tb.push(c)
        })
    
        console.log(req.cookies)
        res.cookie('name', 'express').send(tb);
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