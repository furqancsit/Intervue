import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  LoaderCircle,
  BrainCircuit,
  ShieldCheck,
  RefreshCw,
  Building2,
  Clock3,
  FileText,
  AlertCircle,
  Trophy,
} from "lucide-react";

import { getApiErrorMessage } from "../utils/notifications.js";
import interviewApi from "../interviews/api/InterviewApi.jsx";

const ResumeAnalysisPage = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  // Analyze Resume
  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`/api/v1/resume/${resumeId}/analyze`);

      setAnalysis(res.data.data);
      console.log(res);
    } catch (error) {
      console.error("Resume analysis error:", error);

      setError(
        error.response?.data?.message || "Unable to analyze your resume.",
      );

      getApiErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  // Automatically analyze when page opens
  useEffect(() => {
    handleAnalyze();
  }, []);

  // Generate Interview
  const handleGenerateInterview = async () => {
    try {
      setLoading(true);

      const payload = {
        title: "Resume Based Interview",
        role: analysis.suggestedRole,
        experienceLevel: analysis.experienceLevel,
        topics: analysis.skills,
        difficulty: "Medium",
        questionCount: 10,
        durationMinutes: 30,
        interviewType: "Technical",
        resumeId: analysis._id,
      };

      const res = await interviewApi.create(payload);

      const interviewId = res.data._id;

      navigate(`/interview/${interviewId}/start`);
    } catch (error) {
      getApiErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-3xl bg-amber-400/10 animate-pulse" />

            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit size={45} className="text-amber-300" />
            </div>

            <div className="absolute inset-0 rounded-3xl border-2 border-amber-400/30 border-t-amber-300 animate-spin" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-amber-200">
            Analyzing Your Resume
          </h1>

          <p className="text-slate-400 mt-3 text-sm leading-6">
            Our AI is analyzing your skills, experience, projects and
            professional background.
          </p>

          <div className="mt-8 space-y-4 text-left">
            {[
              "Extracting technical skills",
              "Analyzing work experience",
              "Identifying projects",
              "Finding your ideal job role",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-slate-400"
              >
                <LoaderCircle
                  size={16}
                  className="text-amber-400 animate-spin"
                />

                {item}
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 mt-8">
            Please don't close this page.
          </p>
        </div>
      </div>
    );
  }

  // Error Screen
  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
            <AlertCircle size={32} />
          </div>

          <h1 className="text-2xl font-bold mt-6">Analysis Failed</h1>

          <p className="text-slate-400 text-sm mt-3 leading-6">
            {error || "Something went wrong while analyzing your resume."}
          </p>

          <button
            onClick={handleAnalyze}
            className="mt-7 w-full flex items-center justify-center gap-2 rounded-xl bg-amber-300 hover:bg-amber-400 text-black font-bold py-3 transition"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <button
            onClick={() => navigate(-1)}
            className="mt-3 w-full py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract Analysis Data
  const {
    skills = [],
    workExperience = [],
    projects = [],
    suggestedRole,
    experienceLevel,
  } = analysis;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/10 border border-amber-300/20 px-3 py-1.5 text-xs font-semibold text-amber-300 mb-4">
              <Sparkles size={14} />
              AI RESUME ANALYSIS
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold">
              Your Resume Insights
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Your professional profile, analyzed by AI.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm">
            <CheckCircle2 size={17} />
            Analysis Complete
          </div>
        </div>

        {/* Suggested Role */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-400/15 via-slate-900 to-black p-6 sm:p-8">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3 text-amber-300 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-300/10 flex items-center justify-center">
                <BriefcaseBusiness size={25} />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  AI Suggested Professional Role
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Based on your resume
                </p>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold">{suggestedRole}</h2>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="inline-flex items-center gap-2 bg-amber-300/10 border border-amber-300/20 px-4 py-2 rounded-full text-sm text-amber-200">
                <Trophy size={16} />
                {experienceLevel || "Not identified"}
              </span>

              <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm text-slate-300">
                <Code2 size={16} />
                {skills.length} Skills Detected
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Code2 size={23} />}
            title="Technical Skills"
            value={skills.length}
          />

          <StatCard
            icon={<BriefcaseBusiness size={23} />}
            title="Work Experience"
            value={workExperience.length}
          />

          <StatCard
            icon={<FolderKanban size={23} />}
            title="Projects"
            value={projects.length}
          />
        </div>

        {/* Technical Skills */}
        <section className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8">
          <SectionHeading
            icon={<Code2 size={21} />}
            title="Technical Skills"
            description="Technologies and skills detected from your resume."
          />

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2.5 mt-6">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-300/15 bg-amber-300/5 px-4 py-2.5 text-sm font-medium text-amber-200"
                >
                  <CheckCircle2 size={15} className="text-amber-400" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <EmptyState message="No technical skills were detected." />
          )}
        </section>

        {/* Work Experience */}
        <section className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8">
          <SectionHeading
            icon={<Building2 size={21} />}
            title="Work Experience"
            description="Your professional background and career history."
          />

          {workExperience.length > 0 ? (
            <div className="mt-8 space-y-7">
              {workExperience.map((item, index) => (
                <div
                  key={index}
                  className="relative pl-7 border-l-2 border-amber-400/40 last:border-transparent"
                >
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-slate-900" />

                  <h3 className="text-lg font-bold">
                    {item.position || "Position not specified"}
                  </h3>

                  <p className="text-amber-300 text-sm mt-1 font-medium">
                    {item.company || "Company not specified"}
                  </p>

                  <div className="flex items-center gap-2 text-slate-500 text-xs mt-2">
                    <Clock3 size={14} />
                    {item.duration || "Duration not specified"}
                  </div>

                  <p className="text-slate-400 text-sm leading-7 mt-4">
                    {item.description || "No description available."}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No professional work experience detected. This is okay if you are a fresher!" />
          )}
        </section>

        {/* Projects */}
        <section className="rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-8">
          <SectionHeading
            icon={<FolderKanban size={21} />}
            title="Projects Detected"
            description="Projects and technologies identified from your resume."
          />

          {projects.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-black/40 border border-slate-800 p-5 hover:border-amber-300/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-300/10 text-amber-300 flex items-center justify-center">
                      <FolderKanban size={20} />
                    </div>

                    <h3 className="font-bold">
                      {project.name || "Untitled Project"}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-6 mt-4">
                    {project.description || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No projects were detected in your resume." />
          )}
        </section>

        {/* Interview CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-400/10 to-slate-900 p-7 sm:p-10 text-center">
          <div className="relative">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-300/10 flex items-center justify-center text-amber-300">
              <Trophy size={32} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mt-5">
              Ready to Test Your Skills?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-lg mx-auto leading-7">
              Your resume analysis is complete. Let's create a personalized AI
              interview based on your skills, projects and experience.
            </p>

            <button
              onClick={handleGenerateInterview}
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-amber-300 hover:bg-amber-400 px-7 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-95"
            >
              Generate Personalized Interview
              <ArrowRight size={19} />
            </button>

            <p className="text-xs text-slate-500 mt-5">
              <Sparkles size={13} className="inline mr-1 text-amber-400" />
              Powered by AI
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-5">
          <p className="text-xs text-slate-600">
            AI-powered resume insights · Your next career step starts here.
          </p>
        </div>
      </div>
    </div>
  );
};

// Statistics Card
const StatCard = ({ icon, title, value }) => (
  <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 hover:border-amber-300/20 transition">
    <div className="w-11 h-11 rounded-xl bg-amber-300/10 text-amber-300 flex items-center justify-center">
      {icon}
    </div>

    <p className="text-3xl font-bold mt-5 text-white">{value}</p>

    <p className="text-sm text-slate-400 mt-1">{title}</p>
  </div>
);

// Section Heading
const SectionHeading = ({ icon, title, description }) => (
  <div>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-amber-300/10 text-amber-300 flex items-center justify-center">
        {icon}
      </div>

      <h2 className="text-xl font-bold">{title}</h2>
    </div>

    <p className="text-sm text-slate-500 mt-3">{description}</p>
  </div>
);

// Empty State
const EmptyState = ({ message }) => (
  <div className="mt-6 rounded-xl bg-black/30 border border-dashed border-slate-700 p-6 text-center">
    <FileText size={27} className="mx-auto text-slate-600" />

    <p className="text-sm text-slate-500 mt-3">{message}</p>
  </div>
);

export default ResumeAnalysisPage;
