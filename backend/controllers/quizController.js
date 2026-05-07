import { generateQuiz } from "../services/llmService.js";

export const handleQuizGeneration = async (req, res) => {
  try {
    const input = {};

    if (req.file) {
      input.file = {
        buffer: req.file.buffer,
        mimetype: req.file.mimetype
      };
    } else if (req.body.text) {
      input.text = req.body.text;
    } else {
      return res.status(400).json({ error: "Please provide either a PDF file or text." });
    }

    const numQuestions = req.body.numQuestions || 5;
    const difficulty = req.body.difficulty || "medium";

    const quiz = await generateQuiz(input, numQuestions, difficulty);
    res.json(quiz);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    res.status(500).json({ error: error.message || "An error occurred during quiz generation." });
  }
};
