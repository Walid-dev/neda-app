import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import RegistrationForm from "./RegistrationForm";
import { app, analytics } from "../../firebase";

import "../styles/cart_modal.css";

const UserModal: React.FC = () => {
  const { user, isUserModalOpen, closeUserModal } = useContext(UserContext)!;

  if (!isUserModalOpen) {
    return null;
  }

  return (
    <div className="user_modal">
      <button onClick={closeUserModal}>Close</button>

      {user ? (
        <div>
          {/* Pass the 'app' and 'analytics' props to the RegistrationForm component */}
          <p className="">{user.email}</p>
        </div>
      ) : (
        <RegistrationForm firebase={{ app, analytics }} />
      )}
    </div>
  );
};

export default UserModal;
