import React, { useEffect, useState } from "react";
import "./categories.css";
import { getFormData } from "../../utils/getFormData";
import { toast } from "react-toastify";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  // creating category
  const handleCreateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("category_en") || !formData.get("category_bn")) {
      toast.error("All fields are required");
      return;
    }

    try {
      fetch(`${import.meta.env.VITE_API}/create_category.php`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getAllCategories();
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

  //   get all categories
  const getAllCategories = () => {
    // if need bangla category then all_categories.php?lang=bn
    try {
      fetch(`${import.meta.env.VITE_API}/all_categories.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setCategories(data.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    }
  };
  //   Creating sub categories
  const handleCreateSubCategory = (e) => {
    e.preventDefault();
    const formdata = getFormData(e.target);
    if (
      formdata.mainCategory == "" ||
      formdata.subcategory_bn == "" ||
      formdata.subcategory_en == ""
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      fetch(`${import.meta.env.VITE_API}/create_sub_category.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error("Failed! check console");
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    } finally {
      e.target.reset();
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div id="categories">
      <div id="category">
        <form onSubmit={handleCreateCategory} encType="multipart/form-data">
          <h4 style={{ textAlign: "center" }}>Create Category</h4>
          <div className="formElement">
            <label htmlFor="category_image">
              Category Image <span style={{ color: "red" }}>*</span>
            </label>
            <input type="file" name="category_image" required />
          </div>
          <div className="formElement">
            <label htmlFor="category_name_en">
              Category Name (English) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="category_en"
              placeholder="Enter category english name"
              required
            />
          </div>
          <div className="formElement">
            <label htmlFor="category_name_bn">
              Category Name (Bangla) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="category_bn"
              placeholder="Enter category bangla name"
              required
            />
          </div>
          <div className="formElement">
            <button type="submit" className="btn">
              Create Category
            </button>
          </div>
        </form>
      </div>
      <div id="subCategories">
        <form onSubmit={handleCreateSubCategory}>
          <h4 style={{ textAlign: "center" }}>Create Sub Category</h4>
          <div className="formElement">
            <label htmlFor="sub-category_name_en">
              Select main category
              <span style={{ color: "red" }}>*</span>
            </label>
            <select name="mainCategory" id="" required>
              <option value="" style={{ display: "none" }}>
                Select main category
              </option>
              {categories &&
                categories?.length > 0 &&
                categories.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.category_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="formElement">
            <label htmlFor="sub-category_name_en">
              Sub Category Name (English){" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="subcategory_en"
              placeholder="Enter sub category english name"
              required
            />
          </div>
          <div className="formElement">
            <label htmlFor="category_name_bn">
              Category Name (Bangla) <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="subcategory_bn"
              placeholder="Enter sub category bangla name"
              required
            />
          </div>
          <div className="formElement">
            <button type="submit" className="btn">
              Create Sub Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories;
