import React from "react";
import "./button.css";
import { Link } from "react-router";

const Button = ({ text, link }) => {
  return (
    <>
      {/* button component */}
      {link ? (
        <Link to={link}>
          <button className="btn">{text}</button>
        </Link>
      ) : (
        <button className="btn">{text}</button>
      )}
    </>
  );
};

export default Button;
