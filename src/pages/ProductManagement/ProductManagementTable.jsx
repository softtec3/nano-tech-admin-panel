import React, { useState } from "react";
import TableTr from "./TableTr";

const ProductManagementTable = ({
  productsSummary = [],
  setProductsSummary,
  getProductsSummary,
}) => {
  // handle search functionality
  const staticSp = [...productsSummary];
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setProductsSummary(
      staticSp.filter((pro) => pro?.sales_point_id == searchQuery)
    );
  };
  return (
    // sales point section
    <section id="salesPoint">
      <h2>Sales Points</h2>
      <div className="salesPointContainer">
        {/* top section */}
        <div className="salesPointTop">
          <div>
            <form onSubmit={handleSearch}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Enter Shop ID"
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

          {/* <div className="flex" style={{ gap: "10px" }}>
            <div>
              <b>Shop: </b>
            </div>
            <div>
              <b>Address: </b>
            </div>
          </div> */}
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
                <th>Remaining Quantity</th>
                <th>Product Ids</th>
                <th>Assign Date</th>
              </tr>
            </thead>
            <tbody>
              {productsSummary &&
                productsSummary?.length > 0 &&
                productsSummary?.map((summary) => {
                  return <TableTr key={summary?.id} summary={summary} />;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductManagementTable;
