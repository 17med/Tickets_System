import ProjectModel from "../Model/ProjectModel.js";
import TicketModel from "../Model/TicketModel.js";
import UserModel from "../Model/UserModel.js";
export default class TicketController {
    static async Insert(req, res) {
        try {

            var j=JSON.parse(JSON.stringify(req.body))
            if(j.data_end===undefined){
                j.data_end=new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
            }
            const tickets=new TicketModel(req.body);
            await tickets.save()
            res.status(200).send({"msg": true })
        } catch (e) {
            res.status(500).send({"msg":"error"})
        }

    }
    static async update(req,res){
        try{

        }
        catch (e) {

        }
    }
    static async updateState(req,res){

}
}