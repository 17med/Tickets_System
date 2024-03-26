import dotenv from "dotenv";
import express from "express";
import MainRoute from "./view/mainRoute.js";
import db from "./services/db.js"
import cookieParser  from 'cookie-parser';
import CORS from "cors";
import https  from 'https';
import helmet from "helmet";
import fs from "fs";
//import csrf from "csurf";
dotenv.config();

//var csrfProtection = csrf({ cookie: true });
const app=express();

db.connect();
db.redisconnect();

app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
))
app.locals={
    age:"18",
    auth:["https://github.com/17med","https://github.com/arfaouikarim"]
}
app.use(CORS({
    origin: '192.168.112.1',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser({secert:process.env.secret}))
app.use(express.static('dist'))
app.get("/api/dbsatete",(req,res)=>{
    res.send({"state":db.isconnceted,"data ":process.env})
})
app.use(MainRoute);

// Read SSL certificate and key
/*
const privateKey = fs.readFileSync('./certificate/private.key');
const certificate = fs.readFileSync('./certificate/certificate.crt');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
//openssl req -nodes -new -x509 -keyout server.key -out server.cert -config /path/to/openssl.cnf
httpsServer.listen(process.env.PORT | 3000,"20.111.1.11",  () => {
    console.log(`server start on port :${process.env.PORT}`)
});
*/
const port = process.env.PORT | 8080;
app.listen(process.env.PORT | 8080,"0.0.0.0",()=>{
    console.log(`server start on port :${port}`)
})