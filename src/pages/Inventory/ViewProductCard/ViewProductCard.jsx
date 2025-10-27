import React, { useEffect, useState } from "react";
import "./viewProductCard.css";
import Swal from "sweetalert2";
import Popup from "../../../components/Popup/Popup";
import { toast } from "react-toastify";
const ViewProductCard = ({ product, handleDelete, getAllProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [regularPrice, setRegularPrice] = useState(product?.regular_price);
  const [currentPrice, setCurrentPrice] = useState(product?.current_price);
  const [discount, setDiscount] = useState(product?.discount);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setSubCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseLocation, setWarehouseLocation] = useState(
    product?.warehouse_address
  );
  const [allSections, setAllSections] = useState([]);
  const [allSubsections, setAllSubsections] = useState([]);
  const [productSpecifications, setProductSpecification] = useState([]);
  // Update product
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      fetch(
        `${import.meta.env.VITE_API}/update_product.php?product_id=${
          product?.id
        }`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            toast.success(data?.message);
            getAllProducts();
            setIsOpen(false);
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
  // get all specifications
  useEffect(() => {
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/product_specification_by_id.php?product_id=${product?.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setProductSpecification(data?.data);
          }
          {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [product?.id]);

  return (
    // view product card
    <div>
      <div className="productCard">
        {/* product image */}
        <div className="card-image">
          <img
            src={`${import.meta.env.VITE_API}/${product["product_main_img"]}`}
            alt="product title"
          />
        </div>
        {/* product image */}
        {/* product description */}
        <div className="productDescription">
          <div className="titleModel">
            <h6>{product["product_model"] ?? ""}</h6>
            <h5>{product["product_name_en"] ?? ""}</h5>
          </div>
          <span className="productPrice">
            Price: {product["current_price"] ?? ""}
          </span>
        </div>
        {/* product description */}
        {/* product action buttons */}
        <div className="productActions">
          <button onClick={() => setIsOpen(true)} className="btn">
            Update
          </button>

          <button
            onClick={() => {
              handleDelete(product["id"]);
            }}
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
                      Product English Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="product_name_en"
                      defaultValue={product?.product_name_en ?? ""}
                      required
                      placeholder="Enter product english name"
                    />
                  </div>
                  {/* form element */}
                  <div className="productFormElement">
                    <label htmlFor="product_name_bn">
                      Product Bangla Name{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="product_name_bn"
                      defaultValue={product?.product_name_bn ?? ""}
                      required
                      placeholder="Enter product bangla name"
                    />
                  </div>
                </div>
                <div className="formElementFlex">
                  {/* form element */}
                  <div className="productFormElement">
                    <label htmlFor="regular_price">
                      Product Regular Price{" "}
                      <span style={{ color: "red" }}>*</span>
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
                      defaultValue={product?.discount ?? 0}
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
                    <label htmlFor="delivery_charge">
                      Delivery Charge <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="delivery_charge"
                      defaultValue={product?.delivery_charge ?? 0}
                      required
                      placeholder="Enter delivery charge"
                    />
                  </div>
                </div>
                <div className="productFormElement">
                  <label htmlFor="product_model">
                    Product Model <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="product_model"
                    defaultValue={product?.product_model ?? ""}
                    required
                    placeholder="Enter product model"
                  />
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
                    >
                      <option value="" style={{ display: "none" }}>
                        Select category
                      </option>
                      {allCategories &&
                        allCategories?.length > 0 &&
                        allCategories.map((category) => {
                          return (
                            <option
                              key={category?.id}
                              value={`${category?.id}+${category?.category_name}`}
                            >
                              {category?.category_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="productFormElement">
                    <label htmlFor="product_sub_category">
                      Product Sub Category{" "}
                      <span style={{ color: "red" }}>*</span>
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
                      Warehouse Sub Section{" "}
                      <span style={{ color: "red" }}>*</span>
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
                      defaultValue={product?.product_quantity ?? 1}
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
                      <option
                        value="1"
                        selected={product?.product_warranty == "1" && true}
                      >
                        1 year
                      </option>
                      <option
                        value="2"
                        selected={product?.product_warranty == "2" && true}
                      >
                        2 years
                      </option>
                      <option
                        value="3"
                        selected={product?.product_warranty == "3" && true}
                      >
                        3 years
                      </option>
                      <option
                        value="4"
                        selected={product?.product_warranty == "4" && true}
                      >
                        4 years
                      </option>
                      <option
                        value="5"
                        selected={product?.product_warranty == "5" && true}
                      >
                        5 years
                      </option>
                      <option
                        value="12"
                        selected={product?.product_warranty == "12" && true}
                      >
                        12 years
                      </option>
                    </select>
                  </div>
                </div>
                <div className="formElementFlex">
                  {/* form element */}
                  <div className="productFormElement">
                    <label htmlFor="product_main_img">
                      Product Main Image <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="file"
                      name="product_main_img"
                      required={product?.product_main_img ? false : true}
                    />
                    <input
                      type="hidden"
                      name="pro_main_img"
                      value={product?.product_main_img ?? ""}
                    />
                  </div>
                </div>
                <div className="formElementFlex">
                  {/* form element */}
                  <div className="productFormElement">
                    <label htmlFor="product_img_one">
                      Product Other Image 1
                    </label>
                    <input type="file" name="product_img_one" />
                    <input
                      type="hidden"
                      name="pro_img_one"
                      value={product?.product_img_one ?? ""}
                    />
                  </div>
                  <div className="productFormElement">
                    <label htmlFor="product_img_two">
                      Product Other Image 2
                    </label>
                    <input type="file" name="product_img_two" />
                    <input
                      type="hidden"
                      name="pro_img_two"
                      value={product?.product_img_two ?? ""}
                    />
                  </div>
                </div>
                <div className="formElementFlex">
                  {/* form element */}
                  <div className="productFormElement">
                    <label htmlFor="product_img_three">
                      Product Other Image 3
                    </label>
                    <input type="file" name="product_img_three" />
                    <input
                      type="hidden"
                      name="pro_img_three"
                      value={product?.product_img_three ?? ""}
                    />
                  </div>
                  <div className="productFormElement">
                    <label htmlFor="product_img_four">
                      Product Other Image 4
                    </label>
                    <input type="file" name="product_img_four" />
                    <input
                      type="hidden"
                      name="pro_img_four"
                      value={product?.product_img_four ?? ""}
                    />
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
                    defaultValue={product?.product_description_en ?? ""}
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
                    defaultValue={product?.product_description_bn ?? ""}
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
                </div>
                {/* main container for specification */}
                {productSpecifications &&
                  productSpecifications?.length > 0 &&
                  productSpecifications.map((spec) => {
                    return (
                      <div key={spec?.id}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div className="formElementFlex">
                            <input
                              type="hidden"
                              name="spec_id[]"
                              defaultValue={spec?.id ?? 0}
                            />
                            <div className="productFormElement">
                              <label htmlFor="sp_name_en">
                                Specification English Name
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="sp_name_en[]"
                                defaultValue={spec?.specification_name_en ?? ""}
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
                                defaultValue={
                                  spec?.specification_description_en ?? ""
                                }
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
                                defaultValue={spec?.specification_name_bn ?? ""}
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
                                defaultValue={
                                  spec?.specification_description_bn ?? ""
                                }
                                required
                                placeholder="Enter product specification bangla description"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                <div className="productFormElement">
                  <button type="submit" className="btn">
                    Update Product
                  </button>
                </div>
              </form>
              {/* add product form */}
            </div>
          </div>
        </Popup>
        {/* product update popup form */}
      </div>
    </div>
    // view product card
  );
};

export default ViewProductCard;
