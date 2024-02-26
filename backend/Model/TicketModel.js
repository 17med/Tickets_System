import mongoose from "mongoose";
const Schema=mongoose.Schema;
const SchemaTicket=new Schema({
    "userId":String,
    "projectId":String,
    "date crt":{type:Date,default:Date.now},
   "date end":Date,
    "type":String,
    "state":String,
})

const TicketModel=mongoose.model("Ticket",SchemaTicket,"Ticket")
export default  TicketModel;