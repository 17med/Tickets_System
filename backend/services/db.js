import mongoose from "mongoose";
import { createClient } from 'redis';


export default class db{
    static async redisconnect(){
        db.redisclient = createClient()
        db.redisclient.on('error', err => console.log('Redis Client Error', err));

        await db.redisclient.connect();
    }
    static isconnceted=false
    static redisclient=null;
    static connect(){
        mongoose.connect(process.env.url).then(()=>{
            this.isconnceted=true;
            console.log(this.isconnceted)
        }).catch((e)=>{
            this.isconnceted=false
            console.log(this.isconnceted)
        })
    }
}