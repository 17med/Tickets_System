import dotenv from "dotenv";
import express from "express";
import MainRoute from "./view/mainRoute.js";
import db from "./services/db.js"
import cookieParser  from 'cookie-parser';
import CORS from "cors";

import helmet from "helmet";
//import csrf from "csurf";
dotenv.config();

//var csrfProtection = csrf({ cookie: true });
const app=express();

db.connect();
db.redisconnect();

app.use(helmet())
app.locals={
    age:"18",
    auth:["https://github.com/17med","https://github.com/arfaouikarim"]
}
app.use(CORS({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser({secert:process.env.secret}))
app.use(express.static('dist'))
app.use(MainRoute);

app.listen(process.env.PORT,"20.74.98.94",()=>{
    console.log(`server start on port :${process.env.PORT}`)
} )
