import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(clerkMiddleware());

// todo create an healthcheck route for checking server is live
app.get("/", (req, res) => res.send("server is live"));
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, () => console.log("Server running on PORT: ", PORT));
