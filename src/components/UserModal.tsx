import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

import "../styles/cart_modal.css";

const UserModal: React.FC = () => {
  const { user, isUserSectionOpen, closeUserSection } = useContext(UserContext)!;

  if (!isUserSectionOpen) {
    return null;
  }

  return (
    <div className="user_modal">
      <button onClick={closeUserSection}>Close</button>

      {user ? (
        <div>
          <p className="">{user.name}</p>
          <p className="">{user.email}</p>
        </div>
      ) : (
        <p>No user</p>
      )}
    </div>
  );
};

export default UserModal;
