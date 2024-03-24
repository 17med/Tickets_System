import express from "express";
import Auth from "../middleware/AuthMiddleware.js";
import TicketController from "../controller/TicketController.js";
import TicketMiddleware from "../middleware/TicketMiddleware.js";
const router=express.Router();
//route.get("/api/ticket/:id",TicketController.Get)
router.post("/api/ticket/add",Auth.isadmin,TicketMiddleware.Insert,TicketController.Insert)
router.get("/api/ticket/getall",Auth.islogin,TicketController.getall)
router.get("/api/ticket/getdatatoselect",Auth.isadmin,TicketController.getdatatoselect)
export default router;