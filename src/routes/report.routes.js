const express = require("express");
const router = express.Router();

const {
  uploadReport
} = require("../controllers/report.controller");

router.post("/create", uploadReport);

module.exports = router;