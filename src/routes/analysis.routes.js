import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  generateAnalysis,
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(
  "/:failureId",
  authMiddleware,
  generateAnalysis
);

export default router;