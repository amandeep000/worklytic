import { Router } from "express";
import {
  addMember,
  getUserWorkspaces,
} from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

workspaceRouter.route("/").get(protect, getUserWorkspaces);
workspaceRouter.route("/add-member").post(protect, addMember);

export default workspaceRouter;
