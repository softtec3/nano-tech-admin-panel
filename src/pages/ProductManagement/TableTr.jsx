import React, { useEffect, useState } from "react";

const TableTr = ({ summary = {} }) => {
  const [productIds, setProductIds] = useState([]);
  //   get product ids
  useEffect(() => {
    try {
      fetch(
        `${
          import.meta.env.VITE_API
        }/all_products_ids_by_sales_point.php?product_id=${
          summary?.product_id
        }&sales_point_id=${summary?.sales_point_id}`,
        { credentials: "include" }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setProductIds(data?.data);
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [summary]);
  return (
    <tr
      key={summary?.id}
      // style={{
      //   backgroundColor: `${
      //     summary?.current_quantity <= 5 && "red"
      //   }`,
      // }}
    >
      <td>{summary?.sales_point_id}</td>
      <td>{summary?.sales_point_name}</td>
      <td>{summary?.product_id}</td>
      <td>{summary?.product_name}</td>
      <td>{summary?.assign_products_quantity}</td>
      <td>{summary?.current_quantity}</td>
      <td>
        <select name="product_ids" id="">
          {productIds &&
            productIds.length > 0 &&
            productIds?.map((id) => (
              <option
                key={id?.assign_id}
              >{`${id?.assign_id} - ${id?.status}`}</option>
            ))}
        </select>
      </td>
      <td>{summary?.assign_date}</td>
    </tr>
  );
};

export default TableTr;
