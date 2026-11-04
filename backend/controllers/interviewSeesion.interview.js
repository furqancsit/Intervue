//  submitAnswer,
//   completeInterview,

const submitAnswer = async (req, res) => {
  // userid interview id sessio id answer save in db
  try {
    const { interviewId, sessionId, order } = req.params;
    const { answerText, answerMode = "voice" } = req.body;
    if (typeof answerText !== "string" || !answerText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Answer text is required",
      });
    }

    if (!["text", "voice"].includes(answerMode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer mode",
      });
    }

    if (
      !mongoose.isValidObjectId(interviewId) ||
      !mongoose.isValidObjectId(sessionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or session ID",
      });
    }

    // 2. Find the active session owned by the user
    const session = await InterviewSession.findOne({
      _id: sessionId,
      interview: interviewId,
      user: req.userId,
      status: "in_progress",
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    // 3. Find the requested question
    const question = session.questions.find(
      (q) => Number(q.order) === Number(order),
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // 5. Prepare the saved answer
    const answerData = {
      questionId: question._id,
      answerText: answerText.trim(),
      answerMode,

      answeredAt: new Date(),
    };

    if (!session.answers) {
      session.answers = [];
    }

    // 6. Update existing answer or create a new one
    const existingAnswerIndex = session.answers.findIndex(
      (a) => String(a.questionId) === String(question._id),
    );

    if (existingAnswerIndex !== -1) {
      session.answers[existingAnswerIndex].answerText = answerData.answerText;
      session.answers[existingAnswerIndex].answerMode = answerData.answerMode;

      session.answers[existingAnswerIndex].answeredAt = answerData.answeredAt;
    } else {
      session.answers.push(answerData);
    }

    await session.save();

    // 7. Return the result to React
    return res.status(200).json({
      success: true,
      message: "Answer submitted ",
      data: {
        sessionId: session._id,
        questionId: question._id,
        order: question.order,
        answersCount: session.answers.length,

        hasNextQuestion: session.questions.some(
          (q) => Number(q.order) > Number(order),
        ),
      },
    });
  } catch (error) {
    console.error("Submit answer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit answer",
    });
  }
};

const completeInterview = async (req, res) => {
  try {
    const { interviewId, sessionId } = req.params;

    // Validate IDs
    if (
      !mongoose.isValidObjectId(interviewId) ||
      !mongoose.isValidObjectId(sessionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview or session ID",
      });
    }

    // Find the user's session
    const session = await InterviewSession.findOne({
      _id: sessionId,
      interview: interviewId,
      user: req.userId,
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Interview session not found",
      });
    }

    // Return existing evaluation if already completed
    if (session.status === "completed" && session.evaluation) {
      return res.status(200).json({
        success: true,
        message: "Evaluation already exists",
        data: {
          sessionId: session._id,
          status: session.status,
          evaluation: session.evaluation,
        },
      });
    }

    if (session.status !== "in_progress") {
      return res.status(409).json({
        success: false,
        message: "Interview session cannot be completed",
      });
    }

    if (!session.answers?.length) {
      return res.status(400).json({
        success: false,
        message: "No answers found for this interview session",
      });
    }

    // Generate the evaluation
    const evaluation = await evaluateInterview({
      role: session.role || "Candidate",
      questions: session.questions,
      answers: session.answers,
    });

    if (!evaluation) {
      throw new Error("Evaluation generation returned no result");
    }

    // Save evaluation and completion status
    session.evaluation = evaluation;
    session.status = "completed";
    session.completedAt = new Date();

    await session.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed and evaluation saved",
      data: {
        sessionId: session._id,
        status: session.status,
        evaluation: session.evaluation,
      },
    });
  } catch (error) {
    console.error("Complete interview error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to complete interview",
    });
  }
};

export { submitAnswer, completeInterview };
