
import { Bot, MessageSquare, Target, ChartNoAxesCombined } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Live Interview",
    description:
      "Experience realistic interviews with an AI interviewer that asks relevant questions.",
  },
  {
    icon: MessageSquare,
    title: "Instant Feedback",
    description:
      "Get meaningful feedback on your answers and discover areas for improvement.",
  },
  {
    icon: Target,
    title: "Personalized Practice",
    description:
      "Prepare with questions tailored to your job role, skills, and experience.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track Performance",
    description:
      "Monitor your progress, identify weaknesses, and improve with every interview.",
  },
];

const Features = () => {
  return (
    <section className="bg-black px-5 py-20 text-white sm:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Why Prepwise
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to
            <span className="block text-amber-500">
              ace your interviews.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            Smarter preparation, personalized feedback, and
            AI-powered practice to help you perform with confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:bg-slate-900"
              >
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-black">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="text-base font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
