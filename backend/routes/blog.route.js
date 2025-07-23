import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/createBlog", protectRoute, createBlog);
router.get("/getBlogs", getBlogs);
router.get("/getBlog/:id", getBlog);
router.delete("/deleteBlog/:id", protectRoute, deleteBlog);

export default router;
