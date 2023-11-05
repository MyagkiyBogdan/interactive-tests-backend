import { Router } from "express";
const router = Router();
import {
  getAllTests,
  createSingleAnswerTest,
  createMultipleAnswerTest,
  createTrueFalseTest,
  createFillInTheBlanksTest,
  createSequencingTest,
  createMatchingTest,
} from "../controllers/tests.controller.js";

router.get("/all", getAllTests);
router.post("/singleAnswer", createSingleAnswerTest);
router.post("/multipleAnswer", createMultipleAnswerTest);
router.post("/trueFalse", createTrueFalseTest);
router.post("/fillInTheBlanks", createFillInTheBlanksTest);
router.post("/sequencing", createSequencingTest);
router.post("/matching", createMatchingTest);

export default router;
