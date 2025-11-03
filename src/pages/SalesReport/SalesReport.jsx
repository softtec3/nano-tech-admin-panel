import React, { useEffect, useState } from "react";
import "./salesReport.css";
const SalesReport = () => {
  // handle search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPoint, setSalesPoint] = useState([]);
  const [staticSalesPoint, setStaticSalesPoint] = useState([]);
  // const [shopData, setShopData] = useState({ shopName: "", shopLocation: "" });
  const [totalSales, setTotalSales] = useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    const filteredProducts = staticSalesPoint.filter(
      (point) => point.sales_point_id == searchQuery
    );
    setSalesPoint(filteredProducts);
  };
  useEffect(() => {
    // salesPoint.forEach((data) =>
    //   setShopData({ shopName: data.shopName, shopLocation: data.shopLocation })
    // );
    const totalSalesPrice = salesPoint.reduce((sum, item) => {
      console.log(item);
      return sum + item.payable_amount;
    }, 0);
    setTotalSales(totalSalesPrice);
  }, [salesPoint]);
  // filter
  const handleFilter = (e) => {
    const value = e.target.value;
    switch (value) {
      case "this_week":
        console.log("week");
        break;
      case "this_month":
        console.log("month");
        break;
      case "this_Year":
        console.log("year");
        break;
      default:
        console.log("all");
    }
  };
  // fetching sales points order
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_sales_points_orders.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSalesPoint(data?.data);
            setStaticSalesPoint(data?.data);
          } else {
            console.log(data?.message);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  console.log(salesPoint);
  return (
    // sales point section
    <section id="salesPoint">
      <h2>Sales Point</h2>
      <div className="salesPointContainer">
        {/* top section */}
        <div className="salesPointTop">
          <div>
            <form onSubmit={handleSearch}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Enter sales point id"
              />
              <button type="submit">Search</button>
              <button
                onClick={() => {
                  setSalesPoint(staticSalesPoint);
                }}
                type="button"
                style={{ backgroundColor: "red", marginLeft: "5px" }}
              >
                Reset
              </button>
            </form>
          </div>
          {/* {shopData && (
            <div className="flex" style={{ gap: "10px" }}>
              <div>
                <b>Shop: </b>
                {shopData.shopName}
              </div>
              <div>
                <b>Address: </b>
                {shopData.shopLocation}
              </div>
            </div>
          )} */}
        </div>
        {/* sales points report table */}
        <div className="salesPointSummary">
          <h4>Total Sales: {totalSales} TK</h4>
          <select onChange={handleFilter} name="filter">
            <option value="all">Filter (All)</option>
            <option value="this_week">This week</option>
            <option value="this_month">This month</option>
            <option value="this_Year">This Year</option>
          </select>
        </div>
        <div id="salesPointTableContainer">
          <table>
            <thead>
              <tr>
                <th>SP ID</th>
                <th>SP Name</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Discount</th>
                <th>Sold Price</th>
                <th>Payment Type</th>
                <th>Sold Date</th>
              </tr>
            </thead>
            <tbody>
              {salesPoint &&
                salesPoint.length > 0 &&
                salesPoint?.map((point) => (
                  <tr key={point?.id}>
                    <td>{point?.sales_point_id}</td>
                    <td>{point?.sales_point_name}</td>
                    <td>{point?.product_id}</td>
                    <td>{point?.product_name}</td>
                    <td>{point?.price} TK</td>
                    <td>{point?.discount_amount} TK</td>
                    <td>{point?.payable_amount} TK</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {point?.payment_type}
                    </td>
                    <td>{point?.created_at}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SalesReport;
