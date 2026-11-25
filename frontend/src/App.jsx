import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./auth/components/SignIn";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Signup from "./auth/components/SignUp";
import NotFound from "./components/NotFound";
import InterviewForm from "./interviews/InterviewForm";
import MyInterview from "./interviews/components/MyInterview";
import StartInterview from "./interviews/StartInterview";
import InterviewRoom from "./interviews/InterviewRoom";
import InterviewResult from "./interviews/InterviewResult";
import Dashboard from "./Dashboard";
import Profile from "./pages/Profile";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import InterviewCreateOption from "./components/InterviewCreateOption";
import ResumeInterview from "./interviews/components/ResumeInterview";
import ResumeAnalysisPage from "./pages/ResumeAnalysisPage";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/create-interview" element={<InterviewForm />} />
            <Route path="/my-interview" element={<MyInterview />} />

            <Route path="/interview/:id/start" element={<StartInterview />} />

            <Route path="/interview/:id/room/:sessionId" element={<InterviewRoom />} />


         
            <Route path="/interview/:id/result/:sessionId" element={<InterviewResult />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main> */}
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />

            {/* Authentication routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/manual-interview" element={<InterviewForm />} />
              <Route path="/my-interview" element={<MyInterview />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/interview/:id/start" element={<StartInterview />} />

              <Route
                path="/interview/:id/room/:sessionId"
                element={<InterviewRoom />}
              />

              <Route
                path="/interview/:id/result/:sessionId"
                element={<InterviewResult />}
              />

              <Route path="/create-interview" element={<InterviewCreateOption />} />

              <Route path="/resume-based" element={<ResumeInterview />} />

              <Route
                path="/resume-analysis/:resumeId"
                element={<ResumeAnalysisPage />}
              />
            </Route>

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
