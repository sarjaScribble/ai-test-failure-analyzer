import { Router } from "express";

import {
  health,
} from "../controllers/healthCheck.controller.js";

const router = Router();

router.get("/check", health);

export default router;