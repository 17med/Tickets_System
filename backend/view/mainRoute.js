import express from "express";
import Projects from "./Projects.js"
import Users from "./Users.js";
const route=express.Router()
route.use(Users)
route.use(Projects)


route.use((req,res)=>{
    res.status(404).send("404")
})
export default  route;