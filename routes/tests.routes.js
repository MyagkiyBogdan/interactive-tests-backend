import { Router } from "express";
const router = Router();
import { getAllTests } from "../controllers/tests.controller.js";

router.get("/tests", getAllTests);

export default router;
