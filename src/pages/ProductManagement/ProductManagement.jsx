import React, { useEffect, useState } from "react";
import "./productManagement.css";
import { FaXmark } from "react-icons/fa6";
import ProductManagementTable from "./ProductManagementTable";
import { toast } from "react-toastify";

const ProductManagement = () => {
  const [availableIds, setAvailableIds] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [salesPoints, setSalesPoints] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [productsSummary, setProductsSummary] = useState([]);
  const handleAvailableIds = (e) => {
    const value = parseInt(e.target.value.split("+")[0]);

    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_products_barcodes_by_id.php?product_id=${value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            const barcodeArray = data?.data.map((d) => d?.barcode);
            setAvailableIds(barcodeArray);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error?.message));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectedIds = (id) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
      setProductQuantity((prev) => prev + 1);
    } else {
      toast.error("Already Selected");
    }
  };
  const handleSelectedIdsRemove = (id) => {
    const filteredSelectedIds = selectedIds.filter((sid) => sid !== id);
    setProductQuantity((prev) => prev - 1);
    setSelectedIds(filteredSelectedIds);
  };
  // handle assign product
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const product_id = data.product.split("+")[0];
    const product_name = data.product.split("+")[1];
    const sales_point_id = data.sales_point.split("+")[0];
    const sales_point_name = data.sales_point.split("+")[1];
    const assign_product_quantity = selectedIds.length;
    const current_quantity = selectedIds.length;
    const final = {
      product_id,
      product_name,
      sales_point_id,
      sales_point_name,
      assign_product_quantity,
      current_quantity,
      selectedIds,
    };
    console.log(final);
    if (selectedIds.length == 0) {
      toast.error("Please select ids");
      return;
    }
    try {
      fetch(`${import.meta.env.VITE_API}/assign_products_to_sales_point.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(final),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      e.target.reset();
      setIsShow(false);
      setAvailableIds([]);
      setSelectedIds([]);
    }
  };
  const handleCategoryProduct = (e) => {
    setAvailableIds([]);
    setSelectedIds([]);
    const category = parseInt(e.target.value);
    const filteredProducts = allproducts.filter(
      (product) => product.product_category_id === category
    );
    setFilterProducts(filteredProducts);
  };

  // get all shops/sales-points
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_sales_points.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSalesPoints(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // get all categories
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_categories.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setCategories(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // get all products
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_products.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllProducts(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // get products summary
  const getProductsSummary = () => {
    try {
      fetch(
        `${import.meta.env.VITE_API}/all_sales_points_products_summary.php`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setProductsSummary(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProductsSummary();
  }, []);
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
              <label htmlFor="sales_point">
                Select Sales Point <span style={{ color: "red" }}>*</span>
              </label>
              <select name="sales_point" required>
                <option value="" style={{ display: "none" }}>
                  Select a sales point
                </option>
                {salesPoints &&
                  salesPoints?.length > 0 &&
                  salesPoints?.map((point) => (
                    <option
                      key={point?.id}
                      value={`${point?.id}+${point?.name}`}
                    >
                      {point?.name}
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
                {categories &&
                  categories?.length > 0 &&
                  categories.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.category_name}
                    </option>
                  ))}

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
                {filterProducts &&
                  filterProducts?.length > 0 &&
                  filterProducts?.map((product) => (
                    <option
                      key={product?.id}
                      value={`${product?.id}+${product?.product_name_en}`}
                    >
                      {product?.product_name_en}
                    </option>
                  ))}
              </select>
            </div>

            {availableIds?.length > 0 ? (
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
            ) : (
              "Ids not found"
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

      <ProductManagementTable
        productsSummary={productsSummary}
        setProductsSummary={setProductsSummary}
        getProductsSummary={getProductsSummary}
      />
    </section>
  );
};

export default ProductManagement;
