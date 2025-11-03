import React, { useEffect, useState } from "react";
import "./salesReport.css";
// this is dummy data. Its should be fetched from database
const salesData = [
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    soldDate: "2025-08-01",
    productName: "Wireless Mouse",
    productPrice: 12.5,
    soldPrice: 18.0,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    soldDate: "2025-08-02",
    productName: "Electric Kettle",
    productPrice: 20.0,
    soldPrice: 28.0,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    soldDate: "2025-08-03",
    productName: "Leather Wallet",
    productPrice: 8.0,
    soldPrice: 15.0,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    soldDate: "2025-08-04",
    productName: "Smartwatch",
    productPrice: 45.0,
    soldPrice: 65.0,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    soldDate: "2025-08-05",
    productName: "Non-stick Pan",
    productPrice: 15.0,
    soldPrice: 22.0,
  },
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    soldDate: "2025-07-29",
    productName: "Mechanical Keyboard",
    productPrice: 35.0,
    soldPrice: 50.0,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    soldDate: "2025-07-30",
    productName: "Rice Cooker",
    productPrice: 25.0,
    soldPrice: 35.0,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    soldDate: "2025-07-25",
    productName: "Sunglasses",
    productPrice: 5.0,
    soldPrice: 12.0,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    soldDate: "2025-06-18",
    productName: "Bluetooth Speaker",
    productPrice: 18.0,
    soldPrice: 30.0,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    soldDate: "2025-05-10",
    productName: "Pressure Cooker",
    productPrice: 28.0,
    soldPrice: 40.0,
  },
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    soldDate: "2025-04-15",
    productName: "Gaming Headset",
    productPrice: 30.0,
    soldPrice: 45.0,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    soldDate: "2025-03-21",
    productName: "Vacuum Cleaner",
    productPrice: 70.0,
    soldPrice: 95.0,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    soldDate: "2025-02-10",
    productName: "Leather Belt",
    productPrice: 10.0,
    soldPrice: 18.0,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    soldDate: "2025-01-05",
    productName: "Drone Camera",
    productPrice: 150.0,
    soldPrice: 200.0,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    soldDate: "2024-12-25",
    productName: "Microwave Oven",
    productPrice: 90.0,
    soldPrice: 120.0,
  },
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    soldDate: "2024-11-11",
    productName: "Smartphone",
    productPrice: 300.0,
    soldPrice: 380.0,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    soldDate: "2024-10-15",
    productName: "Water Purifier",
    productPrice: 55.0,
    soldPrice: 75.0,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    soldDate: "2024-09-09",
    productName: "Sneakers",
    productPrice: 22.0,
    soldPrice: 40.0,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    soldDate: "2024-08-02",
    productName: "Tablet",
    productPrice: 120.0,
    soldPrice: 160.0,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    soldDate: "2024-07-18",
    productName: "Blender",
    productPrice: 25.0,
    soldPrice: 38.0,
  },
];

const SalesReport = () => {
  // handle search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPoint, setSalesPoint] = useState([]);
  const [staticSalesPoint, setStaticSalesPoint] = useState([]);
  const [shopData, setShopData] = useState({ shopName: "", shopLocation: "" });
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
