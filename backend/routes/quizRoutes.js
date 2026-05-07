import express from "express";
import { handleQuizGeneration } from "../controllers/quizController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/generate", upload.single("file"), handleQuizGeneration);

export default router;
