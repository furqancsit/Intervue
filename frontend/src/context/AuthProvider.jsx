
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/me", {
        withCredentials: true,
      });

      setUser(data.user);
    } catch (error) {
      console.error(
        "GET ME ERROR:",
        error.response?.data || error.message
      );

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    getMe,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
