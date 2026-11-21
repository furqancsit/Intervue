import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import interviewApi from "./api/InterviewApi";
const InterviewResult = () => {
  const { id, sessionId } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    const fetchResult = async () => {
      try {
        const response = await interviewApi.getResult(id, sessionId, {
          signal: controller.signal,
        });

        setResult(response.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError("Failed to load interview results");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResult();

    return () => controller.abort();
  }, [id, sessionId]);
  if (loading) return <p>Loading results...</p>;

  if (error) return <p>{error}</p>;

  if (!result?.evaluation) {
    return <p>Evaluation not found.</p>;
  }

  const evaluation = result.evaluation;

  return (
    <div className="min-h-screen bg-black text-white p-8 mx-auto max-w-6xl px-5 py-20 sm:py-24 lg:px-8 lg:py-32">
      <h1 className="text-3xl font-bold">Interview Results</h1>

      <h2 className="text-5xl font-bold text-amber-300 mt-6">
        {evaluation.overallScore}/100
      </h2>

      <h3 className="text-xl mt-3">{evaluation.performance}</h3>

      <p className="text-gray-400 mt-4">{evaluation.summary}</p>

      <h2 className="text-2xl mt-8 mb-4">Improvements</h2>

      {evaluation.improvements?.map((item, index) => (
        <p key={index} className="mb-2">
          • {item}
        </p>
      ))}

      <h2 className="text-2xl mt-8 mb-4">Question Feedback</h2>

      {evaluation.questionFeedback?.map((item, index) => (
        <div key={item.questionId} className="bg-gray-950 p-5 rounded-xl mb-4">
          <h3 className="font-semibold">Question {index + 1}</h3>

          <p className="text-amber-300 mt-2">Score: {item.score}/10</p>

          <p className="text-gray-400 mt-2">{item.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default InterviewResult;
