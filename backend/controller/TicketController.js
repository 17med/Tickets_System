import ProjectModel from "../Model/ProjectModel.js";
import TicketModel from "../Model/TicketModel.js";
import UserModel from "../Model/UserModel.js";
export default class TicketController {
    static async Insert(req, res) {
        try {
            const c=await ProjectModel.findById(req.body.projectId);
            if(c==null){
                res.status(500).send({"msg":"bad request"})
                return;
            }
            const c1=await  UserModel.findById(req.body.userId);
            if(c1==null){
                res.status(500).send({"msg":"bad request"})
                return;
            }
            var j=JSON.parse(JSON.stringify(req.body))
            j.state="";
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