import React, { useState } from "react";
import "./applicationList.css";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { FaEye, FaXmark } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";
import FormModal2 from "../../../components/FormModal/FormModal2";
import FormMOdal from "../../../components/FormModal/FormMOdal";
import Popup from "../../../components/Popup/Popup";
const ApplicationList = ({ closeModal: closeMApplicationListModal }) => {
  const [isModal, setIsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const closeModal = () => {
    setIsModal(false);
  };
  return (
    // application list container
    <div id="applicationListContainer">
      <div id="applicationList">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Application List</h2>
          <div className="xMark">
            <FaXmark
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => closeMApplicationListModal()}
            />
          </div>
        </div>
        {/* application search box */}
        <div className="search-container">
          <input type="text" placeholder="Search applications..." />
          <button>Search</button>
        </div>
        {/* application search box */}
        {/* application table */}
        <div id="salesPointTableContainer" className="table-container">
          <table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Apply Id</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Village</th>
                <th>Representative Name</th>
                <th>Representative ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* these data will fetch from database */}
              <tr>
                <td>101</td>
                <td>তাহমিদ আলম</td>
                <td>+৮৮০ ১৩১৮১৯৫৫৯১</td>
                <td>ধাপেরহাট</td>
                <td>মুনছিফা রুহানী</td>
                <td>৫২১</td>
                <td className="status">Pending</td>
                {/* action buttons */}
                <td className="table-icons-container">
                  <div
                    onClick={() => setIsModal(true)}
                    className="table-icon"
                    title="View"
                  >
                    <FaEye style={{ color: "orange" }} size={20} />
                  </div>
                  <div className="table-icon" title="Edit">
                    <FaEdit style={{ color: "blue" }} size={20} />
                  </div>
                  <div
                    onClick={() => handleEdit()}
                    className="table-icon"
                    title="Reject"
                  >
                    <MdCancel style={{ color: "red" }} size={20} />
                  </div>
                  <div className="table-icon" title="Approve">
                    <FaCheckCircle
                      style={{ color: "#228b22" }}
                      onClick={() => setIsOpen(true)}
                      size={20}
                    />
                  </div>
                </td>
                {/* action buttons */}
              </tr>
              <tr>
                <td>101</td>
                <td>তাহমিদ আলম</td>
                <td>+৮৮০ ১৩১৮১৯৫৫৯১</td>
                <td>ধাপেরহাট</td>
                <td>মুনছিফা রুহানী</td>
                <td>৫২১</td>
                <td className="status">Pending</td>
                {/* action buttons */}
                <td className="table-icons-container">
                  <div
                    onClick={() => setIsModal(true)}
                    className="table-icon"
                    title="View"
                  >
                    <FaEye style={{ color: "orange" }} size={20} />
                  </div>
                  <div className="table-icon" title="Edit">
                    <FaEdit style={{ color: "blue" }} size={20} />
                  </div>
                  <div
                    onClick={() => handleEdit()}
                    className="table-icon"
                    title="Reject"
                  >
                    <MdCancel style={{ color: "red" }} size={20} />
                  </div>
                  <div className="table-icon" title="Approve">
                    <FaCheckCircle
                      style={{ color: "#228b22" }}
                      onClick={() => setIsOpen(true)}
                      size={20}
                    />
                  </div>
                </td>
                {/* action buttons */}
              </tr>
            </tbody>
          </table>
        </div>
        {/* application table */}
        <div
          style={{
            display: `${isModal ? "block" : "none"}`,
          }}
          className="modalBox"
        >
          <FormMOdal closeModal={closeModal} />
        </div>
        {/* popup container for approve button click */}
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          width={"50%"}
          height={"50%"}
        >
          <div id="credential">
            <h3>Credential</h3>
            <form>
              <div className="formElement">
                <label htmlFor="password">Password</label>
                <input type="text" placeholder="Enter a password" />
              </div>
              <div className="formElement">
                <button className="btn">Set Password</button>
              </div>
            </form>
          </div>
        </Popup>
        {/* popup container for approve button click */}
      </div>
    </div>
    // application list container
  );
};

export default ApplicationList;
