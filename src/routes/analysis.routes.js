const express = require(
  "express"
);

const router =
  express.Router();

const authMiddleware = require(
  "../middlewares/auth.middleware"
);

const {
  generateAnalysis
} = require(
  "../controllers/analysis.controller"
);

router.post(
  "/:failureId",
  authMiddleware,
  generateAnalysis
);

module.exports = router;