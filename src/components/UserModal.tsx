import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import LoginRegistrationForm from "./LoginRegistrationForm";
import { app, analytics } from "../../firebase";

import "../styles/cart_modal.css";

const UserModal: React.FC = () => {
  const { user, isUserModalOpen, closeUserModal, logoutUser } = useContext(UserContext)!;

  if (!isUserModalOpen) {
    return null;
  }

  return (
    <div className="user_modal">
      <button onClick={closeUserModal}>Close</button>
      {user ? (
        <div>
          {/* Pass the 'app' and 'analytics' props to the LoginRegistrationForm component */}
          <p className="">{user.email}</p>
          <button type="button" onClick={logoutUser}>
            Logout
          </button>
        </div>
      ) : (
        <LoginRegistrationForm firebase={{ app, analytics }} />
      )}
    </div>
  );
};

export default UserModal;
