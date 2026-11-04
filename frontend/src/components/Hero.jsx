
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      {/* Background effects */}
      <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24 lg:px-8 lg:py-28">

        {/* Hero Content */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            AI-Powered Interview Preparation
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Your Next Interview.
            <span className="mt-2 block text-amber-500">
              Your Best Performance.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Practice real-world interviews with your personal AI interviewer.
            Get instant feedback, improve your skills, and build the confidence
            to land your dream job.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <Link
              to="/signup"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700 sm:w-auto"
            >
              Start Free Interview
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/features"
              className="w-full rounded-lg border border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-amber-500 hover:text-amber-400 sm:w-auto"
            >
              Explore Features
            </Link>

          </div>

          <p className="mt-5 text-xs text-slate-500">
            No interviewer needed. Practice anytime, at your own pace.
          </p>
        </div>

        {/* AI Interview Preview */}
        <div className="mx-auto mt-16 max-w-4xl">

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 shadow-2xl shadow-amber-500/5 sm:p-5">

            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  ✦
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Prepwise AI Interview
                  </h3>
                  <p className="text-xs text-slate-500">
                    Technical Interview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span className="text-xs text-green-400">
                  Live Session
                </span>
              </div>
            </div>

            {/* Interview Content */}
            <div className="grid gap-4 py-5 md:grid-cols-2">

              {/* AI Interviewer */}
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black p-6 text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-4xl text-amber-400 shadow-lg shadow-amber-500/10">
                  ✦
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  AI Interviewer
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Your personal interview assistant
                </p>

                {/* Audio Wave */}
                <div className="mt-6 flex h-8 items-center gap-1">
                  {[12, 20, 28, 16, 24, 32, 18, 26, 12, 22, 16, 28].map(
                    (height, index) => (
                      <span
                        key={index}
                        style={{ height: `${height}px` }}
                        className="w-1 rounded-full bg-amber-500/80"
                      />
                    )
                  )}
                </div>

                <p className="mt-3 text-xs text-amber-400">
                  Ready to interview
                </p>
              </div>

              {/* Question Card */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5">

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
                      Interview Question
                    </span>
                    <span className="text-xs text-slate-500">
                      03 / 10
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold leading-7 text-white">
                    Can you explain the difference between useEffect and
                    useMemo in React?
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    Take your time and explain with a practical example.
                    Your AI interviewer is ready to evaluate your response.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Interview progress
                    </span>
                    <span className="text-amber-400">30%</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[30%] rounded-full bg-amber-500" />
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                    <span>Technical Round</span>
                    <span>~ 25 minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="flex flex-col justify-between gap-3 border-t border-slate-800 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                AI interview experience preview
              </div>
              <span className="text-xs text-slate-500">
                Practice smarter with Prepwise
              </span>
            </div>

          </div>
        </div>

        {/* Bottom Benefits */}
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">

          {[
            {
              title: "AI-Powered",
              desc: "Smart interview questions"
            },
            {
              title: "Instant Feedback",
              desc: "Know where to improve"
            },
            {
              title: "Practice Anytime",
              desc: "Learn at your own pace"
            }
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="text-sm font-semibold text-amber-400">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Hero;
