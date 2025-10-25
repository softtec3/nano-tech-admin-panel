import React, { useEffect, useRef, useState } from "react";
import "./productQrCode.css";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { getFormData } from "../../utils/getFormData";
const ProductQrCode = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [allProducts, setAllProducts] = useState([]);
  const [prefix, setPrefix] = useState("");
  const [qrCodes, setQRcodes] = useState([]);
  const generateCodes = () => {
    if (!prefix.trim().length > 0) {
      toast.error("Please add prefix first");
      return;
    }
    const codes = [];
    for (let i = 1; i <= 10; i++) {
      codes.push(
        `${prefix.trim()}-${Math.floor(10000 + Math.random() * 90000)}`
      );
    }
    setQRcodes(codes);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prefix.trim().length > 0) {
      toast.error("Please add prefix first");
      return;
    }
    if (qrCodes?.length == 0) {
      toast.error("Please generate codes first");
      return;
    }
    const formData = getFormData(e.target);
    const product_id = formData.product_id;
    const barcodes = qrCodes;
    try {
      fetch(`${import.meta.env.VITE_API}/create_barcodes.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id, barcodes: barcodes }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    } finally {
      e.target.reset();
    }
  };
  // get all products
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/all_products.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setAllProducts(data?.data);
        } else {
          console.log(data?.message);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section id="productQrCode">
      <div className="">
        <main style={{ marginTop: "-100px" }}>
          <form onSubmit={handleSubmit}>
            <h3>Generate Code</h3>
            <div className="formElement">
              <label htmlFor="product_id">
                Select Product <span style={{ color: "red" }}>*</span>
              </label>
              <select name="product_id" id="" required>
                <option value="" style={{ display: "none" }}>
                  --Select Product--
                </option>
                {allProducts &&
                  allProducts?.length > 0 &&
                  allProducts?.map((product) => (
                    <option key={product?.id} value={product?.id}>
                      {product?.id} - {product?.product_name_en}
                    </option>
                  ))}
              </select>
            </div>

            <div className="formElement">
              <label htmlFor="qrPrefix">
                Prefix <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                onChange={(e) => setPrefix(e.target.value)}
                type="text"
                name="qrPrefix"
                placeholder="Enter QR Prefix"
              />
            </div>

            <div className="formElement">
              <button type="button" onClick={generateCodes} className="btn">
                Generate
              </button>
              <button
                // disabled={qrCodes.length == 0}
                type="submit"
                className="btn"
              >
                Submit
              </button>
            </div>
          </form>
          {/* qr code table */}
          {qrCodes?.length > 0 && (
            <div className="qrCodesTable">
              <div ref={contentRef} className="contentRef">
                {qrCodes?.map((code, index) => (
                  <p key={index}>{code}</p>
                ))}
              </div>
              <button onClick={reactToPrintFn} className="btn">
                Download
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default ProductQrCode;
