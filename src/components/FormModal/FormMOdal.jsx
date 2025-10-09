import React from "react";
import "../../pages/SalesRepresentativeFormDownload/salesRepresentativeFormDownload.css";
import "./formModal.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaXmark } from "react-icons/fa6";
import productsImage from "../../../public/products.png";
const FormMOdal = ({ submittedData = [], closeModal }) => {
  const date = new Date().toLocaleString().split(",")[0].split("/");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  // destructure submitted data
  const {
    applicantName,
    applicantNid,
    applicantFatherName,
    applicantFatherNid,
    applicantMobile,
    applicantWhatsapp,
    ability,
    applicantVillage,
    applicantDivision,
    applicantCountry,
    applicantDistrict,
    applicantUpazilla,
    applicantUnion,
    applicantWord,
    RepresentativeName,
    RepresentativeId,
    RepresentativeMobile,
  } = submittedData;
  // address formatter function
  const formatAddress = (data) => {
    return data?.split("|")[1];
  };

  return (
    // form modal
    <div onClick={() => closeModal()} className="modal-container">
      <div className="xMark">
        <FaXmark onClick={() => closeModal()} size={20} />
      </div>
      <div id="formModal" onClick={(e) => e.stopPropagation()}>
        <div
          ref={contentRef}
          id="salesRepresentativeFormDownload"
          className="sr-bg formModalBorder"
        >
          <div>
            <div className="srfd-header">
              <h3>Nano-Tech Production Technology</h3>
              <div>
                <img
                  className="productsImage"
                  src={productsImage}
                  alt="products Image"
                />
              </div>
              <p className="tagline">বিক্রয় প্রতিনিধি আবেদন ফর্ম</p>
            </div>
            <div className="srfd-container">
              <div className="dateApplication">
                <div>
                  <div className="dateIdTable" style={{ width: "200px" }}>
                    <div>
                      <div className="dateDiv">
                        <span>তারিখঃ</span>
                        <span>{date[1]}</span>
                        <span>{date[0].padStart(2, 0)}</span>
                        <span>{date[2]}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="dateIdTable">
                    <div>
                      <div className="dateDiv">
                        <span>আবেদন নংঃ</span>
                        <span>101</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="borabor"
                style={{ fontSize: "11px", marginTop: "5px" }}
              >
                <p>বরাবর,</p>
                <p>ব্যবস্থাপনা পরিচালক</p>
                <p>ন্যানো-টেক প্রোডাকশন টেকনোলজি</p>
                <p>যশোর, বাংলাদেশ ।</p>
                <p>বিষয়ঃ এলাকা ভিত্তিক বিক্রয় প্রতিনিধি প্রাপ্তি প্রসঙ্গে ।</p>
                <div>
                  <p>জনাব,</p>
                  <p>
                    আপনার সদয় অবগতির জন্য নিম্নে আমার ব্যক্তিগত ও ব্যবসায়িক
                    তথ্যদি প্রদান করিলাম ।
                  </p>
                </div>
                <div
                  className="marginTop applicantInformation"
                  style={{ marginTop: "px" }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "11px",
                    }}
                  >
                    ➢ আবেদনকারীর তথ্যঃ
                  </p>
                  <table id="applicantDetailsTable">
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>নামঃ</td>
                        <td>{applicantName} </td>
                        <td style={{ fontWeight: "bold", width: "100px" }}>
                          এন আই ডি নংঃ
                        </td>
                        <td>{applicantNid}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>পিতাঃ</td>
                        <td>{applicantFatherName}</td>
                        <td style={{ fontWeight: "bold", width: "100px" }}>
                          এন আই ডি নংঃ
                        </td>
                        <td>{applicantFatherNid}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>মোবাইলঃ</td>
                        <td>{applicantMobile} </td>
                        <td style={{ fontWeight: "bold", width: "100px" }}>
                          হোয়াটসঅ্যাপঃ
                        </td>
                        <td>{applicantWhatsapp}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "px" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "11px",
                    }}
                  >
                    ➢ বিক্রয় প্রতিনিধি হতে ইচ্ছুকঃ
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          বিক্রয় প্রতিনিধি নেওয়ার জন্য ১০ X ১০ ফুটের দোকান আছে?
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {ability === "yes" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>হ্যাঁ</td>
                        <td style={{ textAlign: "center" }}>
                          {ability === "no" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>না</td>
                        <td style={{ textAlign: "center" }}>
                          {ability === "lease" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>ভাড়া</td>
                        <td style={{ textAlign: "center" }}>
                          {ability === "own" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>নিজস্ব</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr>
                        <td>গ্রাম/বাজারের নামঃ</td>
                        <td colSpan={8}>{applicantVillage}</td>
                      </tr>
                      <tr>
                        <td>ওয়ার্ড নংঃ</td>
                        <td>{applicantWord}</td>
                        <td style={{ width: "100px" }}>ইউনিয়নঃ</td>
                        <td colSpan={6}>{formatAddress(applicantUnion)}</td>
                      </tr>
                      <tr>
                        <td>উপজেলাঃ</td>
                        <td>{formatAddress(applicantUpazilla)}</td>
                        <td style={{ width: "100px" }}>জেলাঃ</td>
                        <td colSpan={6}>{formatAddress(applicantDistrict)}</td>
                      </tr>
                      <tr>
                        <td>বিভাগঃ</td>
                        <td>{formatAddress(applicantDivision)}</td>
                        <td colSpan={8} style={{ textAlign: "center" }}>
                          {applicantCountry}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: "px" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: "11px",
                    }}
                  >
                    ➢ ইউনিয়ন প্রতিনিধির তথ্যঃ
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: "100px" }}>প্রতিনিধির নামঃ</td>
                        <td colSpan={3}>{RepresentativeName}</td>
                      </tr>
                      <tr>
                        <td style={{ width: "100px" }}>প্রতিনিধির আইডিঃ</td>
                        <td>{RepresentativeId}</td>
                        <td style={{ width: "70px" }}>মোবাইলঃ</td>
                        <td>{RepresentativeMobile}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ paddingTop: "10px", fontSize: "11px" }}>
                  আমি এই মর্মে অঙ্গীকার করছি যে, উপরিক্ত সকল তথ্য সঠিক ভাবে
                  প্রদান পূর্বক কোম্পানির সকল শর্তাদি মেনে নিয়ে কমপক্ষে তিন
                  বছরের জন্য কোম্পানির সাথে লিখিত চুক্তিতে আবদ্ধ হয়ে,
                  .............................. থেকে বিক্রয় প্রতিনিধি নিতে
                  আগ্রহী ।
                </p>
                <p style={{ fontSize: "11px" }}>
                  অতএব, সংশ্লিষ্ট কর্তৃপক্ষের নিকট আবেদন এই যে, উপরিউক্ত তথ্যাদি
                  বিবেচনা পূর্বক আমাকে কোম্পানির বিক্রয় প্রতিনিধি হিসেবে মনোনয়ন
                  দিতে আপনার একান্ত মর্জি হয় ।
                </p>
                <br />
                <p style={{ fontSize: "11px" }}>
                  ................................
                  <br /> আবেদনকারীর স্বাক্ষর
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="modalBtn">
          <button onClick={reactToPrintFn} className="btn">
            প্রিন্ট করুন
          </button>
        </div>
      </div>
    </div>
    // form modal
  );
};

export default FormMOdal;
