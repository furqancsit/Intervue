
import { Check, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with AI interview practice.",
    interviews: "1 interview",
    popular: false,
    features: [
      { name: "1 AI interview", included: true },
      { name: "Basic interview feedback", included: true },
      { name: "Interview history", included: true },
      { name: "Detailed AI insights", included: false },
      { name: "5 interviews per month", included: false },
    ],
    button: "Get Started Free",
    link: "/signup",
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/ month",
    description: "Practice more and improve your performance.",
    interviews: "5 interviews / month",
    popular: true,
    features: [
      { name: "5 AI interviews per month", included: true },
      { name: "Detailed AI feedback", included: true },
      { name: "Interview history", included: true },
      { name: "Performance insights", included: true },
      { name: "Priority support", included: true },
    ],
    button: "Upgrade to Pro",
    link: "/signup",
  },
];

const Pricing = () => {
  return (
    <section className="bg-black px-5 py-20 text-white sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            Simple Pricing
          </span>

          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
            Choose your interview plan.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Start free and experience AI-powered interviews.
            Upgrade when you're ready to practice more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-amber-500 bg-slate-950 shadow-xl shadow-amber-500/5"
                  : "border-slate-800 bg-slate-950/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 right-6 flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles size={13} />
                  Most Popular
                </div>
              )}

              <h2 className="text-lg font-semibold">{plan.name}</h2>

              <p className="mt-2 text-sm text-slate-400">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-7 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${
                    plan.popular ? "text-amber-500" : "text-white"
                  }`}
                >
                  {plan.price}
                </span>
                <span className="text-sm text-slate-500">
                  {plan.period}
                </span>
              </div>

              {/* Interview Limit */}
              <div className="mt-6 rounded-lg border border-slate-800 bg-black p-3">
                <p className="text-sm font-semibold text-amber-400">
                  {plan.interviews}
                </p>
              </div>

              {/* Features */}
              <div className="my-7 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="flex items-center gap-3 text-sm"
                  >
                    {feature.included ? (
                      <Check
                        size={17}
                        className="shrink-0 text-amber-500"
                      />
                    ) : (
                      <X
                        size={17}
                        className="shrink-0 text-slate-600"
                      />
                    )}

                    <span
                      className={
                        feature.included
                          ? "text-slate-300"
                          : "text-slate-600"
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to={plan.link}
                className={`block rounded-lg px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "border border-slate-700 text-white hover:border-amber-500 hover:text-amber-400"
                }`}
              >
                {plan.button}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-xs text-slate-500">
          Need help choosing a plan? Contact our support team.
        </p>

      </div>
    </section>
  );
};

export default Pricing;
