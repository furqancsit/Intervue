import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Clock,
  Brain,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import interviewApi from "./api/InterviewApi";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "../utils/notifications";

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [started, setStarted] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const [answerMode, setAnswerMode] = useState("voice");
  const [textAnswer, setTextAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [questions, setQuestions] = useState([]);

  // Fetch interview details
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await interviewApi.getById(id);

        if (response.success && response.data) {
          setInterview(response.data);
          setQuestions(
            Array.isArray(response.data.questions)
              ? response.data.questions
              : [],
          );
        } else {
          setError("Interview not found.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load interview details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInterview();
  }, [id]);

  // Initialize camera and microphone
  useEffect(() => {
    let mounted = true;

    const initializeDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Device initialization error:", err);
        setCameraOn(false);
        setMicOn(false);
        toast.error(
          "Camera or microphone access is unavailable. You can still continue without video.",
        );
      }
    };

    initializeDevices();

    return () => {
      mounted = false;

      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  // Timer
  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  // Format timer
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const secs = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0",
    )}`;
  };

  // Toggle camera
  const toggleCamera = () => {
    const track = streamRef.current?.getVideoTracks()[0];

    if (track) {
      track.enabled = !track.enabled;
      setCameraOn(track.enabled);
    }
  };

  // Toggle microphone
  const toggleMic = () => {
    const track = streamRef.current?.getAudioTracks()[0];

    if (track) {
      track.enabled = !track.enabled;
      setMicOn(track.enabled);
    }
  };

  // Start interview
  const handleStart = () => {
    setStarted(true);
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowEndModal(true);
    }
  };

  
  const handleEndInterview = async () => {
  if (!interview?.sessionId || submitting) return;

  try {
    setSubmitting(true);

    const response = await interviewApi.complete(
      interview._id,
      interview.sessionId
    );

    if (response.success) {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      navigate(
        `/interview/${interview._id}/result/${interview.sessionId}`
      );
    }
  } catch (error) {
    console.error("Failed to complete interview:", error);

    console.error("Interview completion failed:", error);
  } finally {
    setSubmitting(false);
  }
};
  const handleSubmitTextAnswer = async () => {
    if (!textAnswer.trim() || submitting) return;

    try {
      setSubmitting(true);

      const currentQuestionData = questions[currentQuestion];

      const response = await interviewApi.submitAnswer(
        interview._id,
        interview.sessionId,
        currentQuestionData.order,
        {
          answerText: textAnswer.trim(),
          answerMode: "text",
        },
      );

      if (response.success) {
        setTextAnswer("");

        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1);
        } else {
          setShowEndModal(true);
        }
      }
    } catch (error) {
      console.error("Text answer submission error:", error);

      toast.error(
        getApiErrorMessage(error, "Unable to submit your answer."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D1B] flex flex-col items-center justify-center text-white">
        <Loader2 size={42} className="animate-spin text-amber-600 mb-4" />
        <h2 className="text-xl font-semibold">Preparing Interview Room...</h2>
        <p className="text-gray-400 mt-2">Setting up your interview session</p>
      </div>
    );
  }

  // Error
  if (error || !interview) {
    return (
      <div className="min-h-screen bg-[#080D1B] flex items-center justify-center text-white px-5">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Interview Not Found</h2>
          <p className="text-gray-400 mt-3">
            {error || "This interview does not exist."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-amber-600 px-6 py-3 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  
return (
  <div className="min-h-screen bg-[#0B1020] text-white">
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span className="text-gray-300">Interview session</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {interview.role || interview.title}
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            AI-powered interview practice
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
            <Clock size={15} className="text-amber-400" />
            {interview.durationMinutes} min
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-gray-300">
            <MessageSquare size={15} />
            {questions.length} questions
          </div>
        </div>
      </header>

      {/* Main workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-7">

        {/* Main column */}
        <section className="lg:col-span-8 space-y-5">

          {/* Session toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                Interview session
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-white/10 bg-[#12192B] p-1">
                <button
                  onClick={() => setAnswerMode("voice")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                    answerMode === "voice"
                      ? "bg-amber-300 text-[#17130B] font-semibold cursor-pointer"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Mic size={16} />
                  Voice
                </button>

                <button
                  onClick={() => setAnswerMode("text")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition ${
                    answerMode === "text"
                      ? "bg-amber-300 text-[#17130B] font-semibold"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <MessageSquare size={16} />
                  Text
                </button>
              </div>

              <button
                disabled={!started}
                onClick={
                  currentQuestion === questions.length - 1
                    ? handleEndInterview
                    : handleNextQuestion
                }
                className="flex items-center gap-2 rounded-lg bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#17130B] hover:bg-amber-200 cursor-pointer  disabled:opacity-40 transition"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish"
                  : "Next"}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Video section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* AI interviewer */}
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#19223A] to-[#111827]">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10">
                  <Brain size={38} className="text-amber-300" />
                </div>

                <h3 className="mt-4 font-medium text-white">
                  AI Interviewer
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Your virtual interview partner
                </p>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/50 px-2.5 py-1.5 text-xs text-gray-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                AI Interviewer
              </div>
            </div>

            {/* User camera */}
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-[#141B2A]">
              {cameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.05]">
                    <VideoOff size={30} className="text-gray-500" />
                  </div>
                  <p className="mt-3 text-sm text-gray-400">
                    Camera is turned off
                  </p>
                </div>
              )}

              <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2.5 py-1.5 text-xs text-white backdrop-blur">
                You
              </div>
            </div>
          </div>

          {/* Media controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#12192B] px-5 py-4">

            <div className="flex items-center gap-3">
              <button
                onClick={toggleMic}
                title={micOn ? "Mute microphone" : "Unmute microphone"}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${
                  micOn
                    ? "border-white/10 bg-white/[0.05] hover:bg-white/10"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                {micOn ? <Mic size={19} /> : <MicOff size={19} />}
              </button>

              <button
                onClick={toggleCamera}
                title={cameraOn ? "Turn off camera" : "Turn on camera"}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition ${
                  cameraOn
                    ? "border-white/10 bg-white/[0.05] hover:bg-white/10"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                {cameraOn ? <Video size={19} /> : <VideoOff size={19} />}
              </button>

              <span className="text-xs text-gray-500">
                Audio & video controls
              </span>
            </div>

            {!started ? (
              <button
                onClick={handleStart}
                className="flex items-center gap-2 rounded-lg bg-amber-300 px-5 py-2.5 text-sm font-semibold text-[#17130B] hover:bg-amber-200 transition cursor-pointer"
              >
                <Mic size={16} />
                Start interview
              </button>
            ) : (
              <button
                onClick={() => setShowEndModal(true)}
                className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20 transition"
              >
                <PhoneOff size={16} />
                End interview
              </button>
            )}
          </div>

          {/* Current question */}
          <div className="rounded-xl border border-white/[0.08] bg-[#12192B] p-5 sm:p-6">

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-200">
                  <MessageSquare size={16} />
                </div>
                <h2 className="font-semibold">Interview question</h2>
              </div>

              <span className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-gray-400">
                {currentQuestion + 1} / {questions.length}
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
                Question {currentQuestion + 1}
              </p>

              <h3 className="mt-3 text-lg sm:text-xl font-medium leading-relaxed text-gray-100">
                {questions[currentQuestion]?.text}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                Take a moment to organize your thoughts and answer naturally.
                Focus on explaining your approach clearly.
              </p>
            </div>
          </div>

          {/* Text answer */}
          {answerMode === "text" && (
            <div className="rounded-xl border border-white/[0.08] bg-[#12192B] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your answer</h3>
                <span className="text-xs text-gray-500">
                  {textAnswer.length} characters
                </span>
              </div>

              <textarea
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Start writing your answer here..."
                rows={7}
                className="mt-4 w-full resize-none rounded-lg border border-white/10 bg-[#0B1020] p-4 text-sm leading-relaxed text-white placeholder-gray-600 outline-none transition focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/10"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">
                  Try to provide clear and structured answers.
                </p>

                <button
                  disabled={!textAnswer.trim() || submitting || !started}
                  onClick={handleSubmitTextAnswer}
                  className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#17130B] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit answer
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-5">

          {/* AI assistant card */}
          <div className="rounded-xl border border-amber-500/15 bg-gradient-to-br from-[#292315] to-[#171A29] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                <Sparkles size={22} />
              </div>

              <div>
                <h3 className="font-semibold">AI Interview Assistant</h3>
                <p className="mt-0.5 text-xs text-amber-200/60">
                  Tips for better answers
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-300">
              Answer every question clearly. Be confident, explain your
              approach, and use real-world examples whenever possible.
            </p>
          </div>

          {/* Interview progress */}
          <div className="rounded-xl border border-white/[0.08] bg-[#12192B] p-5">
            <h3 className="font-semibold">Session progress</h3>

            <div className="mt-5 flex items-end justify-between">
              <span className="text-sm text-gray-400">
                Questions completed
              </span>
              <span className="text-lg font-semibold text-white">
                {currentQuestion} / {questions.length}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{
                  width: `${
                    (currentQuestion / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Keep going. You're making progress!
            </p>
          </div>

          {/* Interview guidance */}
          <div className="rounded-xl border border-white/[0.08] bg-[#12192B] p-5">
            <h3 className="font-semibold">Interview tips</h3>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-xs font-semibold text-green-400">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Be structured
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Organize your thoughts before answering.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-xs font-semibold text-blue-400">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Give examples
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Support your answers with practical experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-xs font-semibold text-purple-400">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Stay confident
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Take your time and communicate clearly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  </div>
);
};

export default InterviewRoom;
