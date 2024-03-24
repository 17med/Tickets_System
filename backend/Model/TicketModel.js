import mongoose from "mongoose";
const Schema=mongoose.Schema;

const SchemaTicket=new Schema({
    "userId":String,
    "projectId":String,
    "title":String,
    "description":{type:String,default:""},
    "date_crt":{type:Date,default:Date.now},
    "date_end":Date,
    "type":{type:String,value:["Bug","Functionality","Features","Other"]},
    "state":{type:String,default:"sended"}
})

const TicketModel=mongoose.model("Ticket",SchemaTicket,"Ticket")
export default  TicketModel;