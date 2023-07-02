import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { FaUserAstronaut } from "react-icons/fa";

import { UserContextProps } from "@/types/types";

const UserIcon: React.FC = () => {
  const { user }: any = useContext(UserContext);

  return (
    <button className="cart_icon" onClick={() => console.log(user)}>
      <FaUserAstronaut />
    </button>
  );
};

export default UserIcon;
