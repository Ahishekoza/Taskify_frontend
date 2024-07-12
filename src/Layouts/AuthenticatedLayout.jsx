/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useAuth } from "@/context/AuthContextProvider";
import { Navigate } from "react-router-dom";

const AuthenticatedLayout = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner/loader
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthenticatedLayout;
