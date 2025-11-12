import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrdersRow = ({ order = {}, getAllOrders }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  // get order products details
  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_API}/get_order_customer_details.php?user_id=${
          order.user_id
        }&order_id=${order.id}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setOrderDetails(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error);
    }
  }, [order]);
  // handle order status
  const handleOrderStatus = (e) => {
    const status = e.target.value;
    const order_id = order.id;
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/update_order_status.php?order_id=${order_id}&status=${status}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getAllOrders();
          } else {
            toast.error("Something went wrong. Check console");
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <tr>
      <td>#{order?.id}</td>
      <td>{orderDetails?.user?.full_name}</td>
      <td>{orderDetails?.user?.mobile_number}</td>
      <td>
        {orderDetails?.user?.address}, {orderDetails?.user?.area},{" "}
        {orderDetails?.user?.landmark}
      </td>
      <td>
        <select name="products" id="">
          {orderDetails?.orders &&
            orderDetails?.orders.length > 0 &&
            orderDetails?.orders.map((order) => (
              <option key={order?.id}>
                {order?.product_id}- {order?.product_name} * {order?.quantity}
              </option>
            ))}
        </select>
      </td>
      <td>{order?.total_amount} TK</td>
      <td style={{ textTransform: "capitalize" }}>{order?.payment_method}</td>
      <td style={{ textTransform: "capitalize" }}>{order?.payment_status}</td>
      <td>
        <select onChange={handleOrderStatus} defaultValue={order?.order_status}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
      <td>{order?.created_at.split(" ").join(" | ")}</td>
      <td>{order?.updated_at.split(" ").join(" | ")}</td>
    </tr>
  );
};

export default OrdersRow;
