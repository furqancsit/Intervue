import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthButton } from "../googleAuthButton";

import { useNavigate } from "react-router-dom";
import { login,loginWithGoogle } from "../api/Auth";

import { useAuth } from "../../context/authProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const {setUser}= useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleGoogleSuccess = async ({ credential }) => {
    // Connect your Google OAuth authentication her

    const res = await loginWithGoogle(credential);

    setUser(res.data)

    navigate("/dashboard");

    console.log("Google login clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await login(form.email, form.password);
 
      setUser(response.user)
      navigate("/dashboard");
    } catch (error) {
      console.log("login failed", error);
    }
  };

  const { email, password } = form;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-12 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl sm:p-8">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              ✦
            </div>

            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue your interview preparation journey.
            </p>
          </div>

          <GoogleAuthButton
            onSuccess={handleGoogleSuccess}
            text="continue_with"
            shape="rectangular"
            theme="outline"
            size="large"
            width="360"
          />

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Email Login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-amber-500 hover:text-amber-400"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Sign in
            </button>
          </form>

          {/* Signup */}
          <p className="mt-7 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-amber-500 hover:text-amber-400"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs leading-6 text-slate-500">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-slate-300 hover:text-amber-400">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-slate-300 hover:text-amber-400">
            Privacy Policy
          </Link>
          .
        </p>

        <Link
          to="/"
          className="mt-5 block text-center text-sm text-slate-500 transition hover:text-amber-400"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
