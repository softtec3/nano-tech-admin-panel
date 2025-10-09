import React, { useState } from "react";
import "./createWarehouse.css";
import { FaXmark } from "react-icons/fa6";
// these should come from database
const allWarehouses = [
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Rice Cooker",
    productQuantity: 50,
  },
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Blender",
    productQuantity: 30,
  },
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Electric Kettle",
    productQuantity: 70,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "Microwave Oven",
    productQuantity: 15,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "Gas Stove",
    productQuantity: 25,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "LED TV",
    productQuantity: 12,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Refrigerator",
    productQuantity: 8,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Air Conditioner",
    productQuantity: 18,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Washing Machine",
    productQuantity: 10,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Ceiling Fan",
    productQuantity: 40,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Table Fan",
    productQuantity: 25,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Exhaust Fan",
    productQuantity: 15,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Laptop",
    productQuantity: 20,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Desktop PC",
    productQuantity: 12,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Printer",
    productQuantity: 18,
  },
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Rice Cooker",
    productQuantity: 50,
  },
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Blender",
    productQuantity: 30,
  },
  {
    warehouseName: "warehouse01",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-1",
    productName: "Electric Kettle",
    productQuantity: 70,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "Microwave Oven",
    productQuantity: 15,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "Gas Stove",
    productQuantity: 25,
  },
  {
    warehouseName: "warehouse02",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-2",
    productName: "LED TV",
    productQuantity: 12,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Refrigerator",
    productQuantity: 8,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Air Conditioner",
    productQuantity: 18,
  },
  {
    warehouseName: "warehouse03",
    warehouseSection: "Section-C",
    warehouseSubSection: "Sub-3",
    productName: "Washing Machine",
    productQuantity: 10,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Ceiling Fan",
    productQuantity: 40,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Table Fan",
    productQuantity: 25,
  },
  {
    warehouseName: "warehouse04",
    warehouseSection: "Section-A",
    warehouseSubSection: "Sub-2",
    productName: "Exhaust Fan",
    productQuantity: 15,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Laptop",
    productQuantity: 20,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Desktop PC",
    productQuantity: 12,
  },
  {
    warehouseName: "warehouse05",
    warehouseSection: "Section-B",
    warehouseSubSection: "Sub-1",
    productName: "Printer",
    productQuantity: 18,
  },
];

const CreateWarehouse = () => {
  const [warehouses, setWarehouses] = useState(allWarehouses);
  const [isShow, setIsShow] = useState(false);
  const handleWarehouseData = (e) => {
    const warehouseName = e.target.value;
    setWarehouses(
      allWarehouses.filter(
        (warehouse) => warehouse.warehouseName === warehouseName
      )
    );
  };
  return (
    <section id="warehouse">
      {/* warehouses and their products */}
      {/* Warehouse form container */}
      <div
        id="warehouseContainerModal"
        style={{ display: `${isShow ? "flex" : "none"}` }}
      >
        <main>
          <form>
            <span onClick={() => setIsShow(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Create Warehouse</h3>
            <div class="formElement">
              <label for="warehouseName">
                Warehouse Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="email"
                name="warehouseName"
                placeholder="Enter warehouse name"
              />
            </div>

            <div class="formElement">
              <label for="warehouseLocation">
                Warehouse location <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="warehouseLocation"
                placeholder="Enter warehouse location"
              />
            </div>

            <div class="formElement">
              <button className="btn">Create Role</button>
            </div>
          </form>
        </main>
      </div>
      <div className="warehouseContainer">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2>All Warehouses</h2>
          <select onChange={handleWarehouseData} name="warehouse">
            {/* these will fetch from database */}
            <option value="" style={{ display: "none" }}>
              All warehouses
            </option>
            <option value="warehouse01">Warehouse 01</option>
            <option value="warehouse02">Warehouse 02</option>
            <option value="warehouse03">Warehouse 03</option>
            <option value="warehouse04">Warehouse 04</option>
            <option value="warehouse05">Warehouse 05</option>
          </select>
        </div>
        <button
          onClick={() => {
            setIsShow(true);
          }}
          className="btn"
        >
          Create Warehouse
        </button>
      </div>
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
          <tbody>
            {warehouses?.map((details, index) => (
              <tr id="index">
                <td>{details?.warehouseName}</td>
                <td>{details?.warehouseSection}</td>
                <td>{details?.warehouseSubSection}</td>
                <td>{details?.productName}</td>
                <td>{details?.productQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CreateWarehouse;
