import CryptoJS from 'crypto-js';
import db from "./db.js";
export default class Auth{
    static cookieConfig={
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    }
    static async islogin(req){

        if(req.cookies.auth==undefined){
            //res.clearCookie('auth').status(401).send({"msg":"not authorized"})
            return false;
        }
        else{
            if(await Auth.verify(req.cookies.auth)===false){
                return false;
            }
            if(await db.redisclient.get(req.cookies.auth)===null){
                return false;
            }
            return true;
        }
    }
    static async isadmin(req){

        if(req.cookies.auth==undefined){
            //res.clearCookie('auth').status(401).send({"msg":"not authorized"})
            return false;
        }
        else{
            if(await Auth.verify(req.cookies.auth)===false){
                return false;
            }
            const x=await Auth.getData(req.cookies.auth)
            return x.isadmin;
        }
    }
    static async login(id,username,isadmin) {
        const j={id:id,username:username,isadmin:isadmin};
        const x=JSON.stringify(j)
        const r=await CryptoJS.AES.encrypt(x,process.env.secret)
        await db.redisclient.set(r.toString(), new Date(new Date().getTime() + +Auth.cookieConfig.maxAge).toISOString());
        return r.toString();
        //{maxAge: 360000}
    }
    static async verify(token){
            const bytes =await  CryptoJS.AES.decrypt(token, process.env.secret);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            return originalText.length!==0
    }
    static async logout(token){
        await db.redisclient.del(token);
    }
    static async getData(token){
        const bytes =await  CryptoJS.AES.decrypt(token, process.env.secret);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText);
    }


}