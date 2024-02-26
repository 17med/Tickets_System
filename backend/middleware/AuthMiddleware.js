import Auth from "../services/Auth.js";
export default class AuthMiddleware{
    static async islogin(req,res,next){
        if(await Auth.islogin(req)){

            next()
        }
        else{
            res.clearCookie('auth').status(401).send({"msg":"not authorized"})
        }
    }

    static  async isadmin(req,res,next) {

        console.log(req.cookies)
        if(await Auth.islogin(req)){


        }
        else{
            res.clearCookie('auth').status(401).send({"msg":"not authorized"})
            return;
        }
        const x = await Auth.getData(req.cookies.auth);

        if (x.isadmin === true) {
            next()
        } else {
            res.status(401).send({"msg": "not authorized"})
            return;
        }
    }


}