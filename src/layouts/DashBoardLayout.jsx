import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import "./dashBoardLayout.css";
import DashBoardSideBar from "../components/DashBoardSideBar/DashBoardSideBar";
import { FaBars, FaXmark } from "react-icons/fa6";
import ApplicationList from "../pages/Dashboard/ApplicationList/ApplicationList";
import DashboardTop from "../components/DashboardTop/DashboardTop";
const DashBoardLayout = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const [active, setActive] = useState("addProducts");
  const addProductClick = () => {
    setActive("addProducts");
  };
  const viewProductsClick = () => {
    setActive("viewProducts");
  };
  return (
    // dashboard layout
    <div id="dashBoardLayout">
      {/* dashboard sidebar */}
      <div className={`dashBoardSideBar ${isTrue ? "hide" : "show"}`}>
        <div className="dash-hamburger2">
          <FaXmark onClick={() => setIsTrue(true)} size={20} />
        </div>
        <DashBoardSideBar
          openModal={openModal}
          addProductClick={addProductClick}
          viewProductsClick={viewProductsClick}
        />
      </div>
      {/* dashboard sidebar */}
      <div className="dashBoardMain">
        {/* dashboard top */}
        <DashboardTop setIsTrue={setIsTrue} />
        {/* dashboard  main contents goes here */}
        <Outlet context={{ openModal, active, setActive }} />
        {/* dashboard  main contents goes here */}
        {/* application modal */}
        <div
          onClick={() => closeModal()}
          className="popup-container"
          style={{ display: `${isModal ? "block" : "none"}` }}
        >
          <div
            className="applicationList-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <ApplicationList closeModal={closeModal} />
          </div>
        </div>
        {/* application modal */}
      </div>
    </div>
    // dashboard layout
  );
};

export default DashBoardLayout;
