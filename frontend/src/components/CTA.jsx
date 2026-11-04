
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 text-white sm:py-24 lg:px-8">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-950/70 px-6 py-14 text-center sm:px-12 sm:py-20">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-400">
          <Sparkles size={14} />
          YOUR NEXT STEP STARTS HERE
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Ready to ace your
          <span className="block text-amber-500">
            next interview?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Build confidence, improve your answers, and get
          interview-ready with your personal AI interviewer.
        </p>

        {/* CTA Button */}
        <div className="mt-9">
          <Link
            to="/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700 sm:w-auto"
          >
            Start Your Free Interview
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-5 text-xs text-slate-500">
          No experience needed · Start with one free interview
        </p>

      </div>
    </section>
  );
};

export default CTA;
