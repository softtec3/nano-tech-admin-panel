import React from "react";
import "./dashboard.css";
import { useOutletContext } from "react-router";
const DashBoard = () => {
  const { openModal } = useOutletContext();
  return (
    // dashboard
    <div id="dashboard">
      {/* dashboard title */}
      <h2>Dashboard</h2>
      <div className="dashboard-container">
        {/* application summary */}
        <div className="summary">
          <div className="summary-first">
            <p>Recent Applications</p>
            {/* button for vew all application */}
            <button className="btn" onClick={() => openModal()}>
              View All
            </button>
          </div>
          <div className="dashSummaryTable">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Apply Id</th>
                  <th>Mobile</th>
                  <th>Village</th>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
                {/* data row */}
                <tr>
                  <td>Tahmid Alam</td>
                  <td>101</td>
                  <td>01318195591</td>
                  <td>Dhaperhat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* application summary */}
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
    // dashboard
  );
};

export default DashBoard;
