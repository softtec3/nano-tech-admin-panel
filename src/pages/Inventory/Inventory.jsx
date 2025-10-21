import React, { useEffect, useState } from "react";
import "./inventory.css";
import ViewProductCard from "./ViewProductCard/ViewProductCard";
import { useOutletContext } from "react-router";
import AddProducts from "./AddProducts/AddProducts";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const Inventory = () => {
  const { active, setActive } = useOutletContext();
  const [allProducts, setAllProducts] = useState([]);
  // delete product
  const handleDelete = (id) => {
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
        try {
          fetch(
            `${
              import.meta.env.VITE_API
            }/delete_product_by_id.php?delete_id=${id}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data?.success) {
                Swal.fire({
                  title: `Deleted id-> ${id}`,
                  text: "Product has been deleted.",
                  icon: "success",
                });
                // after delete update existing list
                const lastProducts = [...allProducts].filter(
                  (product) => product.id != id
                );
                setAllProducts(lastProducts);
              } else {
                toast.error(data?.message);
              }
            })
            .catch((error) => console.log(error.message));
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };
  // get all products
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_products.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setAllProducts(data?.data);
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
          {allProducts &&
            allProducts?.length > 0 &&
            allProducts.map((product) => (
              <ViewProductCard
                key={product?.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
        </div>
        {/* view products list */}
      </div>
      {/* inventory main section- changeable */}
    </div>
    // inventory page
  );
};

export default Inventory;
