import React, { useEffect, useState } from "react";
import "./dashboardTop.css";
import { FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
const DashboardTop = ({ setIsTrue }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = today.getFullYear();
  const formattedDate2 = `${day}-${month}-${year}`;
  useEffect(() => {
    const interVal = setInterval(() => {
      setFormattedDate(new Date().toLocaleString().split(","));
    }, 1000);
    return () => {
      clearInterval(interVal);
    };
  }, []);

  return (
    // dashboard top component
    <div id="dashboardTop">
      {/* hamburger menu */}
      <div className="hamburger">
        <FaBars
          style={{ cursor: "pointer" }}
          onClick={() => setIsTrue(false)}
          size={20}
        />
      </div>
      {/* time, date and logout button */}
      <div className="flex">
        <div className="flex">
          <p>Date: {formattedDate2}</p>
          <p>Time: {formattedDate[1]}</p>
        </div>
        <button className="btn">Logout</button>
      </div>
      {/* time, date and logout button */}
    </div>
    // dashboard top component
  );
};

export default DashboardTop;
