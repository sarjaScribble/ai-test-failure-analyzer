import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  uploadReport,
  getReports,
  getFailures,
} from "../controllers/report.controller.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("report"),
  uploadReport
);

router.get(
  "/",
  authMiddleware,
  getReports
);

router.get(
  "/:reportId/failures",
  authMiddleware,
  getFailures
);

export default router;