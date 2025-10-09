import React, { useEffect, useState } from "react";
import "./lowStockAlert.css";
// this is dummy data. Its should be fetched from database
const lowStockData = [
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    productName: "Wireless Mouse",
    providedQty: 100,
    soldQty: 92,
    remainingQty: 8,
  },
  {
    sellerId: "S001",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    productName: "Mechanical Keyboard",
    providedQty: 50,
    soldQty: 45,
    remainingQty: 5,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    productName: "Electric Kettle",
    providedQty: 60,
    soldQty: 52,
    remainingQty: 8,
  },
  {
    sellerId: "S002",
    shopName: "Home Essentials",
    shopLocation: "Chittagong",
    productName: "Rice Cooker",
    providedQty: 70,
    soldQty: 65,
    remainingQty: 5,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    productName: "Leather Wallet",
    providedQty: 80,
    soldQty: 75,
    remainingQty: 5,
  },
  {
    sellerId: "S003",
    shopName: "Fashion Hub",
    shopLocation: "Sylhet",
    productName: "Sneakers",
    providedQty: 40,
    soldQty: 37,
    remainingQty: 3,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    productName: "Smartwatch",
    providedQty: 60,
    soldQty: 59,
    remainingQty: 1,
  },
  {
    sellerId: "S004",
    shopName: "Gadget Arena",
    shopLocation: "Rajshahi",
    productName: "Bluetooth Speaker",
    providedQty: 30,
    soldQty: 28,
    remainingQty: 2,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    productName: "Non-stick Pan",
    providedQty: 40,
    soldQty: 36,
    remainingQty: 4,
  },
  {
    sellerId: "S005",
    shopName: "Kitchen King",
    shopLocation: "Khulna",
    productName: "Pressure Cooker",
    providedQty: 25,
    soldQty: 22,
    remainingQty: 3,
  },
];

const LowStockAlert = () => {
  // handle search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPoint, setSalesPoint] = useState(lowStockData);
  const [shopData, setShopData] = useState({ shopName: "", shopLocation: "" });
  const handleSearch = (e) => {
    e.preventDefault();
    setSalesPoint(lowStockData.filter((data) => data.sellerId === searchQuery));
  };
  useEffect(() => {
    salesPoint.forEach((data) =>
      setShopData({ shopName: data.shopName, shopLocation: data.shopLocation })
    );
  }, [salesPoint]);

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
        <div id="salesPointTableContainer">
          <table>
            <thead>
              <tr>
                <th>Seller ID</th>
                <th>Shop Name</th>
                <th>Product Name</th>
                <th>Provided Quantity</th>
                <th>Sold Quantity</th>
                <th>Remaining Quantity</th>
              </tr>
            </thead>
            <tbody>
              {salesPoint?.map((point, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: `${point.remainingQty <= 5 && "red"}`,
                  }}
                >
                  <td>{point?.sellerId}</td>
                  <td>{point?.shopName}</td>
                  <td>{point?.productName}</td>
                  <td>{point?.providedQty}</td>
                  <td>{point?.soldQty}</td>
                  <td>{point?.remainingQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LowStockAlert;
