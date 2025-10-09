import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
const CommentTable = ({ commentsData = [], postTitle }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  return (
    <div className="singlePostCommentTable">
      <h3>{postTitle}</h3>
      {/* comments table */}
      <div id="salesPointTableContainer">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Id</th>
              <th>Comment</th>
              <th>Comment Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commentsData?.slice(startIndex, endIndex).map((comment, index) => (
              <tr key={index}>
                <td>{comment.serial}</td>
                <td>{comment.name}</td>
                <td>{comment.id}</td>
                <td>{comment.comment} </td>
                <td>{comment.time}</td>
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
          <tfoot>
            <tr>
              <td colSpan={6} className="tableNextPrevButton">
                <button
                  disabled={startIndex <= 0}
                  onClick={() => {
                    setStartIndex((prev) => prev - 10);
                    setEndIndex((prev) => prev - 10);
                  }}
                  className="btn"
                >
                  Prev
                </button>
                <button
                  disabled={endIndex > commentsData.length}
                  onClick={() => {
                    setStartIndex((prev) => prev + 10);
                    setEndIndex((prev) => prev + 10);
                  }}
                  className="btn"
                >
                  Next
                </button>
              </td>
            </tr>
          </tfoot>
        </table>{" "}
      </div>
    </div>
  );
};

export default CommentTable;
