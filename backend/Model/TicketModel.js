import mongoose from "mongoose";
const Schema=mongoose.Schema;
const SchemaTicket=new Schema({
    "userId":String,
    "projectId":String,
    "date_crt":{type:Date,default:Date.now},
    "date_end":Date,
    "type":String,
    "state":{type:String,default:"sended"}
})

const TicketModel=mongoose.model("Ticket",SchemaTicket,"Ticket")
export default  TicketModel;