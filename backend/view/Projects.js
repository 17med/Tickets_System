import express from "express";
import ProjectController from "../controller/ProjectController.js";
import ProjectMiddleware from "../middleware/ProjectMiddleware.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router=express.Router();

router.post("/api/project/add",AuthMiddleware.isadmin,ProjectMiddleware.insert,ProjectController.Insert)
router.get("/api/project/:id",AuthMiddleware.islogin,ProjectMiddleware.getOne,ProjectController.Get)
router.get("/api/project/",AuthMiddleware.islogin,ProjectMiddleware.getMany,ProjectController.GetAll)
router.post("/api/project/update",AuthMiddleware.isadmin,ProjectMiddleware.update,ProjectController.Update)


export  default  router;