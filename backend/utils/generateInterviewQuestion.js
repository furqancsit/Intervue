import { generateJSON } from "../services/aiService.js";

export async function generateInterviewQuestions(interview,resumeAnalysis = null) {
  const {
    role,
    difficulty,
    topics,
    questionCount,
    type = ["technical", "behavioral", "situational"],
  } = interview;

  if (
    typeof role !== "string" ||
    !role.trim() ||
    typeof difficulty !== "string"
  ) {
    throw new Error("Interview role and difficulty are required");
  }

  if (
    !Number.isInteger(questionCount) ||
    questionCount < 1 ||
    questionCount > 30
  ) {
    throw new Error("questionCount must be between 1 and 30");
  }

  const allowedTypes = ["technical", "behavioral", "situational"];

  const types = Array.isArray(type) ? type : [type];

  if (
    types.length === 0 ||
    types.some((item) => !allowedTypes.includes(item))
  ) {
    throw new Error("Invalid interview question type");
  }

  const allowedDifficulties = ["easy", "medium", "hard", "mixed"];

  if (!allowedDifficulties.includes(difficulty)) {
    throw new Error("Invalid interview difficulty");
  }

  const safeTopics = Array.isArray(topics)
    ? topics.filter(
        (topic) => typeof topic === "string" && topic.trim().length > 0,
      )
    : [];

  const instructions = `
You are an expert interview question generator.

Generate exactly the requested number of unique interview questions.

Rules:
1. Questions must be relevant to the role and topics.
2. Match the requested difficulty.
3. If difficulty is mixed, include easy, medium, and hard questions
   where possible.
4. Use only the requested question types.
5. Avoid duplicate and repetitive questions.
6. Progress logically from basic to advanced concepts.
7. Each question should assess one primary topic.
8. Do not include answers or explanations.
9. Assign sequential order starting at 1.
10. Return a JSON object with a "questions" array.
11. Each question must contain:
    text, type, topic, difficulty, order.
12. Use only easy, medium, or hard for each question's difficulty.
13. If resume information is provided, generate
    questions based on the candidate's actual skills,
    projects, and work experience.

14. Ask questions about technologies mentioned
    in the resume.

15. Include project-specific questions to verify
    the candidate's practical experience.

16. Do not assume skills or experience that are
    not present in the resume.
`;

const input = {
  role: role.trim(),
  difficulty,
  topics: safeTopics.length ? safeTopics : [role],
  questionTypes: types,
  questionCount,

  resumeContext: resumeAnalysis
    ? {
        skills: resumeAnalysis.skills,
        experience: resumeAnalysis.experience,
        projects: resumeAnalysis.projects
      }
    : null,

  requiredOutputFormat: {
    questions: [
      {
        text: "Interview question",
        type: "technical",
        topic: "JavaScript",
        difficulty: "medium",
        order: 1
      }
    ]
  }
};

  const parsed = await generateJSON({
    instructions,
    input,
  });

  const questions = parsed.questions;

  if (!Array.isArray(questions) || questions.length !== questionCount) {
    throw new Error("AI returned an incorrect number of questions");
  }

  return questions.map((question, index) => {
    if (
      typeof question.text !== "string" ||
      !question.text.trim() ||
      !types.includes(question.type) ||
      typeof question.topic !== "string" ||
      !["easy", "medium", "hard"].includes(question.difficulty)
    ) {
      throw new Error(
        `AI returned an invalid question at position ${index + 1}`,
      );
    }

    return {
      text: question.text.trim(),
      type: question.type,
      topic: question.topic.trim(),
      difficulty: question.difficulty,
      order: index + 1,
    };
  });
}
