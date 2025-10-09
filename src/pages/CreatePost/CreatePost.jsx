import React, { useState } from "react";
import "./createPost.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const postsData = [
  {
    serial: 1,
    title: "Introducing React 18",
    description:
      "React 18 comes with concurrent features and automatic batching.",
    dateTime: "2025-08-20 10:00am",
    status: "active",
  },
  {
    serial: 2,
    title: "Understanding Redux",
    description: "A beginner's guide to managing state using Redux.",
    dateTime: "2025-08-19 2:30pm",
    status: "inactive",
  },
  {
    serial: 3,
    title: "JavaScript ES2025 Features",
    description:
      "Learn about the latest JavaScript features and syntax improvements.",
    dateTime: "2025-08-18 11:15am",
    status: "active",
  },
  {
    serial: 4,
    title: "Tailwind CSS Tips",
    description:
      "Improve your UI design with Tailwind CSS utilities and best practices.",
    dateTime: "2025-08-17 5:45pm",
    status: "active",
  },
  {
    serial: 5,
    title: "Node.js Performance",
    description:
      "Optimize your Node.js applications for faster response times.",
    dateTime: "2025-08-16 9:00am",
    status: "inactive",
  },
  {
    serial: 6,
    title: "Async/Await in Depth",
    description:
      "Handle asynchronous code easily with async/await in JavaScript.",
    dateTime: "2025-08-15 3:20pm",
    status: "active",
  },
  {
    serial: 7,
    title: "Using MongoDB Aggregation",
    description: "Master aggregation pipelines for advanced MongoDB queries.",
    dateTime: "2025-08-14 12:00pm",
    status: "inactive",
  },
  {
    serial: 8,
    title: "React Router v6",
    description: "Learn routing in React applications with React Router v6.",
    dateTime: "2025-08-13 4:30pm",
    status: "active",
  },
  {
    serial: 9,
    title: "Express.js Middleware",
    description:
      "Build scalable APIs by understanding middleware in Express.js.",
    dateTime: "2025-08-12 1:10pm",
    status: "inactive",
  },
  {
    serial: 10,
    title: "Debugging JavaScript",
    description: "Tips and tools to debug JavaScript effectively.",
    dateTime: "2025-08-11 10:50am",
    status: "active",
  },
  {
    serial: 11,
    title: "CSS Grid vs Flexbox",
    description: "When to use CSS Grid and Flexbox for layout design.",
    dateTime: "2025-08-10 2:00pm",
    status: "active",
  },
  {
    serial: 12,
    title: "TypeScript Basics",
    description: "Get started with TypeScript for safer JavaScript code.",
    dateTime: "2025-08-09 11:45am",
    status: "inactive",
  },
  {
    serial: 13,
    title: "Next.js Routing",
    description: "Dynamic and static routes in Next.js explained.",
    dateTime: "2025-08-08 5:30pm",
    status: "active",
  },
  {
    serial: 14,
    title: "API Security Best Practices",
    description:
      "Protect your APIs using authentication, rate limiting, and more.",
    dateTime: "2025-08-07 9:10am",
    status: "inactive",
  },
  {
    serial: 15,
    title: "Building a MERN App",
    description:
      "Step-by-step guide to building a full-stack MERN application.",
    dateTime: "2025-08-06 3:45pm",
    status: "active",
  },
];

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [isShow, setIsShow] = useState(false);

  return (
    <div id="postContainer">
      <div
        id="warehouseContainerModal"
        style={{ display: `${isShow ? "flex" : "none"}` }}
      >
        <main>
          <form className="postForm">
            <span onClick={() => setIsShow(false)} className="cross">
              <FaXmark size={20} />
            </span>
            <h3>Create a post</h3>
            <div className="formElement">
              <label htmlFor="postTitle">Post Title</label>
              <input
                type="text"
                name="postTitle"
                placeholder="Enter Post title"
                required
              />
            </div>
            <div className="formElement">
              <label htmlFor="postFile">Post File</label>
              <input type="file" name="postFile" required />
            </div>
            <div className="formElement">
              <label htmlFor="postDescription">Post Description</label>
              <textarea
                style={{ height: "150px", resize: "none" }}
                type="text"
                name="postDescription"
                placeholder="Enter Post title"
                required
              ></textarea>
            </div>
            <div className="formElement">
              <button className="btn">Post</button>
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
          Create Post
        </button>
      </div>
      {/* posts table */}
      <div id="salesPointTableContainer">
        <table id="createPostTable">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date-Time</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {postsData?.map((post) => (
              <tr key={post.serial}>
                <td>{post.serial}</td>
                <td>{post.title}</td>
                <td>
                  {post.description.slice(0, 50)}{" "}
                  <span
                    onClick={() => {
                      setSelectedPost(post);
                      setIsOpen(true);
                    }}
                    style={{
                      color: "#228b22",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    Full view
                  </span>
                </td>
                <td>{post.dateTime}</td>
                <td className="actionButtons">
                  <span className="commentUpdateIcon" title="Update">
                    <FaEdit size={18} />
                  </span>
                  <span className="commentDeleteIcon" title="Delete">
                    <FaTrash />
                  </span>
                </td>
                <td
                  style={{
                    color: `${post?.status === "active" ? "green" : "red"}`,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {post.status}
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
              <h4>{selectedPost.title}</h4>
              <p>{selectedPost.dateTime}</p>
            </div>

            <span
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
            >
              <FaXmark size={20} />
            </span>
          </div>
          <p>{selectedPost.description}</p>
          {/* images */}
          <div className="postMedia">
            <Swiper
              modules={[Navigation]}
              // navigation
              loop={true}
              className="mySwiper"
            >
              {/* single images */}
              <SwiperSlide>
                <img
                  src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
