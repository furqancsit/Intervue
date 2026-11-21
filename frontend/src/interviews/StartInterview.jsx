import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Video,
  Mic,
  Clock,
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
  Camera,
  Headphones,
  CircleHelp,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import interviewApi from "./api/InterviewApi";
import { getApiErrorMessage } from "../utils/notifications";

const StartInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
  });

  const [checking, setChecking] = useState(false);

  // Fetch actual interview data
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await interviewApi.getById(id);

        if (response.success && response.data) {
          setInterview(response.data);
        } else {
          setError("Interview not found.");
        }
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message || "Unable to load interview details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInterview();
    }
  }, [id]);

  // Camera and microphone check
  const checkDevices = async () => {
    setChecking(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const camera = stream.getVideoTracks().length > 0;
      const microphone = stream.getAudioTracks().length > 0;

      setPermissions({ camera, microphone });

      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error(err);
      toast.error("Please allow camera and microphone access to continue.");
    } finally {
      setChecking(false);
    }
  };

  // Start interview
  const [starting, setStarting] = useState(false);

  
const handleStartInterview = async () => {
  try {
    setStarting(true);

    const response = await interviewApi.startSession(id);

    if (response.success) {
      const { sessionId } = response.data;

      navigate(`/interview/${id}/room/${sessionId}`);
    } else {
      toast.error(
        response.message || "Unable to start your interview."
      );
    }
  } catch (error) {
    console.error(error);

    if (error.response?.status === 403) {
      navigate(`/interview/${id}/result`);
      return;
    }

    toast.error(
      getApiErrorMessage(error, "Unable to start your interview.")
    );
  } finally {
    setStarting(false);
  }
};

  

  

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080D1B] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-black-400 mb-4" size={42} />
        <h2 className="text-xl font-semibold">Loading Interview...</h2>
        <p className="text-gray-400 mt-2">Fetching your interview details</p>
      </div>
    );
  }

  // Error screen
  if (error || !interview) {
    return (
      <div className="min-h-screen bg-[#080D1B] flex items-center justify-center text-white px-5">
        <div className="text-center max-w-md">
          <AlertCircle size={50} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Interview Not Found</h2>
          <p className="text-gray-400 mt-3">
            {error || "This interview does not exist."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-black-600 px-6 py-3 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const role = interview.role;
  const title = interview.title;
  const duration = interview.durationMinutes;
  const questions = interview.questionCount;
  const difficulty = interview.difficulty;
  const experience = interview.experienceLevel;
  const type = interview.interviewType;
  const topics = interview.topics;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}

      <main className="mx-auto max-w-6xl px-5 py-20 sm:py-24 lg:px-8 ">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-black-300 rounded-full px-4 py-2 text-sm mb-5">
            <Sparkles size={16} />
            AI Powered Interview Experience
          </div>

          <h1 className="text-3xl text-amber-300 md:text-5xl font-bold mb-4">
            You're Almost Ready!
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto">
            Review your interview details and prepare your environment before
            getting started.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actual interview details */}
            <div className="bg-blck border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-7 ">
                <div>
                  <p className="text-sm text-black-400 font-medium mb-2 ">
                    YOUR INTERVIEW
                  </p>

                  <h2 className="text-2xl font-bold">{role}</h2>

                  <p className="text-gray-400 mt-2 flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    company
                  </p>
                </div>

                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-black items-center justify-center">
                  <Brain size={32} className="text-black-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Duration",
                    value: `${interview.durationMinutes} Minutes`,
                  },
                  {
                    label: "Questions",
                    value: interview.questionCount,
                  },
                  {
                    label: "Difficulty",
                    value: interview.difficulty,
                  },
                  {
                    label: "Experience",
                    value: interview.experienceLevel,
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-950 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-2">{item.label}</p>
                    <p className="font-semibold capitalize">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-black border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <ShieldCheck className="text-black-400" />
                Before You Begin
              </h3>

              <div className="space-y-5">
                {[
                  [
                    "Find a quiet environment",
                    "Choose a place with minimal background noise.",
                  ],
                  [
                    "Check your camera and microphone",
                    "Make sure both devices are working properly.",
                  ],
                  [
                    "Keep your internet stable",
                    "A stable connection ensures a smooth interview.",
                  ],
                  ["Stay confident", "Answer naturally and take your time."],
                ].map(([title, desc], index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-black-500/10 text-black-400 flex items-center justify-center">
                      {index + 1}
                    </div>

                    <div>
                      <h4 className="font-medium text-amber-200 text-sm">
                        {title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device check */}
            <div className="bg-black border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Device Check</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Check your camera and microphone.
                  </p>
                </div>

                <button
                  onClick={checkDevices}
                  disabled={checking}
                  className="px-5 py-2.5 rounded-lg bg-black-600 hover:bg-black-500 disabled:opacity-50 text-sm"
                >
                  {checking ? "Checking..." : "Check Devices"}
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Camera",
                    icon: Camera,
                    active: permissions.camera,
                  },
                  {
                    label: "Microphone",
                    icon: Mic,
                    active: permissions.microphone,
                  },
                ].map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-900 p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <device.icon className="text-black-400" size={22} />
                      {device.label}
                    </div>

                    {device.active ? (
                      <span className="text-green-400 text-xs flex items-center gap-1">
                        <CheckCircle2 size={16} /> Ready
                      </span>
                    ) : (
                      <span className="text-yellow-400 text-xs flex items-center gap-1">
                        <AlertCircle size={16} /> Not checked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-black-600 to-amber-300 rounded-2xl p-6">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                <Brain size={35} />
              </div>

              <p className="text-black-100 text-sm">Meet your interviewer</p>

              <h3 className="text-2xl font-bold mt-2">Your AI Interviewer</h3>

              <p className="text-black-100 text-sm mt-3 leading-relaxed">
                Your AI interviewer will guide you through the questions and
                evaluate your responses.
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-5">Quick Tips</h3>

              <div className="space-y-4 text-sm text-gray-400">
                <p className="flex gap-3">
                  <Clock size={18} className="text-black-400 shrink-0" />
                  Take your time before answering.
                </p>

                <p className="flex gap-3">
                  <Headphones size={18} className="text-black-400 shrink-0" />
                  Speak clearly and naturally.
                </p>

                <p className="flex gap-3">
                  <ShieldCheck size={18} className="text-black-400 shrink-0" />
                  Complete your interview independently.
                </p>
              </div>
            </div>

            {/* Start button */}
            <div className="bg-black border border-white/10 rounded-2xl p-6">
              <p className="text-sm text-gray-400 mb-4">
                Everything ready? Let's begin!
              </p>

              <button
                onClick={handleStartInterview}
                disabled={starting}
                className="w-full flex items-center justify-center gap-2 bg-amber-300 hover:from-black-500 hover:to-amber-200 disabled:opacity-40 disabled:cursor-not-allowed py-4 rounded-xl font-semibold transition cursor-pointer text-black"
              >
       {starting ? "Starting Interview..." : "Start Interview"}
                <ArrowRight size={19} />
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Your interview session is ready to begin.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartInterview;
