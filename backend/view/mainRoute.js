import express from "express";
import Projects from "./Projects.js"
import Users from "./Users.js";
import Tiketes from "./Tickets.js";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const route=express.Router()
route.use(Users)
route.use(Projects)
route.use(Tiketes)
const indexPath = path.join(__dirname, '../dist', 'index2.html');

route.use((req, res) => {
    console.log(req.url);res.sendFile(indexPath);
});
export default  route;