import React from "react";
import "./createRole.css";
const CreateRole = () => {
  return (
    <main>
      <form>
        <h3>Create Role</h3>
        <div class="flexx">
          <div class="formElement">
            <label for="name">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input required type="text" name="name" placeholder="Enter Name" />
          </div>

          <div class="formElement">
            <label for="role">
              Role <span style={{ color: "red" }}>*</span>
            </label>
            <select name="role">
              <option value="" style={{ display: "none" }}>
                Select a role
              </option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>
        <div class="flexx">
          <div class="formElement">
            <label for="designation">
              Designation <span style={{ color: "red" }}>*</span>
            </label>
            <input
              required
              type="text"
              name="designation"
              placeholder="Enter Designation"
            />
          </div>

          <div class="formElement">
            <label for="employeeId">
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

        <div class="formElement">
          <label for="email">
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <input required type="email" name="email" placeholder="Enter Email" />
        </div>

        <div class="formElement">
          <label for="password">
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            type="text"
            name="Password"
            placeholder="Enter Password"
          />
        </div>

        <div class="formElement">
          <label for="confirmPassword">
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            type="text"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
          />
        </div>
        <div class="formElement">
          <button className="btn">Create Role</button>
        </div>
      </form>
    </main>
  );
};

export default CreateRole;
