import React, { useEffect, useState } from "react";
// this is dummy data. Its should be fetched from database

const assignProducts = [
  {
    shopId: "SHOP-1",
    shopName: "Tech World",
    shopLocation: "Dhaka",
    product: "ID-1, Rice Cooker",
    quantity: 5,
    productIds: ["ID-1", "ID-2", "ID-3"],
    assignDate: "12/12/2025",
  },
  {
    shopId: "SHOP-2",
    shopName: "Tech World 2",
    shopLocation: "Dhaka 2",
    product: "ID-1, Rice Cooker",
    quantity: 3,
    productIds: ["ID-4", "ID-5", "ID-6"],
    assignDate: "12/12/2025",
  },
  {
    shopId: "SHOP-2",
    shopName: "Tech World 2",
    shopLocation: "Dhaka 2",
    product: "ID-2, Curry Cooker",
    quantity: 3,
    productIds: ["ID-8", "ID-9", "ID-10"],
    assignDate: "12/12/2025",
  },
  {
    shopId: "SHOP-3",
    shopName: "Tech World 3",
    shopLocation: "Dhaka 3",
    product: "ID-1, Rice Cooker",
    quantity: 5,
    productIds: ["ID-7", "ID-8", "ID-9"],
    assignDate: "12/12/2025",
  },
];
const ProductManagementTable = () => {
  // handle search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [salesPoint, setSalesPoint] = useState(assignProducts);
  const [shopData, setShopData] = useState({ shopName: "", shopLocation: "" });
  const handleSearch = (e) => {
    e.preventDefault();
    setSalesPoint(assignProducts.filter((data) => data.shopId === searchQuery));
  };
  useEffect(() => {
    salesPoint.forEach((data) =>
      setShopData({ shopName: data.shopName, shopLocation: data.shopLocation })
    );
  }, [salesPoint]);

  return (
    // sales point section
    <section id="salesPoint">
      <h2>Shops</h2>
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
                <th>Shop ID</th>
                <th>Shop Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Ids</th>
                <th>Assign Date</th>
              </tr>
            </thead>
            <tbody>
              {salesPoint?.map((point, index) => {
                console.log(point?.productIds);
                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: `${point.remainingQty <= 5 && "red"}`,
                    }}
                  >
                    <td>{point?.shopId}</td>
                    <td>{point?.shopName}</td>
                    <td>{point?.product}</td>
                    <td>{point?.quantity}</td>
                    <td>{point?.productIds?.join(", ")}</td>
                    <td>{point?.assignDate}</td>
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

export default ProductManagementTable;
