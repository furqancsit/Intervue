import React from "react";
import { FileText, ClipboardList, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
const InterviewCreateOption = () => {
  const navigate = useNavigate();
  const options = [
    {
      title: "Resume Based Interview",
      description:
        "Upload your resume and let AI generate a personalized interview based on your skills, experience, and career profile.",
      icon: FileText,
      tag: "AI Powered",
      action: "Upload Resume",
      path: "/resume-based",
    },
    {
      title: "Create Manually",
      description:
        "Build your own interview by adding job roles, skills, experience levels, and custom interview questions.",
      icon: ClipboardList,
      tag: "Full Control",
      action: "Create Interview",
      path: "/manual-interview",
    },
  ];

  return (
    <div className="min-h-screen bg-black px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
            <Sparkles size={16} />
            AI Interview Platform
          </div>

          <h1 className="inline-block rounded-xl bg-amber-300 px-5 py-3 text-2xl font-bold tracking-tight text-black shadow-sm sm:text-3xl md:text-4xl">
            Create Your Interview
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose how you want to create your interview. Let AI simplify your
            preparation and help you build a better interview experience.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {options.map((option, index) => {
            const Icon = option.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-black text-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl sm:p-8"
              >
                {/* Icon & Tag */}
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-300 group-hover:text-black">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {option.tag}
                  </span>
                </div>

                {/* Content */}
                <h2 className="mb-3 text-xl font-bold text-white sm:text-2xl">
                  {option.title}
                </h2>

                <p className="mb-8 flex-grow text-sm leading-7 text-slate-500 sm:text-base">
                  {option.description}
                </p>

                {/* Action */}
                <button
                  onClick={() => navigate(option.path)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:bg-amber-400 active:scale-[0.98] cursor-pointer *:focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  {option.action}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 sm:text-sm">
            <Sparkles size={14} className="mr-1 inline text-amber-500" />
            Powered by AI · Smart Interview Creation
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewCreateOption;
