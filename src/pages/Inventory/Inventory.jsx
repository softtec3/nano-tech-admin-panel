import React, { useState } from "react";
import "./inventory.css";
import ViewProductCard from "./ViewProductCard/ViewProductCard";
import { useOutletContext } from "react-router";
import AddProducts from "./AddProducts/AddProducts";
const Inventory = () => {
  const { active, setActive } = useOutletContext();
  return (
    // inventory page
    <div id="inventory">
      {/* inventory tabs */}
      <div className="inventory-tabs">
        <span
          onClick={() => setActive("addProducts")}
          className={`${active === "addProducts" && "tabStyle"}`}
        >
          Add Products
        </span>
        <span
          onClick={() => setActive("viewProducts")}
          className={`${active === "viewProducts" && "tabStyle"}`}
        >
          View Products
        </span>
      </div>
      {/* inventory tabs */}
      {/* inventory main section- changeable */}
      <div className="mainInventorySection">
        {/* add product  modal */}
        <div
          id="addProducts"
          style={{ display: `${active === "addProducts" ? "block" : "none"}` }}
        >
          <AddProducts setActive={setActive} />
        </div>
        {/* add product  modal */}
        {/* view products list */}
        <div
          id="viewProducts"
          style={{ display: `${active === "viewProducts" ? "grid" : "none"}` }}
        >
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
          {/* static product card */}
          <ViewProductCard />
        </div>
        {/* view products list */}
      </div>
      {/* inventory main section- changeable */}
    </div>
    // inventory page
  );
};

export default Inventory;
