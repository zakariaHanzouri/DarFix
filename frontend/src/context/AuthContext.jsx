import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

export const authContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await authService.login(data);
      setUser(response.data.user);
      setToken(response.data.token);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const register= async (data)=>{

    try {
      setLoading(true);
      const response= await authService.register(data);
      setUser(response.data.user)
      setToken(response.data.token)
      return response

    } catch (error) {
      throw error;
    }finally{
      setLoading(false);
    }


  }

  const logout=async()=>{
    try {
      setLoading(true)
      await authService.logout();
      clearAuth()
    } catch (error) {
      throw error
    }finally{
      setLoading(false)
    }
  }



  useEffect(() => {
    if (!token) {
      setInitializing(false);
      return;
    }
    const fetchCurrentUser = async () => {
      try {
        const response = await authService.getCurrentUser();

        setUser(response.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          clearAuth();
        } else {
          console.error(error);
        }
      } finally {
        setInitializing(false);
      }
    };
    fetchCurrentUser();
  }, [token]);

  const clearAuth = () => {
    setUser(null);
    setToken(null);
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
    <authContext.Provider value={{ user, token, loading, login, initializing,register,logout }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContext;
