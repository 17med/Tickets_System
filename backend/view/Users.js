import express from "express";
import UserController from "../controller/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import UserMiddleware from "../middleware/UserMiddleware.js";

const router=express.Router();
router.get("/api/user/islogin",UserController.islogin)
router.get("/api/user/getall",UserMiddleware.getAll,UserController.getall)
router.post("/api/user/login",UserMiddleware.login,UserController.login)
router.post("/api/user/signin",UserMiddleware.signIn,UserController.signIn)
router.get("/api/user/logout",UserController.logout)
router.post("/api/user/updatesomone",UserMiddleware.UpdateSomeone,UserController.UpdateSomeone)
router.post("/api/user/updatesomone",UserMiddleware.UpdateMe,UserController.UpdateMe)
router.post("/api/user/addadmin",UserMiddleware.signIn,UserMiddleware.ishadkey,UserController.addAdmin)

export default router;