import React from "react";
import CartIcon from "./CartIcon"; // Make sure the path is correct

const Header: React.FC = () => {
  return (
    <header>
      <h1>My E-commerce Site</h1>
      <nav>
        {/* Your navigation items */}
        <CartIcon />
      </nav>
    </header>
  );
};

export default Header;
