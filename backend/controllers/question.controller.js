const generateQuestions = (req, res) => {
  // interview id , user id , session id , genrated questions by using , save quesions
};





const getQuestionByOrder = async (req, res) => {
  try {
    const { interviewId, order } = req.params;

    const session = await InterviewSession.findOne({
      interview: interviewId,
      user: req.userId,
      status: "in_progress",
    });

    const question = session?.questions.find(
      (q) => q.order === parseInt(order),
    );

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.log(error);
  }
};

export { generateQuestions, getQuestionByOrder };
