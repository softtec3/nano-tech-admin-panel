import React, { useRef, useState } from "react";
import "./productQrCode.css";
import { useReactToPrint } from "react-to-print";
const ProductQrCode = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [prefix, setPrefix] = useState("");
  const [qrCodes, setQRcodes] = useState([]);
  const generateCodes = () => {
    const codes = [];
    console.log("hello");
    for (let i = 1; i <= 10; i++) {
      codes.push(`${prefix}-${Math.floor(10000 + Math.random() * 90000)}`);
    }
    setQRcodes(codes);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(qrCodes);
  return (
    <section id="productQrCode">
      <div className="">
        <main style={{ marginTop: "-100px" }}>
          <form onSubmit={handleSubmit}>
            <h3>Generate Code</h3>
            <div className="formElement">
              <label htmlFor="productName">
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                required
                type="text"
                name="productName"
                placeholder="Enter Product Name"
              />
            </div>
            <div className="flexx">
              <div className="formElement">
                <label htmlFor="mainCategory">
                  Main Category <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="mainCategory"
                  placeholder="Enter Main Category"
                />
              </div>
              <div className="formElement">
                <label htmlFor="subCategory">
                  Sub Category <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="text"
                  name="subCategory"
                  placeholder="Enter Sub Category"
                />
              </div>
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
              <button onClick={generateCodes} className="btn">
                Generate
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
