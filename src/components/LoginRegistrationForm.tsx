import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "@/context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { LoginRegistrationFormProps, ModalSize, ModalType } from "../types/types";
import PasswordReset from "../components/PasswordReset";
import { SimpleModal } from "./SimpleModal";

// LoginRegistrationForm component receives the 'firebase' prop from its parent component
const LoginRegistrationForm: React.FC<LoginRegistrationFormProps> = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false); // Add this
  const [modalTitle, setModalTitle] = useState("Custom modal title");

  // Get the updateUser function from your UserContext
  const { updateUser } = useContext(UserContext)!;
  const { isSimpleModalOpen, openSimpleModal, closeSimpleModal } = useContext(ModalContext);

  console.log(isSimpleModalOpen, openSimpleModal, closeSimpleModal);

  // Extract the 'app' property from the 'firebase' object

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let userCredential;
      if (isLoginMode) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;

      console.log(user);

      if (user.email !== null) {
        const newUser = {
          id: user.uid,
          email: user.email,
        };

        // Update the user in your UserContext
        updateUser(newUser);
      } else {
        console.error("Error: user.email is null");
      }
    } catch (error: any) {
      // Handle Errors here.
      if (error.code === "auth/email-already-in-use") {
        console.log("This email is already in use. Please log in instead.");
      } else if (error.code === "auth/invalid-email") {
        console.log("The email address is badly formatted.");
      } else if (error.code === "auth/weak-password") {
        console.log("The password is too weak.");
      } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        console.log("The email and password combination is incorrect.");
      } else {
        console.error(error.message);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <form onSubmit={handleAuth}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{isLoginMode ? "Log In" : "Sign Up"}</button>
        <button type="button" onClick={toggleAuthMode}>
          Switch to {isLoginMode ? "Sign Up" : "Log In"}
        </button>
      </form>
      {isLoginMode && (
        <div>
          <button type="button" onClick={() => openSimpleModal()}>
            Open modal
          </button>
        </div>
      )}
      {/* <-- Include the PasswordResetForm component, but only when isLoginMode is false */}
      <SimpleModal
        type={ModalType.Info}
        size={ModalSize.Small}
        modalTitle={modalTitle}
        isSimpleModalOpen={isSimpleModalOpen}
        onClose={() => closeSimpleModal()}>
        <PasswordReset />
      </SimpleModal>
    </div>
  );
};

export default LoginRegistrationForm;