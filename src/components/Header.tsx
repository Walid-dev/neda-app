import React from "react";
import CartIcon from "./CartIcon"; // Make sure the path is correct
import UserIcon from "./UserIcon";

const Header: React.FC = () => {
  return (
    <header>
      <h1>Next JS App</h1>
      <nav>
        {/* Your navigation items */}
        <CartIcon />
        <UserIcon />
      </nav>
    </header>
  );
};

export default Header;
