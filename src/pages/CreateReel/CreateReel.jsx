import React, { useState } from "react";
import "./createReel.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const reelsData = [
  {
    serial: 1,
    reelTitle: "Morning Motivation",
    reelDescription: "Start your day with positive vibes and energy.",
    timeDate: "2025-08-20 07:30am",
  },
  {
    serial: 2,
    reelTitle: "Quick Workout",
    reelDescription: "A 5-minute workout to stay fit and active.",
    timeDate: "2025-08-19 06:45am",
  },
  {
    serial: 3,
    reelTitle: "Travel Vlog: Paris",
    reelDescription: "Exploring the beautiful streets of Paris in 60 seconds.",
    timeDate: "2025-08-18 08:00pm",
  },
  {
    serial: 4,
    reelTitle: "Cooking Tips",
    reelDescription: "How to make a quick and delicious breakfast.",
    timeDate: "2025-08-17 09:15am",
  },
  {
    serial: 5,
    reelTitle: "Photography Tricks",
    reelDescription: "Improve your mobile photography with these simple tips.",
    timeDate: "2025-08-16 05:45pm",
  },
  {
    serial: 6,
    reelTitle: "Tech Gadget Review",
    reelDescription: "A quick review of the latest smartphone features.",
    timeDate: "2025-08-15 03:30pm",
  },
  {
    serial: 7,
    reelTitle: "Mindfulness Minute",
    reelDescription: "Relax and meditate for one minute.",
    timeDate: "2025-08-14 07:00am",
  },
  {
    serial: 8,
    reelTitle: "DIY Home Decor",
    reelDescription: "Creative ideas to decorate your room easily.",
    timeDate: "2025-08-13 04:20pm",
  },
  {
    serial: 9,
    reelTitle: "Funny Cat Videos",
    reelDescription: "A compilation of hilarious cat moments.",
    timeDate: "2025-08-12 09:00pm",
  },
  {
    serial: 10,
    reelTitle: "Motivational Quote",
    reelDescription: "Daily dose of motivation in a short reel.",
    timeDate: "2025-08-11 08:30am",
  },
  {
    serial: 11,
    reelTitle: "Yoga for Beginners",
    reelDescription: "Simple yoga stretches for beginners.",
    timeDate: "2025-08-10 06:00am",
  },
  {
    serial: 12,
    reelTitle: "Street Food Tour",
    reelDescription: "Tasting delicious street food around the city.",
    timeDate: "2025-08-09 07:50pm",
  },
  {
    serial: 13,
    reelTitle: "Life Hack: Organization",
    reelDescription: "Quick tips to keep your desk organized.",
    timeDate: "2025-08-08 10:10am",
  },
  {
    serial: 14,
    reelTitle: "Dance Challenge",
    reelDescription: "Try this trending 30-second dance challenge.",
    timeDate: "2025-08-07 05:25pm",
  },
  {
    serial: 15,
    reelTitle: "Nature Timelapse",
    reelDescription: "A beautiful timelapse of sunset and clouds.",
    timeDate: "2025-08-06 06:40pm",
  },
];

const CreateReel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState({});
  const [isShow, setIsShow] = useState(false);

  return (
    <section id="postContainer">
      <div
        id="warehouseContainerModal"
        style={{ display: `${isShow ? "flex" : "none"}` }}
      >
        <main>
          <form>
            <span onClick={() => setIsShow(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Upload a Reel</h3>
            <div class="formElement">
              <label for="reelFile">
                Upload File <span style={{ color: "red" }}>*</span>
              </label>
              <input required type="file" name="reelFile" />
            </div>
            <div class="formElement">
              <label for="reelDescription">
                Reel Description <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                style={{ height: "150px", resize: "none" }}
                required
                type="text"
                name="reelDescription"
                placeholder="Enter reel description"
              ></textarea>
            </div>

            <div class="formElement">
              <button className="btn">Upload Reel</button>
            </div>
          </form>
        </main>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            setIsShow(true);
          }}
          className="btn"
        >
          Create Reel
        </button>
      </div>
      <div id="salesPointTableContainer">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Description</th>
              <th>Date-Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reelsData?.map((reel) => (
              <tr key={reel.serial}>
                <td>{reel.serial}</td>
                <td>
                  {reel.reelDescription.slice(0, 50)}{" "}
                  <span
                    onClick={() => {
                      setSelectedReel(reel);
                      setIsOpen(true);
                    }}
                    style={{
                      color: "#228b22",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Full media
                  </span>
                </td>
                <td>{reel.timeDate}</td>
                <td className="actionButtons">
                  <span className="commentUpdateIcon" title="Update">
                    <FaEdit size={18} />
                  </span>
                  <span className="commentDeleteIcon" title="Delete">
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* post popup */}

      <div
        className={`postPopup transform-scale ${
          isOpen && "transform-scale-off"
        } `}
      >
        <div className="po">
          <div className="postPopup-top">
            <div>
              <p>{selectedReel.timeDate}</p>
            </div>

            <span
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
            >
              <FaXmark size={20} />
            </span>
          </div>
          <p>{selectedReel.reelDescription}</p>
          {/* images */}
          <div className="postMedia">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/B3mIOg1p5AQ?si=rybyZyirxfKd-YCj"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateReel;
