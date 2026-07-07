import { createContext, useState } from "react";
import * as authService from "../services/authService";

export const authContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    try {
      setLoading(true)
      const response = await authService.login(data);
      setUser(response.data.user);
      setToken(response.data.token);
      return response;
    } catch (error) {
      throw error;
    }finally{
      setLoading(false)
    }
    
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    _setToken(token);
  };

  return (
    <authContext.Provider
      value={{ user,  token, loading,login }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContext;
