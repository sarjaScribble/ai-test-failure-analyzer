const express = require("express");
const router = express.Router();

const {
  health
} = require("../controllers/healthCheck.controller");

router.get("/check", health);

module.exports = router;