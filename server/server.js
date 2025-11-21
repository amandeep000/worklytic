import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import workspaceRouter from "./routes/workspace.route.js";
import { protect } from "./middlewares/auth.middleware.js";
import projectRouter from "./routes/project.route.js";
import taskRouter from "./routes/task.route.js";
import commentRouter from "./routes/comment.route.js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import healthRouter from "./routes/health.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(limiter);
app.use(helmet());

// Routes
app.use("/api/workspaces", workspaceRouter);
app.use("/api/projects", protect, projectRouter);
app.use("/api/tasks", protect, taskRouter);
app.use("/api/comments", protect, commentRouter);
app.use("/api/health", healthRouter);

app.listen(PORT, () => console.log("Server running on PORT: ", PORT));
