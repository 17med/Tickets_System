import Auth from "../services/Auth.js";
import UserModel from "../Model/UserModel.js";
import userModel from "../Model/UserModel.js";
export default class UserController{
    static async Transformstate(req,res){
        try{
            const x=await UserModel.findById(req.body.id);
            if(x==null){
                res.status(400).send({"msg":"user not found"})
            }
            else{
                if(x.protected===false){
                x.isadmin=!x.isadmin;
                await x.save()
                res.send({"msg":"done"})
            }else{
                res.status(401).send({"msg":"user is protected"})
                }
            }
        }
        catch (e) {

        }
    }
    static async getall(req,res){
        try{
            const id=(await Auth.getData(req.cookies.Authorization)).id;
            const x=await userModel.find();
            var x2=x.filter((e)=>String(e.id)!=String(id) && e.protected===false)
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
            const x=await Auth.getData(req.cookies.Authorization);

            res.send({"msg":await Auth.islogin(req),"msg2":await Auth.isadmin(req),"name":x.username})
        }
    }
    static async login(req,res){
        const x=await UserModel.findOne({username:req.body.username,"password":req.body.password})
        if(x==null){
            res.clearCookie("Authorization").status(400).send({"msg":"user not found"})
        }
        else{
            const rsx=await Auth.login(x._id,x.username,x.isadmin);


            res.cookie("Authorization",rsx, Auth.cookieConfig)
            res.json({"msg":true})
        }
    }
    static async signIn(req,res){
        try{
            const x=new UserModel(req.body);
            await x.save()
            res.send({"msg":true})
        }
        catch (e) {
            res.status(400).send({"msg":"bad request"})
        }
    }
    static async logout(req,res){
        res.clearCookie("Authorization").send({"msg":"done"});
        await Auth.logout(req.cookies.Authorization);

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
    static async addAdmin(req,res){
        try{
            const x=new UserModel(req.body);
            x.isadmin=true;
            await x.save()
            res.send({"msg":true})
        }
        catch (e) {
            res.status(500).send({"msg":"error "})
        }
    }
    static async admin(){
        const x=new UserModel({"username":"admin","password":"admin1234"})
        x.isadmin=true;
        await x.save()
    }

    static async deleteUser(req,res){
        try{
            const x=await UserModel.findById(req.body.id);
            if(x==null){
                res.status(400).send({"msg":"user doesnt exist"})
            }
            else{
                if(x.admin){
                    res.status(400).send({"msg":"cant delete admin"})
                }
                else{
                    await UserModel.findOneAndDelete({"_id":req.body.id})
                    res.send({"msg":"done"})
                }
            }
        }
        catch (e) {
            console.log(e.toString());
            res.status(500).send({"msg":"error "})
        }
    }

}
