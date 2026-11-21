import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle, register } from "../api/Auth";
import { GoogleAuthButton } from "../googleAuthButton";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/authProvider";
import { toastApiPromise } from "../../utils/notifications";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignup = async ({ credential }) => {
    try {
      const response = await toastApiPromise(
        loginWithGoogle(credential),
        {
          loading: "Creating your account with Google...",
          success: "Your account is ready.",
          error: "Unable to sign up with Google.",
        },
      );
      setUser(response.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await toastApiPromise(register(formData), {
        loading: "Creating your account...",
        success: "Your account has been created.",
        error: "Unable to create your account. Please try again.",
      });
      setUser(response.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 py-12 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link
          to="/"
          className="mb-8 block text-center text-3xl font-medium lowercase"
        >
          <span className="font-bold tracking-tight text-amber-200 ">Pre</span>pwise
        </Link>

        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl sm:p-8">
          {/* Heading */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              ✦
            </div>

            <h1 className="text-2xl font-bold">Create your account</h1>

            <p className="mt-2 text-sm text-slate-400">
              Start your AI interview preparation journey.
            </p>
          </div>

          {/* Google Signup */}
          <GoogleAuthButton
            onSuccess={handleGoogleSignup}
            onError={() => toast.error("Google sign-up failed. Please try again.")}
          />

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">
              OR SIGN UP WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-800 bg-black px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-300 px-5 py-3 text-sm font-semibold text-black cursor-pointer transition hover:bg-amber-200"
            >
              Create Free Account
            </button>
          </form>

          {/* Free Plan Info */}
          <div className="mt-6 rounded-lg border border-slate-800 bg-black p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-amber-200">
                Free Plan
              </span>
              <span className="text-sm font-semibold text-white">₹0</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Includes 1 free AI interview.
            </p>
          </div>

          {/* Login Link */}
          <p className="mt-7 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-amber-200 hover:text-amber-400"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-6 text-slate-500">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-slate-300 hover:text-amber-400">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-slate-300 hover:text-amber-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Signup;
