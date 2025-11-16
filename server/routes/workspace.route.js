import express from "express";
import {
  addMember,
  getUserWorkspaces,
} from "../controllers/workspace.controller.js";

const workspaceRouter = express.Router();

workspaceRouter.route("/").get(getUserWorkspaces);
workspaceRouter.route("/add-member").post(addMember);

export default workspaceRouter;
