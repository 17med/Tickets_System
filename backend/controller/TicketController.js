import ProjectModel from "../Model/ProjectModel.js";
import TicketModel from "../Model/TicketModel.js";
import UserModel from "../Model/UserModel.js";
import Auth from "../services/Auth.js";
export default class TicketController {
    static async Insert(req, res) {
        try {

            var j=JSON.parse(JSON.stringify(req.body))
            if(j.date_end===undefined){
                j.date_end=new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
            }
            console.log(j);
            const tickets=new TicketModel(j);
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
    static async getall(req,res,next){
        const searchnameproject=(projectid,projectlist)=>{
            for (let i = 0; i < projectlist.length; i++) {
                if(projectlist[i]._id==projectid){
                    return projectlist[i].name;
                }
            }
            return "undefined";
        }
        const searchusername=(userid,userlist)=>{
            for(let i=0;i<userlist.length;i++){
                if(userlist[i]._id==userid){
                    return userlist[i].name;
                }
            }
            return "undefined";
        }
    if(await Auth.isadmin(req)) {
        const x = await TicketModel.find();
        const project=await ProjectModel.find();
        const users=await UserModel.find();
        const tb=[]
        x.forEach((e)=>{
            var ls=JSON.parse(JSON.stringify(e));
            delete ls["__v"];
            ls.id=ls._id;
            ls.projectname=searchnameproject(ls.projectId,project);
            ls.username=searchusername(ls.userId,users);
            delete ls["_id"];
            tb.push(ls)
        })
        res.send({"data": tb})
    }
    else{
        const x = await TicketModel.find({userId:(await Auth.getData(req.cookies.auth)).id});
        const project=await ProjectModel.find();
        const tb=[]
        x.forEach((e)=>{
            var ls=JSON.parse(JSON.stringify(e));
            delete ls["__v"];
            ls.id=ls._id;
            ls.projectname=searchnameproject(ls.projectId,project);
            delete ls["userId"];
            delete ls["_id"];
            tb.push(ls)
        })
        res.send({"data": tb})
    }

    }
}