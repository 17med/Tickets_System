import mongoose from "mongoose";
const Schema=mongoose.Schema;
const SchemaProject=new Schema({
    "name":{type:String,unique:true},
    "dataCrt":Date,
    "description":String

})

const ProjectModel=mongoose.model("Project",SchemaProject,"Project")
export default  ProjectModel;