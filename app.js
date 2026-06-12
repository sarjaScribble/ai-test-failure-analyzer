import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import healthRoutes from "./src/routes/healthCheck.routes.js";
import reportRoutes from "./src/routes/report.routes.js";
import analysisRoutes from "./src/routes/analysis.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/analysis", analysisRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/report", reportRoutes);

export default app;