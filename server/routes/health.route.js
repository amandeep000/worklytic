import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const healthRouter = Router();

healthRouter.route("/").get(healthCheck);

export default healthRouter;
