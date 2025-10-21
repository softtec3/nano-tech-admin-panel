import React, { useState } from "react";
import "./createRole.css";
import { toast } from "react-toastify";
const CreateRole = () => {
  const [passError, setPassError] = useState("");
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.confirmPassword !== data.password) {
      setPassError("Confirm password not matched");
    } else {
      setPassError("");
      console.log(data);
      fetch(`${import.meta.env.VITE_API}/create_user.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
          } else {
            console.log(data);
            toast.error(data.message);
          }
        })
        .catch((e) => console.log(e));
      e.target.reset();
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h3>Create Role</h3>
        <div className="flexx">
          <div className="formElement">
            <label htmlFor="name">
              Name <span style={{ color: "red" }}>*</span>
            </label>
            <input required type="text" name="name" placeholder="Enter Name" />
          </div>

          <div className="formElement">
            <label htmlFor="role">
              Role <span style={{ color: "red" }}>*</span>
            </label>
            <select name="role" required>
              <option value="" style={{ display: "none" }}>
                Select a role
              </option>
              <option value="admin">Admin</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>
        <div className="flexx">
          <div className="formElement">
            <label htmlFor="designation">
              Designation <span style={{ color: "red" }}>*</span>
            </label>
            <input
              required
              type="text"
              name="designation"
              placeholder="Enter Designation"
            />
          </div>

          <div className="formElement">
            <label htmlFor="employeeId">
              Employee Id <span style={{ color: "red" }}>*</span>
            </label>
            <input
              required
              type="text"
              name="employeeId"
              placeholder="Enter Employee Id"
            />
          </div>
        </div>

        <div className="formElement">
          <label htmlFor="email">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input required type="email" name="email" placeholder="Enter Email" />
        </div>

        <div className="formElement">
          <label htmlFor="password">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>

        <div className="formElement">
          <label htmlFor="confirmPassword">
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            onChange={() => setPassError("")}
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
          />
        </div>

        {passError && <p style={{ color: "red" }}>{passError}</p>}
        <div className="formElement">
          <button type="submit" className="btn">
            Create Role
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateRole;
