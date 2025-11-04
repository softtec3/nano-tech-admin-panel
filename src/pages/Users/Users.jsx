import React, { useEffect, useState } from "react";
import "./users.css";
import { toast } from "react-toastify";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [changeState, setChangeState] = useState(true);
  const handleStatus = (status, userId) => {
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/change_general_user_status.php?user_id=${userId}&status=${status}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            setChangeState(!changeState);
          } else {
            toast.error("Something went wrong. Check console");
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  //getting all general users
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_general_users.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setUsers(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [changeState]);
  return (
    <section id="users">
      <h2>Users</h2>
      <div id="salesPointTableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>User Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr
                  key={user?.id}
                  style={{
                    backgroundColor: `${
                      user.status == "inactive" ? "red" : ""
                    }`,
                  }}
                >
                  <td>{user?.id}</td>
                  <td>{user?.full_name}</td>
                  <td>{user?.user_name}</td>
                  <td style={{ textTransform: "capitalize" }}>{user?.role}</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {user?.status}
                  </td>
                  <td>
                    {user?.status == "active" ? (
                      <button
                        onClick={() => {
                          handleStatus("inactive", user?.id);
                        }}
                        className="btn-table"
                        style={{ backgroundColor: "red" }}
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleStatus("active", user?.id);
                        }}
                        className="btn-table"
                        style={{ marginRight: "5px" }}
                      >
                        Active
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            {users && users?.length <= 0 && (
              <tr>
                <td colSpan={12}>0 users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
