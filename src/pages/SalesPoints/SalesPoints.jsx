import React, { useEffect, useState } from "react";
import "./salesPoints.css";
import { FaXmark } from "react-icons/fa6";
import { getFormData } from "../../utils/getFormData";
import { toast } from "react-toastify";
const SalesPoints = () => {
  const [isShow, setIsShow] = useState(false);
  const [salesPoints, setSalesPoints] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  //   create sales point
  const handleCreateSalesPoint = (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    try {
      fetch(`${import.meta.env.VITE_API}/create_sales_point.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            console.log(data?.message);
            toast.error(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    } finally {
      e.target.reset();
      setIsShow(false);
    }
  };
  const getSalesPoints = () => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_sales_points.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSalesPoints(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    }
  };

  // Change status of sales point
  const handleStatus = (status, id, user_id) => {
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/change_sales_points_status.php?status=${status}&sales_point_id=${id}&user_id=${user_id}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getSalesPoints();
          } else {
            console.log(data?.message);
            toast.error(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };

  //fetch sales points from database
  useEffect(() => {
    getSalesPoints();
  }, []);
  // fetch all users
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_general_users.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllUsers(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <section id="warehouse">
        {/* warehouses and their products */}
        {/* Warehouse form container */}
        <div
          className="warehouseContainerModal"
          style={{ display: `${isShow ? "flex" : "none"}` }}
        >
          <main>
            <form onSubmit={handleCreateSalesPoint}>
              <span onClick={() => setIsShow(false)} className="cross">
                <FaXmark size={20} />
              </span>
              <h3>Create Sales Point</h3>
              <div className="formElement">
                <label htmlFor="name">
                  Sales Point Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Enter sales point name"
                />
              </div>
              <div className="formElement">
                <label htmlFor="location">
                  Sales Point Location <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="location"
                  placeholder="Enter sales point location"
                />
              </div>
              <div className="formElement">
                <label htmlFor="user_id">
                  Select User <span style={{ color: "red" }}>*</span>
                </label>
                <select name="user_id" id="" required>
                  <option value="" style={{ display: "none" }}>
                    Select a user
                  </option>
                  {allUsers &&
                    allUsers?.length > 0 &&
                    allUsers?.map((user) => (
                      <option key={user?.id} value={user?.id}>
                        {user?.id}-{user?.full_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="formElement">
                <label htmlFor="owner_name">
                  Owner Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="owner_name"
                  placeholder="Enter sales point owner name"
                />
              </div>
              <div className="formElement">
                <label htmlFor="phone_number">
                  Phone Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="phone_number"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="formElement">
                <label htmlFor="owner_nid">
                  Owner NID <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="owner_nid"
                  placeholder="Enter sales point owner nid"
                />
              </div>

              <div className="formElement">
                <button type="submit" className="btn">
                  Create
                </button>
              </div>
            </form>
          </main>
        </div>

        <div className="warehouseContainer">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>Sales Points</h2>
          </div>
          <div className="warButtons">
            <button
              onClick={() => {
                setIsShow(true);
              }}
              className="btn"
            >
              Create Sales Point
            </button>
          </div>
        </div>
        {/* all warehouse product will here */}
        {/* table */}
        <div id="salesPointTableContainer">
          <table>
            <thead>
              <tr>
                <th>SP ID</th>
                <th>SP Name</th>
                <th>Location</th>
                <th>Owner</th>
                <th>Phone Number</th>
                <th>Owner NID</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {salesPoints &&
                salesPoints?.length > 0 &&
                salesPoints.map((point) => {
                  return (
                    <tr key={point?.id}>
                      <td>{point?.id}</td>
                      <td>{point?.name}</td>
                      <td>{point?.location}</td>
                      <td>{point?.owner_name}</td>
                      <td>{point?.phone_number}</td>
                      <td>{point?.owner_nid}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {point?.status}
                      </td>
                      <td>
                        {point?.status == "active" ? (
                          <button
                            onClick={() => {
                              handleStatus(
                                "inactive",
                                point?.id,
                                point?.user_id
                              );
                            }}
                            className="btn-table"
                            style={{ backgroundColor: "red" }}
                          >
                            Inactive
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleStatus("active", point?.id, point?.user_id);
                            }}
                            className="btn-table"
                            style={{ marginRight: "5px" }}
                          >
                            Active
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SalesPoints;
