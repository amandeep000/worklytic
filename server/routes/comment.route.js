import express from "express";
import {
  addComment,
  getTaskcomments,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.post("/", addComment);
commentRouter.get("/:taskId", getTaskcomments);

export default commentRouter;
