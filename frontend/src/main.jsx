import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./context/authProvider.jsx";
import { Toaster } from "react-hot-toast";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthContextProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111827",
              color: "#f8fafc",
              border: "1px solid #334155",
              padding: "12px 16px",
            },
            success: {
              iconTheme: {
                primary: "#f59e0b",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
