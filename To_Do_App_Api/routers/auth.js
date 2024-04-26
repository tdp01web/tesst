import express from "express";
import AuthController from "../controller/AuthController.js";
const routerAuth = express.Router();

const authController = new AuthController();

routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);
routerAuth.put("/updatePassword/:id", authController.updatePassword);
routerAuth.put("/updateUser/:id", authController.updateUser);
export default routerAuth;
