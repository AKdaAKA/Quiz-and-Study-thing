import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";

const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe("The multiple choice question"),
      options: z.array(
        z.object({
          text: z.string().describe("The text of the option"),
          isCorrect: z.boolean().describe("Whether this option is the correct answer"),
          reason: z.string().describe("Explanation of why this option is correct or incorrect")
        })
      ).describe("4 possible options, with exactly ONE correct option.")
    })
  ).describe("A list of multiple choice questions based on the provided material.")
});

export const generateQuiz = async (input, numQuestions = 5, difficulty = "medium") => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    temperature: 0.1,
    maxRetries: 2,
    apiKey: process.env.GEMINI_API_KEY,
  });

  const structuredModel = model.withStructuredOutput(quizSchema);

  let content = [];

  // Base instructions
  content.push({
    type: "text",
    text: `You are a professional quiz generator. Create ${numQuestions} multiple choice questions with ${difficulty} difficulty based on the provided material.
For each question, provide 4 options. Exactly one option must be correct.
For each option, provide a brief reason explaining why it is correct or incorrect. This reason will be shown to the user after they select the option.`
  });

  // Multimodal (PDF) or Text input
  if (input.file) {
    console.log(">>> [LOG] Step 1: Processing PDF material...");
    content.push({
      type: "media",
      mimeType: input.file.mimetype,
      data: input.file.buffer.toString("base64"),
    });
  } else if (input.text) {
    console.log(">>> [LOG] Step 1: Processing Text material...");
    content.push({
      type: "text",
      text: `Material:\n${input.text}`,
    });
  }

  try {
    console.log(`>>> [LOG] Step 2: Requesting ${numQuestions} questions from Gemini (Difficulty: ${difficulty})...`);
    console.log(">>> [LOG] Waiting for AI response (this may take 10-20 seconds)...");

    const response = await structuredModel.invoke([
      new HumanMessage({ content })
    ]);

    console.log(">>> [LOG] Step 3: Response received and validated.");
    console.log(`>>> [LOG] SUCCESSFULLY generated ${response.questions?.length || 0} questions.`);
    return response;
  } catch (error) {
    console.error("!!! [LLM Generation Error]:", error.message);
    if (error.message.includes("429")) {
      console.error("!!! [RATE LIMIT]: You have exceeded your RPM/TPM quota. Please wait 60 seconds before trying again.");
    }
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
};

