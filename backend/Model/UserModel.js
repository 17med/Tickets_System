import mongoose from "mongoose";
const Schema=mongoose.Schema;
const SchemaUser=new Schema({
    "username":{type:String,unique:true},
    "password":String,
    "name":String,
    "isadmin":{type:Boolean,default:false}

})

const UserModel=mongoose.model("User",SchemaUser,"User")
export default  UserModel;