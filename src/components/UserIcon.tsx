import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { FaUserAstronaut } from "react-icons/fa";

import { UserContextProps } from "@/types/types";

const UserIcon: React.FC = () => {
  const { openUserSection }: any = useContext(UserContext);

  return (
    <button className="user_icon" onClick={openUserSection}>
      <FaUserAstronaut />
    </button>
  );
};

export default UserIcon;
