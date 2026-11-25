import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="
  relative flex items-center
  overflow-hidden bg-[#09090b]
  px-5 py-16 text-white
  sm:min-h-[560px] sm:px-6 sm:py-20
  lg:min-h-[600px] lg:px-8 lg:py-24
"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-300/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-orange-500/[0.05] blur-[100px]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-3 py-1.5 text-[11px] font-medium text-amber-300 sm:mb-5 sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
              AI-Powered Interview Preparation
            </div>

            {/* Heading */}
            <h1
             className="
    font-sans
    text-[38px]
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    font-semibold
    leading-[1.05]
    tracking-[-0.045em]
  "
>
              Practice interviews
              <span className="block text-amber-300">with AI.</span>
            </h1>

            {/* Description */}
            <p
              className="
  mx-auto mt-4
  max-w-xl
  text-[14px]
  leading-6
  text-zinc-400

  sm:mt-5
  sm:text-base
  sm:leading-8
"
            >
              Answer real questions and get instant feedback.
            </p>

            {/* Buttons */}
            <div
              className="
  mt-6 flex flex-col
  items-stretch justify-center
  gap-3

  sm:flex-row
  sm:items-center
"
            >
              <Link
                to="/create-interview"
                className="
    inline-flex min-h-12 items-center
    justify-center gap-2 rounded-xl
    bg-amber-300 px-6 py-3
    text-sm font-semibold text-black
    transition-all duration-200
    hover:-translate-y-0.5
    hover:bg-amber-200
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-amber-300
    focus-visible:ring-offset-2
    focus-visible:ring-offset-[#09090b]
  "
              >
                Start Practicing <span>→</span>
              </Link>
              <Link
                to="/features"
                className="
    inline-flex min-h-12 items-center
    justify-center rounded-xl
    border border-white/10
    bg-white/[0.03] px-6 py-3
    text-sm font-semibold text-zinc-200
    transition-all duration-200
    hover:border-amber-500/40
    hover:bg-white/[0.07]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-amber-300
  "
              >
                Explore Features
              </Link>
            </div>

            <p
              className="
  mt-4
  text-[11px]
  leading-5
  text-zinc-500
  sm:text-xs
"
            >
              No interviewer needed · Practice anytime, anywhere
            </p>
          </div>
        </div>
      </section>

      {/* Interview Preview Section */}
      <section
        className="
  bg-[#0b0c10]
  px-4
  pt-12
  pb-12
  text-white

  sm:px-6
  sm:py-16

  lg:px-8
  lg:py-20
"
      >
        <div className="mx-auto max-w-5xl">
          {/* Section Heading */}
          <div className="mb-5 text-center sm:mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-300 sm:text-xs">
              Experience Prepwise
            </span>

            <h2
              className="
  mt-2
  text-2xl
  font-bold
  tracking-tight
  sm:mt-3
  sm:text-3xl
"
            >
              Your AI interview experience
            </h2>

            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-zinc-400 sm:mt-3 sm:text-sm sm:leading-6">
              practice your answers,
              and improve with instant AI feedback.
            </p>
          </div>

          {/* Preview Container */}
          <div className="rounded-xl border border-white/[0.08] bg-[#101116] p-2.5 shadow-2xl shadow-black/30 sm:rounded-2xl sm:p-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-3 sm:pb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-base text-amber-300 sm:h-9 sm:w-9 sm:rounded-xl sm:text-lg">
                  ✦
                </div>

                <div>
                  <h3 className="text-xs font-semibold sm:text-sm">
                    Prepwise AI
                  </h3>
                  <p className="text-[10px] text-zinc-500 sm:text-[11px]">
                    Technical Interview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/[0.07] px-2 py-1 sm:px-2.5 sm:py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] font-medium text-green-400 sm:text-[10px]">
                  Live Session
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-2.5 py-3 sm:gap-3 sm:py-4 md:grid-cols-2">
              {/* AI Interviewer */}
              <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-gradient-to-br from-[#191a20] to-[#0c0d11] p-4 text-center sm:min-h-[260px] sm:rounded-xl sm:p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/[0.08] text-2xl text-amber-300 shadow-lg shadow-amber-500/[0.05] sm:h-20 sm:w-20 sm:text-3xl">
                  ✦
                </div>

                <h3 className="mt-4 text-sm font-semibold sm:mt-5 sm:text-base">
                  AI Interviewer
                </h3>

                <p className="mt-1 text-[11px] text-zinc-500 sm:text-xs">
                  Your personal interview assistant
                </p>

                {/* Audio Wave */}
                <div className="mt-4 flex h-7 items-center gap-1 sm:mt-6 sm:h-8">
                  {[12, 20, 28, 16, 24, 32, 18, 26, 12, 22, 16, 28].map(
                    (height, index) => (
                      <span
                        key={index}
                        style={{ height: `${height * 0.8}px` }}
                        className="w-1 rounded-full bg-amber-500/80"
                      />
                    ),
                  )}
                </div>

                <p className="mt-2 text-[10px] text-amber-300 sm:mt-3 sm:text-[11px]">
                  Ready to interview
                </p>
              </div>

              {/* Question Card */}
              <div className="flex flex-col justify-between rounded-lg border border-white/[0.06] bg-[#15161c] p-3.5 sm:rounded-xl sm:p-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-300 sm:text-[10px]">
                      Interview Question
                    </span>

                    <span className="text-[10px] text-zinc-500 sm:text-[11px]">
                      03 / 10
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-semibold leading-6 sm:mt-6 sm:text-base sm:leading-7">
                    Can you explain the difference between useEffect and useMemo
                    in React?
                  </h3>

                  <p className="mt-2 text-[11px] leading-5 text-zinc-400 sm:mt-3 sm:text-xs sm:leading-6">
                    Take your time and explain with a practical example. Your AI
                    interviewer is ready to evaluate your response.
                  </p>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-[10px] sm:text-[11px]">
                    <span className="text-zinc-500">Interview progress</span>
                    <span className="text-amber-300">30%</span>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[30%] rounded-full bg-amber-300" />
                  </div>

                  <div className="mt-3 flex justify-between text-[9px] text-zinc-500 sm:mt-4 sm:text-[10px]">
                    <span>Technical Round</span>
                    <span>~ 25 minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3 sm:pt-4">
              <div className="flex items-center gap-2 text-[9px] text-zinc-400 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                AI interview preview
              </div>

              <span className="text-[9px] text-zinc-500 sm:text-[10px]">
                Practice smarter with Prepwise
              </span>
            </div>
          </div>

         
        </div>
      </section>
    </>
  );
};

export default Hero;
