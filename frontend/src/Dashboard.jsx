import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  BrainCircuit,
  ArrowUpRight,
  Clock3,
  Play,
  RotateCcw,
  CheckCircle2,
  CircleAlert,
  CalendarDays,
  Loader2,
  History,
  ChevronRight,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get("/api/v1/interview/get");

      const interviewData = data.interviews || data.data || [];

      setInterviews(Array.isArray(interviewData) ? interviewData : []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your interview.");
    } finally {
      setLoading(false);
    }
  };

  const recentInterviews = useMemo(() => {
    return [...interviews]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 3);
  }, [interviews]);

  const completedCount = interviews.filter(
    (item) => item.sessionStatus === "completed",
  ).length;

  const inProgressCount = interviews.filter(
    (item) => item.sessionStatus === "in_progress",
  ).length;

  const getStatus = (status) => {
    const statuses = {
      not_started: {
        label: "Not started",
        color: "text-gray-400",
        bg: "bg-white/[0.05]",
        icon: Clock3,
      },
      in_progress: {
        label: "In progress",
        color: "text-amber-300",
        bg: "bg-amber-300/10",
        icon: Play,
      },
      completed: {
        label: "Completed",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        icon: CheckCircle2,
      },
      abandoned: {
        label: "Abandoned",
        color: "text-red-400",
        bg: "bg-red-400/10",
        icon: CircleAlert,
      },
    };

    return statuses[status] || statuses.not_started;
  };

  const getAction = (status) => {
    switch (status) {
      case "in_progress":
        return {
          label: "Continue",
          icon: RotateCcw,
        };

      case "completed":
        return {
          label: "View results",
          icon: ArrowUpRight,
        };

      case "abandoned":
        return {
          label: "Try again",
          icon: RotateCcw,
        };

      default:
        return {
          label: "Start interview",
          icon: Play,
        };
    }
  };

  const handleInterview = (interview) => {
    if (interview.sessionStatus === "completed") {
      navigate(`/interview/${interview._id}/result/${interview.sessionId}`);
    } else {
      navigate(`/interview/${interview._id}/start`);
    }
  };

  const displayedInterviews =
    activeTab === "recent" ? recentInterviews : interviews;

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
        {/* Minimal brand identity */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10 ">
              <BrainCircuit size={21} />
            </div>

            <span className="font-semibold tracking-tight">InterviewAI</span>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
          >
            <UserRound size={17} />
          </button>
        </div>

        {/* Heading */}
        <section className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Your interviews
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Practice, improve, and get interview-ready.
          </p>
        </section>

        {/* Create interview */}
        <button
          onClick={() => navigate("/create-interview")}
          className="group mb-10 flex w-full items-center justify-between rounded-2xl border border-amber-500/20 bg-gradient-to-r from-[#211D18] to-[#171B29] p-5 text-left transition hover:border-amber-500/40 sm:p-6"
        >
          <div>
            <div className="flex items-center gap-2 ">
              <Plus size={17} className="" />

              <span className="font-semibold">Start a new interview</span>
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Create a personalized AI mock interview.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#17130B] transition cursor-pointer group-hover:bg-amber-200">
              <Plus size={16} />
              Create interview
            </span>
          </div>

          <div className="hidden h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300 sm:flex">
            <BrainCircuit size={32} />
          </div>
        </button>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <Loader2 className="animate-spin text-amber-300" size={26} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <p className="text-sm text-red-400">{error}</p>

            <button
              onClick={fetchDashboardData}
              className="mt-3 text-sm text-amber-300 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Activity */}
            <section>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Your activity</h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Your interview sessions.
                  </p>
                </div>

                <div className="flex rounded-lg border border-white/10 bg-[#12192B] p-1">
                  <button
                    onClick={() => setActiveTab("recent")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === "recent"
                        ? "bg-white/10 text-white"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    Recent
                  </button>

                  <button
                    onClick={() => setActiveTab("all")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                      activeTab === "all"
                        ? "bg-white/10 text-white"
                        : "text-gray-500 hover:text-white"
                    }`}
                  >
                    History
                  </button>
                </div>
              </div>

              {/* Empty state */}
              {interviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-gray-500">
                    <History size={23} />
                  </div>

                  <h3 className="mt-4 font-medium">No interviews yet</h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Your created interviews will appear here.
                  </p>

                  <button
                    onClick={() => navigate("/create-interview")}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-4 py-2.5 text-sm font-semibold text-black hover:bg-amber-200"
                  >
                    <Plus size={16} />
                    Create your first interview
                  </button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111827]">
                  {displayedInterviews.map((interview, index) => {
                    const status = getStatus(interview.sessionStatus);

                    const action = getAction(interview.sessionStatus);

                    const StatusIcon = status.icon;
                    const ActionIcon = action.icon;

                    return (
                      <button
                        key={interview._id}
                        onClick={() => handleInterview(interview)}
                        className={`group flex w-full items-center justify-between gap-4 p-4 text-left cursor-pointer transition hover:bg-white/[0.03] sm:px-5 ${
                          index !== displayedInterviews.length - 1
                            ? "border-b border-white/[0.06]"
                            : ""
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-gray-400">
                            <BrainCircuit size={19} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-medium text-gray-200 group-hover:text-white">
                              {interview.title || "Untitled interview"}
                            </h3>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <span>{interview.role}</span>

                              <span>·</span>

                              <span>
                                {interview.createdAt
                                  ? new Date(
                                      interview.createdAt,
                                    ).toLocaleDateString()
                                  : "Recently created"}
                              </span>

                              {interview.durationMinutes && (
                                <>
                                  <span>·</span>
                                  <span>{interview.durationMinutes} min</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span
                            className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium sm:inline-flex ${status.bg} ${status.color}`}
                          >
                            <StatusIcon size={12} />
                            {status.label}
                          </span>

                          <span className="hidden text-xs text-gray-400 sm:block">
                            {action.label}
                          </span>

                          <ActionIcon
                            size={16}
                            className="text-gray-500 transition group-hover:text-amber-200"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {activeTab === "recent" && interviews.length > 3 && (
                <button
                  onClick={() => setActiveTab("all")}
                  className="mt-4 flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-amber-200"
                >
                  View all {interviews.length} interviews
                  <ChevronRight size={15} />
                </button>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
