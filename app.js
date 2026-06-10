const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const healthRoutes = require("./src/routes/healthCheck.routes");
const reportRoutes = require("./src/routes/report.routes");
const analysisRoutes = require("./src/routes/analysis.routes");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/analysis", analysisRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/report", reportRoutes);

module.exports = app;