import React, { useEffect, useState } from "react";
import "./banner.css";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
const Banner = () => {
  const [isShow, setIsShow] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [banners, setBanners] = useState([]);
  // add banner
  const handleAddBanner = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      fetch(`${import.meta.env.VITE_API}/create_banner.php`, {
        method: "POST",
        credentials: "include",
        body: form,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getAllBanners();
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    } finally {
      e.target.reset();
      setIsShow(false);
      setImgUrl(null);
    }
  };
  // handle banner status update
  const handleBannerStatus = (status, id) => {
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/change_banner_status.php?status=${status}&banner_id=${id}`,
        {
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getAllBanners();
          } else {
            toast.error(data?.message);
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // get banners
  const getAllBanners = () => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_banners.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setBanners(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBanners();
  }, []);
  return (
    <div>
      <section id="warehouse">
        {/* warehouses and their products */}
        {/* Warehouse form container */}
        <div
          className="warehouseContainerModal"
          style={{ display: `${isShow ? "flex" : "none"}` }}
        >
          <main>
            <form onSubmit={handleAddBanner} encType="multipart/formdata">
              <span onClick={() => setIsShow(false)} className="cross">
                <FaXmark size={20} />
              </span>
              <h3>Add Banner</h3>
              <div className="formElement">
                <label htmlFor="banner_image">
                  Banner Image <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  onChange={(e) => {
                    const url = URL.createObjectURL(e.target.files[0]);
                    setImgUrl(url);
                  }}
                  type="file"
                  name="banner_image"
                  accept="image/*"
                />
              </div>
              {imgUrl && (
                <img
                  style={{
                    maxHeight: "200px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  id="bannerPreview"
                  src={imgUrl}
                  alt=""
                />
              )}

              {/* <div className="formElement">
                <label htmlFor="banner_link">
                  Banner Link <span style={{ color: "red" }}>*</span>
                </label>
                <input required type="text" name="banner_link" />
              </div> */}
              <div className="formElement">
                <label htmlFor="banner_section">
                  Banner Section <span style={{ color: "red" }}>*</span>
                </label>
                <select name="banner_section" id="" required>
                  <option value="" style={{ display: "none" }}>
                    Select section
                  </option>
                  <option value="main">Main</option>
                  <option value="rectangle_two">Rectangle Two</option>
                  <option value="grid">Grid</option>
                  <option value="rectangle_three">Rectangle Three</option>
                </select>
              </div>

              <div className="formElement">
                <button type="submit" className="btn">
                  Add Banner
                </button>
              </div>
            </form>
          </main>
        </div>

        <div className="warehouseContainer">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>All Banners</h2>
            {/* <select name="warehouse">
              <option value="" style={{ display: "none" }}>
                All Banners
              </option>
            </select> */}
          </div>
          <div className="warButtons">
            <button
              onClick={() => {
                setIsShow(true);
              }}
              className="btn"
            >
              Add Banner
            </button>
          </div>
        </div>
        {/* all warehouse product will here */}
        {/* table */}
        <div id="salesPointTableContainer">
          <table>
            <thead>
              <tr>
                <th>Banner Image</th>
                <th>Banner Section</th>
                {/* <th>Banner Link</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {banners &&
                banners?.length > 0 &&
                banners.map((banner) => {
                  return (
                    <tr key={banner?.id}>
                      <td>
                        <img
                          style={{
                            width: "150px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          src={`${import.meta.env.VITE_API}/${
                            banner?.banner_image
                          }`}
                          alt=""
                        />
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {banner?.banner_section}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {banner?.status}
                      </td>
                      <td>
                        {banner?.status == "active" ? (
                          <button
                            onClick={() => {
                              handleBannerStatus("inactive", banner?.id);
                            }}
                            className="btn-table"
                            style={{ backgroundColor: "red" }}
                          >
                            Inactive
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleBannerStatus("active", banner?.id);
                            }}
                            className="btn-table"
                            style={{ marginRight: "5px" }}
                          >
                            Active
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Banner;
