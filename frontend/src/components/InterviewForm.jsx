
import React, { useState } from "react";

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    experienceLevel: "fresher",
    topics: "",
    difficulty: "medium",
    questionCount: 10,
    durationMinutes: 30,
    interviewType: "technical",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Interview Data:", formData);
  };

  const inputStyle =
    "w-full rounded-lg border border-slate-800 bg-black/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500";

  const labelStyle =
    "mb-2 block text-sm font-medium text-slate-300";

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-5 py-16 text-white sm:py-20">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            AI Interview Setup
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Create Your
            <span className="text-amber-500"> Interview.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Customize your interview experience. Choose your role,
            difficulty, and topics to generate a personalized AI interview.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-2xl shadow-amber-500/5 sm:p-8"
        >

          {/* Section Header */}
          <div className="mb-7 flex items-center gap-3 border-b border-slate-800 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-lg text-amber-400">
              ✦
            </div>

            <div>
              <h2 className="text-base font-semibold">
                Interview Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Set up your personalized interview session
              </p>
            </div>
          </div>

          <div className="space-y-6">

            {/* Interview Title */}
            <div>
              <label className={labelStyle}>
                Interview Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. React Developer Interview"
                className={inputStyle}
                required
              />
            </div>

            {/* Job Role */}
            <div>
              <label className={labelStyle}>
                Job Role
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={inputStyle}
                required
              />
            </div>

            {/* Experience & Interview Type */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelStyle}>
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>
                  Interview Type
                </label>

                <select
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

            </div>

            {/* Topics */}
            <div>
              <label className={labelStyle}>
                Interview Topics
              </label>

              <textarea
                name="topics"
                value={formData.topics}
                onChange={handleChange}
                placeholder="e.g. React, JavaScript, Node.js, MongoDB..."
                rows={3}
                className={`${inputStyle} resize-none`}
                required
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate topics using commas.
              </p>
            </div>

            {/* Difficulty */}
            <div>
              <label className={labelStyle}>
                Difficulty Level
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["easy", "medium", "hard", "mixed"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: level,
                      }))
                    }
                    className={`rounded-lg border px-3 py-3 text-sm font-medium capitalize transition ${
                      formData.difficulty === level
                        ? "border-amber-500 bg-amber-500/10 text-amber-400"
                        : "border-slate-800 bg-black/40 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions & Duration */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelStyle}>
                  Number of Questions
                </label>

                <input
                  type="number"
                  name="questionCount"
                  min="1"
                  max="30"
                  value={formData.questionCount}
                  onChange={handleChange}
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Choose between 1 and 30 questions.
                </p>
              </div>

              <div>
                <label className={labelStyle}>
                  Duration (Minutes)
                </label>

                <input
                  type="number"
                  name="durationMinutes"
                  min="5"
                  max="180"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  className={inputStyle}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Choose between 5 and 180 minutes.
                </p>
              </div>

            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-9 border-t border-slate-800 pt-6">

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              Generate AI Interview

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              ✦ Your personalized AI interview will be generated based on your preferences.
            </p>

          </div>

        </form>

        {/* Bottom Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">

          {[
            { title: "Personalized", desc: "Role-based questions" },
            { title: "AI Powered", desc: "Smart evaluation" },
            { title: "Flexible", desc: "Your own pace" },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xs font-semibold text-amber-400 sm:text-sm">
                {item.title}
              </h3>
              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default InterviewForm;
