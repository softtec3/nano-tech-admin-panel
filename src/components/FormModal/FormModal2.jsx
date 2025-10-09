import React from "react";
import "../../pages/SalesRepresentativeFormDownload/salesRepresentativeFormDownload.css";
import "../FormModal/formMOdal.css";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const FormModal2 = ({ submittedData = [], closeModal }) => {
  const date = new Date().toLocaleString().split(",")[0];
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
  const formatAddress = (data) => {
    return data?.split("|")[1];
  };
  console.log(ability);
  return (
    <div>
      <div id="formModal">
        <div>
          <FaXmark
            onClick={() => closeModal()}
            style={{ cursor: "pointer" }}
            size={22}
          />
        </div>
        <div id="salesRepresentativeFormDownload" className="sr-bg">
          <div>
            <div className="srfd-header">
              <h3>Nano-Tech Production Technology</h3>
              <p>বিক্রয় প্রতিনিধি আবেদন ফর্ম</p>
            </div>
            <div className="srfd-container">
              <div className="dateApplication">
                <div>তারিখঃ {date}</div>
                <div>আবেদন নংঃ 101</div>
              </div>
              <div className="marginTop borabor">
                <p>বরাবর,</p>
                <p>ব্যবস্থাপনা পরিচালক</p>
                <p>ন্যানো-টেক প্রোডাকশন টেকনোলজি</p>
                <p>যশোর, বাংলাদেশ</p>
                <p className="marginTop">
                  বিষয়ঃ এলাকা ভিত্তিক বিক্রয় প্রতিনিধি প্রাপ্তি প্রসঙ্গে ।
                </p>
                <div className="marginTop">
                  <p>জনাব,</p>
                  <p>
                    আপনার সদয় অবগতির জন্য নিম্নে আমার ব্যক্তিগত ও ব্যবসায়িক
                    তথ্যদি প্রদান করিলাম ।
                  </p>
                </div>
                <div className="marginTop" style={{ marginTop: "20px" }}>
                  <p style={{ fontWeight: "bold" }}>➢ আবেদনকারীর তথ্যঃ</p>
                  <table>
                    <tbody>
                      <tr>
                        <th>নামঃ</th>
                        <td>{applicantName} </td>
                        <th>এন আই ডি নংঃ</th>
                        <td>{applicantNid}</td>
                      </tr>
                      <tr>
                        <th>পিতাঃ</th>
                        <td>{applicantFatherName}</td>
                        <th>এন আই ডি নংঃ</th>
                        <td>{applicantFatherNid}</td>
                      </tr>
                      <tr>
                        <th>মোবাইলঃ</th>
                        <td>{applicantMobile} </td>
                        <th>হোয়াটসঅ্যাপঃ</th>
                        <td>{applicantWhatsapp}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="marginTop" style={{ marginTop: "20px" }}>
                  <p style={{ fontWeight: "bold" }}>
                    ➢ বিক্রয় প্রতিনিধি হতে ইচ্ছুকঃ
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          বিক্রয় প্রতিনিধি নেওয়ার জন্য ১০ X ১০ ফুটের দোকান আছে?
                        </th>
                        <td style={{ textAlign: "center" }}>
                          হ্যাঁ {ability === "yes" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          না {ability === "no" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          ভাড়া {ability === "lease" && <>✔️</>}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          নিজস্ব {ability === "own" && <>✔️</>}
                        </td>
                      </tr>
                      <tr>
                        <td>গ্রাম/বাজারের নামঃ</td>
                        <td colSpan={8}>{applicantVillage}</td>
                      </tr>
                      <tr>
                        <td>ওয়ার্ড নংঃ</td>
                        <td>{applicantWord}</td>
                        <td>ইউনিয়নঃ</td>
                        <td colSpan={6}>{formatAddress(applicantUnion)}</td>
                      </tr>
                      <tr>
                        <td>উপজেলাঃ</td>
                        <td>{formatAddress(applicantUpazilla)}</td>
                        <td>জেলাঃ</td>
                        <td colSpan={6}>{formatAddress(applicantDistrict)}</td>
                      </tr>
                      <tr>
                        <td>বিভাগঃ</td>
                        <td>{formatAddress(applicantDivision)}</td>
                        <td colSpan={8}>{applicantCountry}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="marginTop" style={{ marginTop: "20px" }}>
                  <p style={{ fontWeight: "bold" }}>
                    ➢ ইউনিয়ন প্রতিনিধির তথ্যঃ
                  </p>
                  <table>
                    <tbody>
                      <tr>
                        <td>প্রতিনিধির নামঃ</td>
                        <td colSpan={3}>{RepresentativeName}</td>
                      </tr>
                      <tr>
                        <td>প্রতিনিধির আইডিঃ</td>
                        <td>{RepresentativeId}</td>
                        <td>মোবাইলঃ</td>
                        <td>{RepresentativeMobile}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="marginTop" style={{ paddingTop: "40px" }}>
                  আমি এই মর্মে অঙ্গীকার করছি যে, উপরিক্ত সকল তথ্য সঠিক ভাবে
                  প্রদান পূর্বক কোম্পানির সকল শর্তাদি মেনে নিয়ে কমপক্ষে তিন
                  বছরের জন্য কোম্পানির সাথে লিখিত চুক্তিতে আবদ্ধ হয়ে, .........
                  থেকে বিক্রয় প্রতিনিধি নিতে আগ্রহী ।
                </p>
                <p className="marginTop" style={{ marginTop: "20px" }}>
                  অতএব, সংশ্লিষ্ট কর্তৃপক্ষের নিকট আবেদন এই যে, উপরিক্ত তথ্যদি
                  বিবেচনা পূর্বক আমাকে কোম্পানির বিক্রয় প্রতিনিধি হিসেবে মনোনয়ন
                  দিতে আপনার একান্ত মর্জি হয় ।
                </p>
                <br />
                <p className="marginTop" style={{ marginTop: "20px" }}>
                  ................................
                  <br /> আবেদনকারীর স্বাক্ষর
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal2;
