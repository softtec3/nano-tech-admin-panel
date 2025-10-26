import React, { useEffect, useState } from "react";
import "./lowStockAlert.css";

const LowStockAlert = () => {
  const [productsSummary, setProductsSummary] = useState([]);
  const [staticProductsSummary, setStaticProductSummary] = useState([]);
  // handle search functionality
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setProductsSummary(
      staticProductsSummary.filter((pro) => pro?.sales_point_id == searchQuery)
    );
  };

  // products summary function
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
            setStaticProductSummary(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  // get products summary of sales points
  useEffect(() => {
    getProductsSummary();
  }, []);
  return (
    // sales point section
    <section id="salesPoint">
      <h2>Low Stock Alert</h2>
      <div className="salesPointContainer">
        {/* top section */}
        <div className="salesPointTop">
          <div>
            <form onSubmit={handleSearch}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Enter SP ID"
              />
              <button type="submit">Search</button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  getProductsSummary();
                }}
                style={{ backgroundColor: "red", marginLeft: "5px" }}
              >
                Reset
              </button>
            </form>
          </div>
        </div>
        <div id="salesPointTableContainer">
          <table>
            <thead>
              <tr>
                <th>SP ID</th>
                <th>SP Name</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Assign Quantity</th>
                <th>Sold Quantity</th>
                <th>Remaining Quantity</th>
                <th>Assign Date</th>
              </tr>
            </thead>
            <tbody>
              {productsSummary &&
                productsSummary?.length > 0 &&
                productsSummary?.map((summary) => {
                  return (
                    <tr
                      key={summary?.id}
                      style={{
                        backgroundColor: `${
                          summary?.current_quantity <= 5 && "red"
                        }`,
                      }}
                    >
                      <td>{summary?.sales_point_id}</td>
                      <td>{summary?.sales_point_name}</td>
                      <td>{summary?.product_id}</td>
                      <td>{summary?.product_name}</td>
                      <td>{summary?.assign_products_quantity}</td>
                      <td>
                        {summary?.assign_products_quantity -
                          summary?.current_quantity}
                      </td>
                      <td>{summary?.current_quantity}</td>
                      <td>{summary?.assign_date}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LowStockAlert;
