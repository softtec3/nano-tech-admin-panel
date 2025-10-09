import React, { useState } from "react";
import "./productManagement.css";
import { FaXmark } from "react-icons/fa6";
import ProductManagementTable from "./ProductManagementTable";
// these are dummy data. These should come from database
const shops = ["SHOP-1", "SHOP-2", "SHOP-3"];
const Allproducts = [
  {
    id: 1,
    productName: "Rice Cooker",
    category: "riceCooker",
    available: ["ID-1", "ID-2", "ID-3"],
  },
  {
    id: 2,
    productName: "Curry Cooker",
    category: "curryCooker",
    available: ["ID-4", "ID-5", "ID-6"],
  },
];

const ProductManagement = () => {
  const [availableIds, setAvailableIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [products, setProducts] = useState(Allproducts);
  const [isShow, setIsShow] = useState(false);

  const handleAvailableIds = (e) => {
    const value = e.target.value.split(",")[0];
    const selectedProduct = products.find((pro) => pro.id == value);
    setSelectedIds([]);
    if (selectedProduct) {
      setAvailableIds([...selectedProduct.available]);
    } else {
      alert("Not available");
    }
  };
  const handleSelectedIds = (id) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
      setProductQuantity((prev) => prev + 1);
    } else {
      alert("Already Selected");
    }
  };
  const handleSelectedIdsRemove = (id) => {
    const filteredSelectedIds = selectedIds.filter((sid) => sid !== id);
    setProductQuantity((prev) => prev - 1);
    setSelectedIds(filteredSelectedIds);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const details = { ...data, selectedIds };
    console.log(details);
  };
  const handleCategoryProduct = (e) => {
    const category = e.target.value;
    const filteredProducts = Allproducts.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
  };
  return (
    <section id="productManagement">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Product Management</h2>
        <button
          onClick={() => {
            setIsShow(true);
          }}
          className="btn"
        >
          Assign Product
        </button>
      </div>
      {/* assign product form */}
      <div
        id="warehouseContainerModal"
        style={{ display: `${isShow ? "flex" : "none"}` }}
      >
        <main>
          <form onSubmit={handleSubmit}>
            <span onClick={() => setIsShow(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Assign Product</h3>
            <div className="formElement">
              <label htmlFor="shopId">
                Shop ID <span style={{ color: "red" }}>*</span>
              </label>
              <select name="shopId" required>
                <option value="" style={{ display: "none" }}>
                  Select a shop
                </option>
                {shops?.map((shop, index) => (
                  <option key={index} value={shop}>
                    {shop}
                  </option>
                ))}
              </select>
            </div>
            <div className="formElement">
              <label htmlFor="product">
                Category <span style={{ color: "red" }}>*</span>
              </label>
              <select onChange={handleCategoryProduct} name="category" required>
                <option value="" style={{ display: "none" }}>
                  Select Product Category
                </option>
                {/* These categories should fetch from database */}
                <option value="riceCooker">Rice Cooker</option>
                <option value="curryCooker">Blender</option>
              </select>
            </div>
            <div className="formElement">
              <label htmlFor="product">
                Product <span style={{ color: "red" }}>*</span>
              </label>
              <select onChange={handleAvailableIds} name="product" required>
                <option value="" style={{ display: "none" }}>
                  Select a product
                </option>
                {products?.map((product) => (
                  <option
                    key={product?.id}
                    value={`${product?.id},${product?.productName}`}
                  >
                    {product?.productName}
                  </option>
                ))}
              </select>
            </div>

            {availableIds?.length > 0 && (
              <div className="formElement">
                <label htmlFor="mainCategory">Available</label>
                <div className="proIdsContainer">
                  {availableIds?.map((id, index) => (
                    <span
                      onClick={() => handleSelectedIds(id)}
                      key={index}
                      className="proIdsStyle"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedIds?.length > 0 && (
              <div className="formElement">
                <label htmlFor="mainCategory">Selected </label>
                <div className="proIdsContainer">
                  {selectedIds?.map((id, index) => (
                    <div
                      onClick={() => handleSelectedIdsRemove(id)}
                      key={index}
                      className="proIdsStyle"
                    >
                      <span> {id}</span>

                      <FaXmark style={{ color: "orange" }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="formElement">
              <label htmlFor="productQuantity">
                Product Quantity <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="number"
                value={productQuantity}
                readOnly
                onChange={(e) => setProductQuantity(e.target.value)}
                name="productQuantity"
                placeholder="Enter Product Quantity"
              />
            </div>
            <div className="formElement">
              <button type="submit" className="btn">
                Assign
              </button>
            </div>
          </form>
        </main>
      </div>

      <ProductManagementTable />
    </section>
  );
};

export default ProductManagement;
