import React from "react";
import "./login.css";
import { Link } from "react-router";
const Login = () => {
  return (
    <main>
      <form>
        <h2>Admin Login</h2>
        <div className="formElement">
          <label for="email">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" name="email" placeholder="Enter Email" required />
        </div>

        <div className="formElement">
          <label for="password">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="Password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="formElement">
          <Link to={"/dashboard"}>
            <button style={{ width: "100%" }}>Login</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
