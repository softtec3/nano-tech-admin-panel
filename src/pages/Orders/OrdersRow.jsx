import React, { useEffect, useState } from "react";

const OrdersRow = ({ order = {} }) => {
  const [orderDetails, setOrderDetails] = useState([]);

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
  console.log(order);
  console.log(orderDetails);
  return (
    <tr>
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
      <td>
        <select defaultValue={order?.order_status}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
    </tr>
  );
};

export default OrdersRow;
