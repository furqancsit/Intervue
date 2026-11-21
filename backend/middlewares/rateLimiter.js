
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

// Limit interview starts per authenticated user
export const startInterviewLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 3,

  keyGenerator: (req) => {
    return req.userId
      ? `user:${req.userId}`
      : ipKeyGenerator(req.ip);
  },

  message: {
    success: false,
    message: "Too many interview start requests. Please try again later.",
  },

  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Limit Gemini AI generation per user
export const geminiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,

  keyGenerator: (req) => {
    return req.userId
      ? `user:${req.userId}`
      : ipKeyGenerator(req.ip);
  },

  message: {
    success: false,
    message: "AI usage limit reached. Please try again later.",
  },

  standardHeaders: "draft-8",
  legacyHeaders: false,
});


export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,

  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },

  standardHeaders: "draft-8",
  legacyHeaders: false,
});