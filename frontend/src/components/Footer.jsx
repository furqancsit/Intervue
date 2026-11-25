
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#08090c] text-white">

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-amber-300">Prep</span>
                wise
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-zinc-400">
              Practice smarter. Interview better.
              Prepare for your next opportunity with
              AI-powered interview practice and instant feedback.
            </p>

          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/features"
                  className="text-sm text-zinc-400 transition hover:text-amber-300"
                >
                  Features
                </Link>
              </li>

              <li>
                <a
                  href="/#pricing"
                  className="text-sm text-zinc-400 transition hover:text-amber-300"
                >
                  Pricing
                </a>
              </li>

              <li>
                <Link
                  to="/create-interview"
                  className="text-sm text-zinc-400 transition hover:text-amber-300"
                >
                  Start Practicing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/features"
                  className="text-sm text-zinc-400 transition hover:text-amber-300"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <a
                  href="/#faq"
                  className="text-sm text-zinc-400 transition hover:text-amber-300"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get Started
            </h3>

            <p className="mt-5 text-sm leading-6 text-zinc-400">
              Ready to improve your interview skills?
              Start practicing today.
            </p>

            <Link
              to="/create-interview"
              className="
                mt-5 inline-flex items-center justify-center
                gap-2 rounded-xl bg-amber-300
                px-5 py-3 text-sm font-semibold text-black
                transition duration-200
                hover:-translate-y-0.5 hover:bg-amber-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-amber-300
              "
            >
              Start Practicing <span>→</span>
            </Link>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="
          mt-12 flex flex-col items-center justify-between
          gap-4 border-t border-white/[0.08] pt-6
          text-center sm:mt-16
          sm:flex-row sm:text-left
        ">

          <p className="text-xs text-zinc-500">
            © {currentYear} Prepwise. All rights reserved.
          </p>

          <p className="text-xs text-zinc-500">
            Built to help you interview with confidence.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
