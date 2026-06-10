const express = require(
  "express"
);

const router =
  express.Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const upload = require(
  "../middlewares/upload.middleware"
);

const {
  uploadReport
} = require(
  "../controllers/report.controller"
);

const {
  getReports
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

module.exports = router;