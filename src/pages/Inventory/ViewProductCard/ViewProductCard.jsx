import React, { useState } from "react";
import "./viewProductCard.css";
import Swal from "sweetalert2";
import Popup from "../../../components/Popup/Popup";
const ViewProductCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
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
  return (
    // view product card
    <div>
      <div className="productCard">
        {/* product image */}
        <div className="card-image">
          <img
            src="https://i.ibb.co/mCnR127b/airpurifier.jpg"
            alt="product title"
          />
        </div>
        {/* product image */}
        {/* product description */}
        <div className="productDescription">
          <div className="titleModel">
            <h6>model</h6>
            <h5>name</h5>
          </div>
          <span className="productPrice">Price: 4552</span>
        </div>
        {/* product description */}
        {/* product action buttons */}
        <div className="productActions">
          <button onClick={() => setIsOpen(true)} className="btn">
            Update
          </button>

          <button
            onClick={handleDelete}
            className="btn"
            style={{ backgroundColor: "red" }}
          >
            Delete
          </button>
        </div>
        {/* product action buttons */}
        {/* product update popup form */}
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          width={"50%"}
          height={"75%"}
        >
          <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
            Update Product
          </h3>
          <div id="updateProductForm">
            <form className="">
              <div className="formElementFlex">
                {/* form element */}
                <div className="productFormElement">
                  <label htmlFor="productName">
                    Product Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    required
                    placeholder="Enter product name"
                  />
                </div>
                {/* form element */}
                <div className="productFormElement">
                  <label htmlFor="productPrice">
                    Product Price <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="productPrice"
                    required
                    placeholder="Enter product price"
                  />
                </div>
              </div>
              {/* form element */}
              <div className="formElementFlex">
                <div className="productFormElement">
                  <label htmlFor="productModel">
                    Product Model <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="productModel"
                    required
                    placeholder="Enter product model"
                  />
                </div>
                {/* product category dropdown */}
                <div className="productFormElement">
                  <label htmlFor="productCategory">
                    Product Category<span style={{ color: "red" }}>*</span>
                  </label>
                  <select name="productCategory" required>
                    <option value="">Select a Category</option>
                    <option value="rice-cooker">Rice Cooker</option>
                    <option value="curry-cooker">Curry Cooker</option>
                    <option value="blender">Blender</option>
                    <option value="electric-kettle">Electric Kettle</option>
                    <option value="hand-blender">Hand Blender</option>
                    <option value="fan">Fan</option>
                    <option value="induction-cooker">Induction Cooker</option>
                    <option value="iron">Iron</option>
                    <option value="electric-oven">Electric Oven</option>
                    <option value="vacuum-cleaner">Vacuum Cleaner</option>
                    <option value="electric-pressure-cooker">
                      Electric Pressure Cooker
                    </option>
                    <option value="coffee-maker">Coffee Maker</option>
                    <option value="roti-maker">Roti Maker</option>
                    <option value="water-heater">Water Heater</option>
                    <option value="room-heater">Room Heater</option>
                    <option value="mini-ac">Mini AC</option>
                    <option value="air-fryer">Air Fryer</option>
                    <option value="toaster">Toaster</option>
                    <option value="egg-beater">Egg Beater</option>
                    <option value="air-purifier">Air Purifier</option>
                    <option value="water-filter">Water Filter</option>
                    <option value="mobile-phone">Mobile Phone</option>
                  </select>
                </div>
                {/* product category dropdown */}
              </div>
              {/* form element */}
              <div className="formElementFlex">
                <div className="productFormElement">
                  <label htmlFor="productImage">
                    Product Model <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    name="productImage"
                    onChange={(e) => {
                      const url = e.target.files[0];
                      const objURL = URL.createObjectURL(url);
                      setImgPreview(objURL);
                    }}
                    required
                  />
                </div>
                {/* product warranty dropdown */}
                <div className="productFormElement">
                  <label htmlFor="productWarranty">
                    Product Warranty <span style={{ color: "red" }}>*</span>
                  </label>
                  <select name="productWarranty" required>
                    <option value="">Select an warranty</option>
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                  </select>
                </div>
                {/* product warranty dropdown */}
              </div>
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="productDescription">
                  Product Description <span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  name="productDescription"
                  required
                  placeholder="Enter product description"
                ></textarea>
              </div>
              {/* form element */}
              <div className="productFormElement">
                <button className="btn">Update Product</button>
              </div>
            </form>
          </div>
        </Popup>
        {/* product update popup form */}
      </div>
    </div>
    // view product card
  );
};

export default ViewProductCard;
