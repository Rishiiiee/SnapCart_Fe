import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}user/getuser`, {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      console.log("Fetch user failed:", err.response?.data || err.message);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}user/login`,
      { email, password },
      { withCredentials: true }
    );
    await fetchUser();
  };

  const register = async (name, email, password) => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}user/register`,
      { name, email, password },
      { withCredentials: true }
    );
  };

  const logout = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}user/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (  
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
