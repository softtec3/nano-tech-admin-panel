import React from "react";
import "./login.css";
import { getFormData } from "../../utils/getFormData";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
const Login = () => {
  const { loginUser, setUser, user, isLoading, setIsLoading } = useAuth();
  console.log(user);
  console.log(isLoading);
  const navigate = useNavigate();
  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = getFormData(e.target);
    loginUser(formdata)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data?.data);
          setIsLoading(false);
          if (data.data.logged_user_role != "admin") {
            toast.error("Access denied. Only admin have access!");
          } else {
            navigate("/dashboard");
          }
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="formElement">
          <label htmlFor="email">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" name="email" placeholder="Enter Email" required />
        </div>

        <div className="formElement">
          <label htmlFor="password">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="formElement">
          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
