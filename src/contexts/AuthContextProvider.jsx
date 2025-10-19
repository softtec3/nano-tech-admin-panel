import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = (formdata) => {
    return fetch(`${import.meta.env.VITE_API}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formdata),
    });
  };
  const logoutUser = () => {
    return fetch(`${import.meta.env.VITE_API}/logout.php`, {
      credentials: "include",
    });
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/authentication.php`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.logged_user_email) {
          setUser(data?.data);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      });
  }, []);
  const authDetails = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
