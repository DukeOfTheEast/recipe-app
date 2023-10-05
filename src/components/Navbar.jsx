import React from "react";
import Logo from "../images/recipe-logo.jpg";
import User from "../images/user-profile-icon-free-vector.jpg";
import classes from "../components/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <img src={Logo} alt="" className={classes.navImg} />
      <img src={User} alt="" className={classes.navImg} />
    </div>
  );
};

export default Navbar;
