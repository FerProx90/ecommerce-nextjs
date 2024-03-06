import { Token, User } from "@/api";
import { createContext, useEffect, useState } from "react";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();
      if (!token || tokenCtrl.hasExpired(token)) {
        logout();
        setLoading(false);
        return;
      }

      await login(token);
    })();
  }, []);

  //set toekn on local storage, also set user and token on state context
  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      const response = await userCtrl.getMe();
      setUser(response);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.error("login context error:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      tokenCtrl.removeToken(token);
      setToken(null);
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error("login context error:", error);
      setLoading(false);
    }
  };

  const updateUser = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
