import React, { useEffect, useState } from "react";
import "./addProducts.css";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
const AddProducts = ({ setActive }) => {
  const [regularPrice, setRegularPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setSubCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [allSections, setAllSections] = useState([]);
  const [allSubsections, setAllSubsections] = useState([]);

  // add product
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      fetch(`${import.meta.env.VITE_API}/add_product.php`, {
        method: "POST",
        body: form,
        credentials: "include",
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
    }
  };
  // handle sub categories
  const handleSubCategories = (e) => {
    const value = e.target.value;
    const catId = value.split("-")[0].trim();
    // const catName = value.split("-")[1].trim();
    try {
      setSubCategories([]);
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_sub_categories_by_category.php?category_id=${catId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSubCategories(data.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  // handle sections
  const handleSections = (e) => {
    const value = e.target.value;
    const warehouseId = value.split("+")[0].trim();
    try {
      setAllSections([]);
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_sections_by_id.php?warehouse_id=${warehouseId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllSections(data.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  // handle sub sections
  const handleSubSections = (e) => {
    const value = e.target.value;
    const sectionId = value.split("+")[0].trim();
    try {
      setAllSubsections([]);
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_sub_sections_by_id.php?section_id=${sectionId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllSubsections(data.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  // warehouse location
  const handleWarehouseLocation = (e) => {
    const value = e.target.value;
    const location = value.split("+")[2].trim() ?? "";
    setWarehouseLocation(location);
    handleSections(e);
  };
  //
  const handleSpecificationDiv = () => {
    document.getElementById(
      "mainSpecificationContainer"
    ).innerHTML += `              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 10px; margin-top:10px;"
                
              >
                <div class="formElementFlex">
                  <div class="productFormElement">
                    <label htmlFor="sp_name_en">
                      Specification English Name
                      <span style="color: red;">*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_name_en[]"
                      required
                      placeholder="Enter product specification english name"
                    />
                  </div>

                  <div class="productFormElement">
                    <label htmlFor="sp_desc_en">
                      Specification English Description
                      <span style="color: red;">*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_desc_en[]"
                      required
                      placeholder="Enter product specification english description"
                    />
                  </div>
                </div>
                <div class="formElementFlex">
                  <div class="productFormElement">
                    <label htmlFor="sp_name_bn">
                      Specification Bangla Name
                      <span style="color: red;">*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_name_bn[]"
                      required
                      placeholder="Enter product specification bangla name"
                    />
                  </div>

                  <div class="productFormElement">
                    <label htmlFor="sp_desc_bn">
                      Specification Bangla Description
                      <span style="color: red;">*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_desc_bn[]"
                      required
                      placeholder="Enter product specification bangla description"
                    />
                  </div>
                </div>
              </div>`;
  };
  // product categories
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_categories.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllCategories(data.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_warehouses.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setWarehouses(data.data);
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
    // add product modal
    <div
      onClick={() => setActive("viewProducts")}
      className="addProductFormPopUp"
    >
      <div id="addProduct" onClick={(e) => e.stopPropagation()}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => setActive("viewProducts")}
        >
          <FaXmark size={20} />
        </span>
        {/* title */}
        <h3>Add A New Product</h3>
        <div>
          {/* add product form */}
          <form
            onSubmit={handleSubmit}
            className="addProductForm"
            encType="multipart/formdata"
          >
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_name_en">
                  Product English Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="product_name_en"
                  required
                  placeholder="Enter product english name"
                />
              </div>
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_name_bn">
                  Product Bangla Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="product_name_bn"
                  required
                  placeholder="Enter product bangla name"
                />
              </div>
            </div>
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="regular_price">
                  Product Regular Price <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="regular_price"
                  value={regularPrice}
                  onChange={(e) => {
                    setRegularPrice(e.target.value);
                    setCurrentPrice(e.target.value - discount);
                  }}
                  required
                  placeholder="Enter product regular price"
                />
              </div>
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="discount">
                  Discount % <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="discount"
                  onChange={(e) => {
                    const discount = (regularPrice * e.target.value) / 100;
                    setDiscount(discount);
                    setCurrentPrice(regularPrice - discount);
                  }}
                  required
                  placeholder="Enter product regular price"
                  min={0}
                />
              </div>
            </div>
            <div className="formElementFlex">
              <div className="productFormElement">
                <label htmlFor="current_price">
                  Current Price <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="current_price"
                  value={currentPrice}
                  readOnly
                  placeholder="Enter product regular price"
                  min={0}
                />
              </div>
              <div className="productFormElement">
                <label htmlFor="product_model">
                  Product Model <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="product_model"
                  required
                  placeholder="Enter product model"
                />
              </div>
            </div>
            <div className="formElementFlex">
              <div className="productFormElement">
                <label htmlFor="product_category">
                  Product Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  onChange={handleSubCategories}
                  required
                  name="product_category"
                  id=""
                >
                  <option value="" style={{ display: "none" }}>
                    Select category
                  </option>
                  {allCategories &&
                    allCategories?.length > 0 &&
                    allCategories.map((category) => (
                      <option
                        key={category?.id}
                        value={`${category?.id}+${category?.category_name}`}
                      >
                        {category?.category_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="productFormElement">
                <label htmlFor="product_sub_category">
                  Product Sub Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  required={allSubCategories?.length > 0 && true}
                  name="product_sub_category"
                  id=""
                >
                  <option value="" style={{ display: "none" }}>
                    Select category
                  </option>
                  {allSubCategories &&
                    allSubCategories?.length > 0 &&
                    allSubCategories.map((category) => (
                      <option
                        key={category?.id}
                        value={`${category?.id}+${category?.sub_category_name}`}
                      >
                        {category?.sub_category_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="formElementFlex">
              <div className="productFormElement">
                <label htmlFor="warehouse_name">
                  Warehouse Name <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  onChange={handleWarehouseLocation}
                  required
                  name="warehouse_name"
                  id=""
                >
                  <option value="" style={{ display: "none" }}>
                    Select category
                  </option>
                  {warehouses &&
                    warehouses?.length > 0 &&
                    warehouses.map((warehouse) => (
                      <option
                        key={warehouse?.id}
                        value={`${warehouse?.id}+${warehouse?.warehouse_name}+${warehouse?.warehouse_location}`}
                      >
                        {warehouse?.warehouse_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="productFormElement">
                <label htmlFor="warehouse_location">
                  Warehouse location <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="warehouse_location"
                  value={warehouseLocation}
                  readOnly
                  placeholder="Select warehouse for location"
                />
              </div>
            </div>

            <div className="formElementFlex">
              <div className="productFormElement">
                <label htmlFor="warehouse_section">
                  Warehouse Section <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  onChange={handleSubSections}
                  required={allSections?.length > 0 && true}
                  name="warehouse_section"
                  id=""
                >
                  <option value="" style={{ display: "none" }}>
                    Select section
                  </option>
                  {allSections &&
                    allSections?.length > 0 &&
                    allSections.map((section) => (
                      <option
                        key={section?.id}
                        value={`${section?.id}+${section?.section_name}`}
                      >
                        {section?.section_name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="productFormElement">
                <label htmlFor="warehouse_sub_section">
                  Warehouse Sub Section <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  required={allSubsections?.length > 0 && true}
                  name="warehouse_sub_section"
                  id=""
                >
                  <option value="" style={{ display: "none" }}>
                    Select Sub Section
                  </option>
                  {allSubsections &&
                    allSubsections?.length > 0 &&
                    allSubsections.map((sub_section) => (
                      <option
                        key={sub_section?.id}
                        value={`${sub_section?.id}+${sub_section?.sub_section_name}`}
                      >
                        {sub_section?.sub_section_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_quantity">
                  Product Quantity <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="product_quantity"
                  min={1}
                  required
                  placeholder="Enter product quantity"
                />
              </div>
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_warranty">
                  Product Warranty <span style={{ color: "red" }}>*</span>
                </label>
                <select name="product_warranty" id="">
                  <option value="" style={{ display: "none" }}>
                    Select warranty
                  </option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="12">12 years</option>
                </select>
              </div>
            </div>
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_main_img">
                  Product Main Image <span style={{ color: "red" }}>*</span>
                </label>
                <input type="file" name="product_main_img" required />
              </div>
            </div>
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_img_one">Product Other Image 1</label>
                <input type="file" name="product_img_one" />
              </div>
              <div className="productFormElement">
                <label htmlFor="product_img_two">Product Other Image 2</label>
                <input type="file" name="product_img_two" />
              </div>
            </div>
            <div className="formElementFlex">
              {/* form element */}
              <div className="productFormElement">
                <label htmlFor="product_img_three">Product Other Image 3</label>
                <input type="file" name="product_img_three" />
              </div>
              <div className="productFormElement">
                <label htmlFor="product_img_four">Product Other Image 4</label>
                <input type="file" name="product_img_four" />
              </div>
            </div>
            {/* form element */}
            <div className="productFormElement">
              <label htmlFor="product_description_en">
                Product Description English
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="product_description_en"
                required
                placeholder="Enter product english description"
              ></textarea>
            </div>
            <div className="productFormElement">
              <label htmlFor="product_description_bn">
                Product Description Bangla
                <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                name="product_description_bn"
                required
                placeholder="Enter product bangla description"
              ></textarea>
            </div>
            {/* form element */}
            {/* product specification */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h3>Product Specification</h3>
              <button
                onClick={handleSpecificationDiv}
                type="button"
                className="btn"
              >
                Add more +
              </button>
            </div>
            {/* main container for specification */}
            <div id="mainSpecificationContainer">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div className="formElementFlex">
                  <div className="productFormElement">
                    <label htmlFor="sp_name_en">
                      Specification English Name{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_name_en[]"
                      required
                      placeholder="Enter product specification english name"
                    />
                  </div>

                  <div className="productFormElement">
                    <label htmlFor="sp_desc_en">
                      Specification English Description{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_desc_en[]"
                      required
                      placeholder="Enter product specification english description"
                    />
                  </div>
                </div>
                <div className="formElementFlex">
                  <div className="productFormElement">
                    <label htmlFor="sp_name_bn">
                      Specification Bangla Name{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_name_bn[]"
                      required
                      placeholder="Enter product specification bangla name"
                    />
                  </div>

                  <div className="productFormElement">
                    <label htmlFor="sp_desc_bn">
                      Specification Bangla Description
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="sp_desc_bn[]"
                      required
                      placeholder="Enter product specification bangla description"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="productFormElement">
              <button type="submit" className="btn">
                Add Product
              </button>
            </div>
          </form>
          {/* add product form */}
        </div>
      </div>
    </div>
    // add product modal
  );
};

export default AddProducts;
