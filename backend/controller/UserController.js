import Auth from "../services/Auth.js";
import UserModel from "../Model/UserModel.js";
import userModel from "../Model/UserModel.js";
export default class UserController{
    static async getall(req,res){
        try{
            const id=(await Auth.getData(req.cookies.auth)).id;
            const x=await userModel.find();
            var x2=x.filter((e)=>String(e.id)!=String(id))
            x2=x2.map((e1)=>{
                const e=JSON.parse(JSON.stringify(e1))
                delete e.password;
                e.id=e._id;
                delete e._id;
                delete e.__v;

                return e
            })
            res.send({"data":x2})
        }
catch (e) {
    res.status(500).send({"msg":"error "+e.toString()})
}
    }
    static async islogin(req,res){

        if((await Auth.islogin(req))===false){

        res.clearCookie("auth").send({"msg":await Auth.islogin(req),"msg2":await Auth.isadmin(req)})
        }
        else{
            const x=await Auth.getData(req.cookies.auth);

            res.send({"msg":await Auth.islogin(req),"msg2":await Auth.isadmin(req),"name":x.username})
        }
    }
    static async login(req,res){
        const x=await UserModel.findOne({username:req.body.username,"password":req.body.password})
        if(x==null){
            res.clearCookie("Auth").status(400).send({"msg":"user not found"})
        }
        else{
            res.cookie("auth", await Auth.login(x._id,x.username,x.isadmin), Auth.cookieConfig).send({"msg":true})
        }
    }
    static async signIn(req,res){
        try{
            const x=new UserModel(req.body);
            await x.save()
            res.send({"msg":true})
        }
        catch (e) {
            res.status(500).send({"msg":"bad request"})
        }
    }
    static async logout(req,res){
        await Auth.logout(req.cookies.auth);
        res.clearCookie("auth").send({"msg":"done"})
    }
    static async UpdateSomeone(req,res){
        try{
            var l=JSON.parse(JSON.stringify(req.body))
            delete l["_id"];
            const x=await UserModel.findByIdAndUpdate(req.body.id,l);
            res.send({"msg":"done"})
        }
        catch (e) {
            res.send({"msg":"user doesnt exist"})
        }
    }
    static async UpdateMe(req,res){
        try{
            var l=JSON.parse(JSON.stringify(req.body))
            delete l["_id"];
            const x=await UserModel.findByIdAndUpdate(req.body.id,l);
            res.send({"msg":"done"})
        }
        catch (e) {
            res.send({"msg":"user doesnt exist"})
        }
    }

}