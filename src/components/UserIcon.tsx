import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { FaUserAstronaut, FaUber } from "react-icons/fa";

const UserIcon: React.FC = () => {
  const { openUserModal, user }: any = useContext(UserContext);

  return (
    <button className="user_icon" onClick={openUserModal}>
      {user ? <FaUserAstronaut /> : <FaUber />}
    </button>
  );
};

export default UserIcon;
