/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { navigate } = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser_Info, setLoggedInUser_Info] = useState({
    auth_id: "",
    email: "",
  });
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const Login = async (email, password) => {
    setIsLoading(true);
    await axios
      .post(`${API_BASE_URL}/users/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        setLoggedInUser_Info({
          auth_id: response?.data?.accessToken,
          email: response?.data?.email,
        });
        localStorage.setItem(
          "auth_info",
          JSON.stringify({
            auth_id: response.data?.accessToken,
            email: response.data?.email,
          })
        );
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const Logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setIsLoading(false);
    setLoggedInUser_Info({});
  };

  // @TODO :- VERIFY THE TOKEN , IF ITS VALID OR EXPIRED

  useEffect(() => {
    const verifyToken = async () => {
      const user_info = localStorage.getItem("auth_info");

      if (user_info) {
        const { auth_id, email } = JSON.parse(user_info);

        try {
          const response = await axios.get(`${API_BASE_URL}/users/token`, {
            headers: { Authorization: `Bearer ${auth_id}` },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            setLoggedInUser_Info({ auth_id, email });
          } else {
            localStorage.clear();
            setIsAuthenticated(false);
            navigate("/login");
          }
        } catch (error) {
          console.log("Error Verifying Token");
          localStorage.clear();
          setIsAuthenticated(false);
          navigate("/login");
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, [API_BASE_URL, navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, Login, Logout, isLoading, loggedInUser_Info }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
