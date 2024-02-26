import mongoose from "mongoose";
export  default class ProjectMiddleware{

    static insert(req,res,next){
     const verif=(req)=>{

            return req.body.name!==undefined&& req.body.name.length>2 && req.body.description!==undefined;
        }
     if(!verif(req)){
         res.status(500).send({"msg":"bad request"})
        return ;
     }
     next()

    }
    static getOne(req,res,next){
        const verif=(req)=>{
            return req.params.id!==undefined
        }
        if(!verif(req)){
            res.status(500).send({"msg":"bad request"})
            return;
        }
        next();
    }
    static getMany(req,res,next){
        next()
    }
    static update(req,res,next){
        if(req.body.id===undefined){
            res.status(500).send({"msg":"bad request"})
            return;
        }
        try{

            if(!mongoose.isValidObjectId(req.body.id)){
               throw new Error("bad request")
            }
        }
        catch (e) {
            console.log(e.toString())
            res.status(500).send({"msg":"bad request"})
            return ;
        }


        next()
    }
}