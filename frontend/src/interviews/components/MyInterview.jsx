import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowUpRight,
  Clock3,
  Play,
  RotateCcw,
  CheckCircle2,
  CircleAlert,
  BriefcaseBusiness,
  CalendarDays,
  Loader2,
  Search,
  Link,
} from "lucide-react";

export default function MyInterview() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(`/api/v1/interview/get`);

     
      // Adjust according to your API response structure
      setInterviews(data.interviews || data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load your interviews.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status) => {
    const statuses = {
      not_started: {
        label: "Not Started",
        color: "text-zinc-400",
        bg: "bg-zinc-500/10",
        icon: Clock3,
      },
      in_progress: {
        label: "In Progress",
        color: "text-amber-200",
        bg: "bg-amber-400/10",
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

  const handleInterview = (interview) => {
    if (interview.sessionStatus === "completed") {
      window.location.href = `/interview/${interview._id}/result/${interview.sessionId}`;
    } else {
      window.location.href = `/interview/${interview._id}/start`;
    }
  };

  const getAction = (status) => {
    switch (status) {
      case "in_progress":
        return {
          label: "Continue Interview",
          icon: RotateCcw,
        };

      case "completed":
        return {
          label: "View Results",
          icon: ArrowUpRight,
        };

      case "abandoned":
        return {
          label: "Try Again",
          icon: RotateCcw,
        };

      default:
        return {
          label: "Start Interview",
          icon: Play,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl px-2 py-2  lg:px-8 ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-200" />
              Interview Workspace
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              My Interviews<span className="text-amber-200">.</span>
            </h1>

            <p className="text-zinc-500 mt-2 text-sm">
              Manage your interviews and pick up where you left off.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
            <BriefcaseBusiness size={16} />
            <span>{interviews.length} Interviews</span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="animate-spin text-amber-200" size={28} />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="border border-red-500/20 bg-red-500/5 rounded-2xl p-6 text-center">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchInterviews}
              className="text-amber-200 text-sm hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && interviews.length === 0 && (
          <div className="border border-dashed border-zinc-800 rounded-2xl py-24 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-900 flex items-center justify-center mb-5">
              <Search className="text-zinc-500" size={23} />
            </div>

            <h3 className="text-lg font-medium">No interviews yet</h3>

            <p className="text-zinc-500 text-sm mt-2">
              Your created interviews will appear here.
            </p>
          </div>
        )}

        {/* Interview Cards */}
        {!loading && !error && interviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {interviews.map((interview) => {
              const status = getStatus(interview.sessionStatus);
              const action = getAction(interview.sessionStatus);
              const StatusIcon = status.icon;
              const ActionIcon = action.icon;

              return (
                <button
                  key={interview._id}
                  onClick={() => handleInterview(interview)}
                  className="group text-left relative bg-[#111113] border  cursor-pointer border-zinc-800 hover:border-amber-400/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#151515] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                      <BriefcaseBusiness size={19} className="text-amber-200" />
                    </div>

                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full ${status.bg} ${status.color}`}
                    >
                      <StatusIcon size={13} />
                      {status.label}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mb-7">
                    <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                      {interview.title || "Untitled Interview"}
                    </h2>

                    <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                      {interview.description ||
                        "Prepare yourself and practice your interview skills."}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={14} />
                      {interview.createdAt
                        ? new Date(interview.createdAt).toLocaleDateString()
                        : "Recently created"}
                    </div>

                    {interview.durationMinutes && (
                      <div className="flex items-center gap-1.5">
                        <Clock3 size={14} />
                        {interview.durationMinutes} min
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="border-t border-zinc-800 pt-5 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-amber-200 transition-colors">
                      {action.label}
                    </span>

                    <div className="w-9 h-9 rounded-xl bg-zinc-900 group-hover:bg-amber-400 flex items-center justify-center transition-all">
                      <ActionIcon
                        size={16}
                        className="text-zinc-400 group-hover:text-black"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
