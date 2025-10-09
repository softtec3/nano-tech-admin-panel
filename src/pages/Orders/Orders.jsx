import React, { useState } from "react";
import "./orders.css";
// these should fetched form database
const AllOrders = [
  {
    name: "John Doe",
    phone: "01710000001",
    location: "Dhaka",
    product: "Rice Cooker",
    quantity: 2,
    price: 3500,
    status: "Pending",
  },
  {
    name: "Jane Smith",
    phone: "01820000002",
    location: "Chittagong",
    product: "Blender",
    quantity: 1,
    price: 2200,
    status: "Delivered",
  },
  {
    name: "Rahim Uddin",
    phone: "01930000003",
    location: "Sylhet",
    product: "Microwave Oven",
    quantity: 1,
    price: 12000,
    status: "Shipped",
  },
  {
    name: "Fatema Begum",
    phone: "01640000004",
    location: "Khulna",
    product: "Washing Machine",
    quantity: 1,
    price: 28000,
    status: "Processing",
  },
  {
    name: "Karim Hossain",
    phone: "01550000005",
    location: "Rajshahi",
    product: "Refrigerator",
    quantity: 1,
    price: 42000,
    status: "Pending",
  },
  {
    name: "Sadia Akter",
    phone: "01760000006",
    location: "Barisal",
    product: "Air Conditioner",
    quantity: 1,
    price: 55000,
    status: "Delivered",
  },
  {
    name: "Tanvir Hasan",
    phone: "01870000007",
    location: "Rangpur",
    product: "Electric Kettle",
    quantity: 3,
    price: 4500,
    status: "Cancelled",
  },
  {
    name: "Nusrat Jahan",
    phone: "01980000008",
    location: "Mymensingh",
    product: "Ceiling Fan",
    quantity: 4,
    price: 8000,
    status: "Processing",
  },
  {
    name: "Imran Khan",
    phone: "01690000009",
    location: "Dhaka",
    product: "Gas Stove",
    quantity: 2,
    price: 7000,
    status: "Delivered",
  },
  {
    name: "Mitu Rahman",
    phone: "01510000010",
    location: "Chittagong",
    product: "LED TV",
    quantity: 1,
    price: 35000,
    status: "Shipped",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(AllOrders);
  const handleFilter = (e) => {
    const filter = e.target.value;
    setOrders(
      AllOrders.filter((order) => order.status.toLowerCase() === filter)
    );
  };
  return (
    <section>
      <div className="ordersTop">
        <h2>Orders</h2>
        <select onChange={handleFilter} name="filterBy">
          <option value="" style={{ display: "none" }}>
            Filter By
          </option>
          <option value="pending">Pending</option>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
          <option value="shipped">Shipped</option>
        </select>
      </div>
      {/* Orders table */}
      <div id="salesPointTableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>{order.location}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>
                  <select
                    name="status"
                    defaultValue={order.status.toLowerCase()}
                    style={{ textAlign: "center" }}
                  >
                    <option value="" style={{ display: "none" }}>
                      Status
                    </option>
                    <option value="pending">Pending</option>
                    <option value="approve">Approve</option>
                    <option value="reject">Reject</option>
                    <option value="shipped">Shipped</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
