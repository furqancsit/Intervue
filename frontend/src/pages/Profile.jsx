
import React from "react";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  CreditCard,
  LogOut,
  ChevronRight,
  BrainCircuit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Replace this import with your actual AuthContext
import { useAuth } from "../context/authProvider";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const createdDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">

        {/* Brand */}
        <div className="mb-12 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <BrainCircuit size={21} />
          </div>
          <span className="font-semibold tracking-tight">
            InterviewAI
          </span>
          
        </div>

        {/* Heading */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold tracking-tight">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your personal information and account preferences.
          </p>
        </div>

        {/* Profile information */}
        <section className="rounded-xl border border-white/[0.08] bg-[#111827] p-5 sm:p-6">

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserRound size={27} />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                {user?.name || user?.fullName || "Your account"}
              </h2>
              <p className="mt-1 truncate text-sm text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="my-6 border-t border-white/[0.07]" />

          <h3 className="mb-5 text-sm font-semibold text-gray-200">
            Personal information
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <UserRound size={17} className="mt-0.5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Full name</p>
                <p className="mt-1 text-sm text-gray-200">
                  {user?.name || user?.fullName || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={17} className="mt-0.5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Email address</p>
                <p className="mt-1 text-sm text-gray-200">
                  {user?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays size={17} className="mt-0.5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Member since</p>
                <p className="mt-1 text-sm text-gray-200">
                  {createdDate}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription */}
        <section className="mt-5 rounded-xl border border-white/[0.08] bg-[#111827] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <CreditCard size={19} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Subscription
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Your current membership
                </p>
              </div>
            </div>

            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium capitalize text-amber-400">
              {user?.plan || "Free"}
            </span>
          </div>

          <button
            onClick={() => navigate("/pricing")}
            className="mt-5 flex w-full items-center justify-between border-t border-white/[0.07] pt-4 text-sm text-gray-400 transition hover:text-amber-400"
          >
            Manage subscription
            <ChevronRight size={17} />
          </button>
        </section>

        {/* Account security */}
        <section className="mt-5 rounded-xl border border-white/[0.08] bg-[#111827] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <ShieldCheck size={19} />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Account security
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Your account information is protected.
              </p>
            </div>
          </div>
        </section>

        {/* Logout */}
        <div className="mt-8 border-t border-white/[0.07] pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>

        <p className="mt-10 text-center text-xs text-gray-600">
          InterviewAI · Account settings
        </p>
      </main>
    </div>
  );
}
