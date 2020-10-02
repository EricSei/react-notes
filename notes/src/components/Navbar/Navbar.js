import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const addNote = () => {
    alert("adding note");
  };
  return (
    <div className="ui inverted menu">
      <div className="header item">
        <Link to="/">
          <i className="home icon large"></i>My Notes
        </Link>
      </div>
      <div className="right menu">
        <div className="item">
          <div className="ui transparent inverted icon input">
            <i className="search icon"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <Link to="/add/note" className="item">
          <i className="plus icon icon-color"> </i>
          Add Note
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
