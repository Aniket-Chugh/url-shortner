// src/authContext/authContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getSocket } from "./socket.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/me", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();

    const socket = getSocket();  

    if (socket) {
      socket.on("authUpdated", (updatedUser) => {
        console.log("Auth updated via socket:", updatedUser);
        setUser(updatedUser);
        setIsAuthenticated(true);
      });

      return () => {
        socket.off("authUpdated");
      };
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
