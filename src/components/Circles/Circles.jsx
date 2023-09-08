import React from "react";
import "./Circles.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { FaShoppingCart, FaClock, FaStickyNote } from "react-icons/fa";

function Circles() {
  const currentRoute = useLocation().pathname.toLowerCase();
  return (
    <div className="circle-container">
      <div className="circle1">
        <Link
          to="/journal"
          className={
            currentRoute.includes("journal") ? "circle active" : "circle"
          }
        >
          <FaStickyNote className="icon" />
        </Link>
      </div>
      <div className="circle2">
        <Link
          to="/planner"
          className={
            currentRoute.includes("planner") ? "circle active" : "circle"
          }
        >
          <FaClock className="icon" />
        </Link>
      </div>
      <div className="circle3">
        <Link
          to="/store"
          className={
            currentRoute.includes("store") ? "circle active" : "circle"
          }
        >
          <FaShoppingCart className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default Circles;
