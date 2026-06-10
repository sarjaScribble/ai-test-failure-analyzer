const express = require("express");

const router =
  express.Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const upload = require(
  "../middlewares/upload.middleware"
);

const {
  uploadReport,
  getReports,
  getFailures
} = require(
  "../controllers/report.controller"
);

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

module.exports = router;