import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/add-book">Add Book</NavLink>
      <NavLink to="/about">About Me</NavLink>
    </nav>
  );
};

export default Navbar;
