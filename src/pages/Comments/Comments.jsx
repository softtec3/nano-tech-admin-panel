import React from "react";
import "./comments.css";
import CommentTable from "./CommentTable";

const commentsData = [
  {
    serial: 1,
    name: "Tahmid Alam",
    id: "AB-8973",
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    time: "12/12/2025 at 12:12pm",
  },
  {
    serial: 2,
    name: "John Doe",
    id: "AB-8974",
    comment: "Quisquam est qui dolorem ipsum quia dolor sit amet.",
    time: "12/12/2025 at 12:15pm",
  },
  {
    serial: 3,
    name: "Jane Smith",
    id: "AB-8975",
    comment: "Neque porro quisquam est qui dolorem ipsum.",
    time: "12/12/2025 at 12:20pm",
  },
  {
    serial: 4,
    name: "Alice Brown",
    id: "AB-8976",
    comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    time: "12/12/2025 at 12:25pm",
  },
  {
    serial: 5,
    name: "Bob Johnson",
    id: "AB-8977",
    comment: "At vero eos et accusamus et iusto odio dignissimos ducimus.",
    time: "12/12/2025 at 12:30pm",
  },
  {
    serial: 6,
    name: "Charlie Lee",
    id: "AB-8978",
    comment: "Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    time: "12/12/2025 at 12:35pm",
  },
  {
    serial: 7,
    name: "Diana Green",
    id: "AB-8979",
    comment: "On the other hand, we denounce with righteous indignation.",
    time: "12/12/2025 at 12:40pm",
  },
  {
    serial: 8,
    name: "Evan White",
    id: "AB-8980",
    comment:
      "But I must explain to you how all this mistaken idea of denouncing.",
    time: "12/12/2025 at 12:45pm",
  },
  {
    serial: 9,
    name: "Fiona Black",
    id: "AB-8981",
    comment:
      "Nor again is there anyone who loves or pursues or desires to obtain.",
    time: "12/12/2025 at 12:50pm",
  },
  {
    serial: 10,
    name: "George King",
    id: "AB-8982",
    comment:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    time: "12/12/2025 at 12:55pm",
  },
  {
    serial: 11,
    name: "Hannah Scott",
    id: "AB-8983",
    comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    time: "12/12/2025 at 1:00pm",
  },
  {
    serial: 12,
    name: "Ian Miller",
    id: "AB-8984",
    comment: "Mollit anim id est laborum.",
    time: "12/12/2025 at 1:05pm",
  },
  {
    serial: 13,
    name: "Julia Adams",
    id: "AB-8985",
    comment: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    time: "12/12/2025 at 1:10pm",
  },
  {
    serial: 14,
    name: "Kevin Turner",
    id: "AB-8986",
    comment: "Ut labore et dolore magna aliqua.",
    time: "12/12/2025 at 1:15pm",
  },
  {
    serial: 15,
    name: "Laura Hill",
    id: "AB-8987",
    comment: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    time: "12/12/2025 at 1:20pm",
  },
];

const Comments = () => {
  return (
    // All Comments
    <div className="allComments">
      {/* single post comments */}
      <CommentTable
        commentsData={commentsData}
        postTitle="Welcome to nano-tech"
      />
      <CommentTable
        commentsData={commentsData}
        postTitle="Welcome to nano-tech 2"
      />
    </div>
  );
};

export default Comments;
