import { generateJSON } from "../services/aiService.js";

export const evaluateInterview = async ({ role, questions, answers }) => {
  const result = await generateJSON({
    instructions: `
      Evaluate the candidate's interview answers for the role: ${role}.

      Score each answer from 0 to 10 based on correctness,
      relevance, clarity, and completeness.

      Match each questionFeedback.questionId to the corresponding
      question's actual MongoDB _id. Do not use the question order.

      Return only a JSON object with this exact structure:
      {
        "overallScore": 75,
        "performance": enum: ["Excellent", "Good", "Average", "Needs Improvement"],
      default: "Average",
        "summary": "A concise overall assessment.",
        "strengths": ["Clear explanations"],
        "improvements": ["Add more specific examples"],
        "questionFeedback": [
          {
            "questionId": "the actual question MongoDB _id",
            "score": 8,
            "feedback": "A specific assessment of the answer.",
            "strengths": ["Correct explanation"],
            "improvements": ["Explain the trade-offs"]
          }
        ]
      }

      overallScore must be between 0 and 100.
      Each question score must be between 0 and 10.
      Include feedback for every question.
      Use empty arrays when there are no strengths or improvements.
    `,
    input: {
      role,
      questions: questions.map((q) => ({
        questionId: String(q._id),
        text: q.text,
        type: q.type,
        topic: q.topic,
        difficulty: q.difficulty,
      })),
      answers: answers.map((a) => ({
        questionId: String(a.questionId),
        answerText: a.answerText,
      })),
    },
  });

  console.log("result api called");

  return {
    ...result,
    evaluatedAt: new Date(),
  };
};
