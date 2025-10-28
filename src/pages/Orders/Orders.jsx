import React, { useEffect, useState } from "react";
import "./orders.css";
import OrdersRow from "./OrdersRow";
// these should fetched form database

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const handleFilter = (e) => {
    const filter = e.target.value;
    setOrders(
      allOrders.filter((order) => order.status.toLowerCase() === filter)
    );
  };
  // get orders function
  const getAllOrders = () => {
    try {
      fetch(`${import.meta.env.VITE_API}/all_orders.php`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setOrders(data?.data);
            setAllOrders(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error?.message));
    } catch (error) {
      console.log(error);
    }
  };
  // fetching all orders
  useEffect(() => {
    getAllOrders();
  }, []);
  console.log(orders);
  return (
    <section>
      <div className="ordersTop">
        <h2>Orders</h2>
        <select onChange={handleFilter} name="filterBy">
          <option value="" style={{ display: "none" }}>
            Filter By
          </option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="rejected">Rejected</option>
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
              <th>Product & Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <OrdersRow key={order?.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
