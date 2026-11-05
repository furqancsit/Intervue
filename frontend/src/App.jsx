import React from "react";
import Navbar from "./components/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import SignIn from "./auth/components/SignIn";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import Signup from "./auth/components/SignUp";
import NotFound from "./components/NotFound";
import InterviewForm from "./components/InterviewForm";
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/create-interview" element={<InterviewForm/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
