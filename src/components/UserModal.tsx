import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import RegistrationForm from "./RegistrationForm";
import { app, analytics } from "../../firebase";

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
          {/* Pass the 'app' and 'analytics' props to the RegistrationForm component */}
          <RegistrationForm firebase={{ app, analytics }} />
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
