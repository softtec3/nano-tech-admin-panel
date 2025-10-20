import React, { useEffect, useState } from "react";
import "./createWarehouse.css";
import { FaXmark } from "react-icons/fa6";
import { getFormData } from "../../utils/getFormData";
import { toast } from "react-toastify";

const CreateWarehouse = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [allWarehouses, setAllWarehouses] = useState([]);
  const [allSections, setAllSections] = useState([]);
  // Create warehouse
  const handleCreateWarehouse = (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    if (formData?.warehouse_name == "" || formData?.warehouse_location == "") {
      toast.error("All fields are required");
      return;
    }
    try {
      fetch(`${import.meta.env.VITE_API}/create_warehouse.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      e.target.reset();
      setIsShow(false);
    }
  };
  // get all warehouses
  const getAllWarehouses = () => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_warehouses.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllWarehouses(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // create warehouse section
  const handleCreateSection = (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);
    try {
      fetch(`${import.meta.env.VITE_API}/create_warehouse_section.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error("Something went wrong. Please check console");
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      e.target.reset();
      setIsShow2(false);
    }
  };
  // get all sections based on warehouse id
  const handleGetSections = (e) => {
    const warehouse_id = e.target.value;
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_sections_by_id.php?warehouse_id=${warehouse_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllSections(data?.data);
          } else {
            toast.error(data?.message);
            setAllSections([]);
            console.log(data?.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // Create sub section
  const handleCreateSubSection = (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    try {
      fetch(`${import.meta.env.VITE_API}/create_warehouse_sub_section.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsShow3(false);
      e.target.reset();
    }
  };
  useEffect(() => {
    getAllWarehouses();
  }, []);
  return (
    <section id="warehouse">
      {/* warehouses and their products */}
      {/* Warehouse form container */}
      <div
        className="warehouseContainerModal"
        style={{ display: `${isShow ? "flex" : "none"}` }}
      >
        <main>
          <form onSubmit={handleCreateWarehouse}>
            <span onClick={() => setIsShow(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Create Warehouse</h3>
            <div className="formElement">
              <label htmlFor="warehouse_name">
                Warehouse Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="warehouse_name"
                placeholder="Enter warehouse name"
              />
            </div>

            <div className="formElement">
              <label htmlFor="warehouse_location">
                Warehouse location <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="warehouse_location"
                placeholder="Enter warehouse location"
              />
            </div>

            <div className="formElement">
              <button type="submit" className="btn">
                Create Warehouse
              </button>
            </div>
          </form>
        </main>
      </div>
      {/* Create section */}
      <div
        className="warehouseContainerModal"
        style={{ display: `${isShow2 ? "flex" : "none"}` }}
      >
        <main>
          <form onSubmit={handleCreateSection}>
            <span onClick={() => setIsShow2(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Create Warehouse Section</h3>
            <div className="formElement">
              <label htmlFor="warehouseName">
                Warehouse Name <span style={{ color: "red" }}>*</span>
              </label>
              <select name="warehouse_id" required>
                {/* these will fetch from database */}
                <option value="" style={{ display: "none" }}>
                  Select warehouse
                </option>
                {allWarehouses &&
                  allWarehouses?.length > 0 &&
                  allWarehouses.map((warehouse) => (
                    <option key={warehouse?.id} value={warehouse?.id}>
                      {warehouse?.warehouse_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="formElement">
              <label htmlFor="section_name">
                Section Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="section_name"
                placeholder="Enter section name"
              />
            </div>

            <div className="formElement">
              <button type="submit" className="btn">
                Create Section
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Create sub section */}
      <div
        className="warehouseContainerModal"
        style={{ display: `${isShow3 ? "flex" : "none"}` }}
      >
        <main>
          <form onSubmit={handleCreateSubSection}>
            <span onClick={() => setIsShow3(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Create Sub Section</h3>
            <div className="formElement">
              <label htmlFor="warehouse_id">
                Warehouse Name <span style={{ color: "red" }}>*</span>
              </label>
              <select onChange={handleGetSections} name="warehouse_id" required>
                {/* these will fetch from database */}
                <option value="" style={{ display: "none" }}>
                  Select warehouse
                </option>
                {allWarehouses &&
                  allWarehouses?.length > 0 &&
                  allWarehouses.map((warehouse) => (
                    <option key={warehouse?.id} value={warehouse?.id}>
                      {warehouse?.warehouse_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="formElement">
              <label htmlFor="section_id">
                Warehouse Section <span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="section_id"
                required
                disabled={allSections.length == 0 && true}
              >
                {/* these will fetch from database */}
                <option value="" style={{ display: "none" }}>
                  Select section
                </option>
                {allSections &&
                  allSections?.length > 0 &&
                  allSections.map((section) => (
                    <option key={section?.id} value={section?.id}>
                      {section?.section_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="formElement">
              <label htmlFor="sub_section_name">
                Warehouse Sub Section <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="sub_section_name"
                placeholder="Enter sub section location"
                disabled={allSections.length == 0 && true}
              />
            </div>

            <div className="formElement">
              <button className="btn">Create Sub Section</button>
            </div>
          </form>
        </main>
      </div>
      <div className="warehouseContainer">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2>All Warehouses</h2>
          <select name="warehouse">
            {/* these will fetch from database */}
            <option value="" style={{ display: "none" }}>
              All warehouses
            </option>
            {allWarehouses &&
              allWarehouses?.length > 0 &&
              allWarehouses.map((warehouse) => (
                <option key={warehouse?.id} value={warehouse?.id}>
                  {warehouse?.warehouse_name}
                </option>
              ))}
          </select>
        </div>
        <div className="warButtons">
          <button
            onClick={() => {
              setIsShow(true);
            }}
            className="btn"
          >
            Create Warehouse
          </button>
          <button
            onClick={() => {
              setIsShow2(true);
            }}
            className="btn"
          >
            Create Section
          </button>
          <button
            onClick={() => {
              setIsShow3(true);
            }}
            className="btn"
          >
            Create Sub Section
          </button>
        </div>
      </div>
      {/* all warehouse product will here */}
      {/* table */}
      <div id="salesPointTableContainer">
        <table>
          <thead>
            <tr>
              <th>Warehouse</th>
              <th>Section</th>
              <th>Sub section</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </section>
  );
};

export default CreateWarehouse;
