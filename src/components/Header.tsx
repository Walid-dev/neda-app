import React from "react";
import CartIcon from "./CartIcon"; // Make sure the path is correct

const Header: React.FC = () => {
  return (
    <header>
      <h1>My E-commerce Site</h1>
      <nav>{/* Your navigation items */}</nav>
      <CartIcon />
    </header>
  );
};

export default Header;
