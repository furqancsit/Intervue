import { generateJSON } from "./aiService.js";
export async function analyzeResume(resumeText) {
  if (typeof resumeText !== "string" || !resumeText.trim()) {
    throw new Error("Resume text is required");
  }

  const instructions = `
You are an expert technical recruiter
and professional resume analyzer.

Analyze the provided resume and extract
structured information.

RULES:

1. Extract skills explicitly mentioned in the resume.
2. Identify the candidate's work experience.
3. Extract projects and their descriptions.
4. Identify technologies used in each project.
5. Suggest the most suitable professional role.
6. Estimate experience level:
   - Intern
   - Fresher
   - Junior
   - Mid-Level
   - Senior
   - Lead

7. Never invent experience, skills or projects.
8. Do not assume a technology just because
   it is commonly used with another technology.
9. If information is missing, return an empty
   string or empty array.
10. Return only a valid JSON object.
`;

  const input = {
    resumeText: resumeText.trim(),

    requiredOutputFormat: {
      skills: ["JavaScript", "React"],

      experience: [
        {
          company: "Company name",
          position: "Job title",
          duration: "6 months",
          description: "Work description",
        },
      ],

      projects: [
        {
          name: "Project name",
          description: "Project description",
          technologies: ["React", "Node.js"],
        },
      ],

      suggestedRole: "Full Stack Developer",

      experienceLevel: "Junior",
    },
  };

  const result = await generateJSON({
    instructions,
    input,
  });

  // Basic response validation
  if (
  !Array.isArray(result.skills) ||
  !Array.isArray(result.experience) ||
  !Array.isArray(result.projects) ||
  typeof result.suggestedRole !== "string" ||
  typeof result.experienceLevel !== "string"
) {
  throw new Error("Invalid resume analysis response");
}
  const allowedLevels = [
    "Intern",
    "Fresher",
    "Junior",
    "Mid-Level",
    "Senior",
    "Lead",
  ];

  if (!allowedLevels.includes(result.experienceLevel)) {
    throw new Error("Invalid experience level returned by AI");
  }

 return {
  skills: result.skills.filter(
    (item) => typeof item === "string"
  ),

  experience: result.experience.map((item) => ({
    company: item.company || "",
    position: item.position || "",
    duration: item.duration || "",
    description: item.description || "",
  })),

  projects: result.projects.map((project) => ({
    name: project.name || "",
    description: project.description || "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.filter(
          (item) => typeof item === "string"
        )
      : [],
  })),

  suggestedRole: result.suggestedRole,

  experienceLevel: result.experienceLevel,
 }
}