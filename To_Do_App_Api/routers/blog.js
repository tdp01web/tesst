import express from "express";
import BlogController from "../controller/BlogController.js";

const routerBlogs = express.Router();
const blogController = new BlogController();

routerBlogs.get("/", blogController.index);
routerBlogs.get("/:id", blogController.show);
routerBlogs.post("/", blogController.store);
routerBlogs.put("/:id", blogController.update);
routerBlogs.delete("/:id", blogController.delete);

export default routerBlogs;
