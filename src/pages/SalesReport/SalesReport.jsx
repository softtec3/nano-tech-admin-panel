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
  const [salesPoint, setSalesPoint] = useState(salesData);
  const [shopData, setShopData] = useState({ shopName: "", shopLocation: "" });
  const [totalSales, setTotalSales] = useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    setSalesPoint(salesData.filter((data) => data.sellerId === searchQuery));
  };
  useEffect(() => {
    salesPoint.forEach((data) =>
      setShopData({ shopName: data.shopName, shopLocation: data.shopLocation })
    );
    const totalSalesPrice = salesPoint.reduce((sum, item) => {
      console.log(item);
      return sum + item.soldPrice;
    }, 0);
    setTotalSales(totalSalesPrice);
  }, [salesPoint]);
  console.log(salesPoint);
  console.log(shopData);
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
                placeholder="Enter Shop ID"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          {shopData && (
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
          )}
        </div>
        {/* sales points report table */}
        <div className="salesPointSummary">
          <h4>Total Sales: {totalSales}TK</h4>
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
                <th>Seller ID</th>
                <th>Shop Name</th>
                <th>Sold Date</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {salesPoint?.map((point, index) => (
                <tr key={index}>
                  <td>{point?.sellerId}</td>
                  <td>{point?.shopName}</td>
                  <td>{point?.soldDate}</td>
                  <td>{point?.productName}</td>
                  <td>{point?.productPrice}TK</td>
                  <td>{point?.soldPrice}Tk</td>
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
