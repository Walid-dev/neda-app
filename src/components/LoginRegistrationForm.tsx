import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UserContext } from "@/context/UserContext";
import { ModalContext } from "../context/ModalContext";
import { LoginRegistrationFormProps, ModalSize, ModalType } from "../types/types";
import PasswordReset from "../components/PasswordReset";
import { SimpleModal } from "./SimpleModal";
import { Spinner } from "../components/Spinner";

// LoginRegistrationForm component receives the 'firebase' prop from its parent component
const LoginRegistrationForm: React.FC<LoginRegistrationFormProps> = ({ firebase }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("Reset your Password");
  const [loading, setloading] = useState<boolean>(false);

  // Get the updateUser function from your UserContext
  const { updateUser } = useContext(UserContext)!;
  const { isSimpleModalOpen, openSimpleModal, closeSimpleModal } = useContext(ModalContext);

  // Extract the 'app' property from the 'firebase' object

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setloading(true); // Start loading here
    try {
      let userCredential;
      if (isLoginMode) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;

      if (user.email !== null) {
        const newUser = {
          id: user.uid,
          email: user.email,
        };

        // Update the user in your UserContext
        updateUser(newUser);
        setEmail("");
        setPassword("");
        setErrorMessage("Authentication successful!");
      } else {
        setErrorMessage("Error: user.email is null");
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("This email is already in use. Please log in instead.");
          break;
        case "auth/invalid-email":
          setErrorMessage("The email address is badly formatted.");
          break;
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMessage("The email and password combination is incorrect.");
          break;
        default:
          console.log(error.code);
          setErrorMessage("An error occurred. Please try again.");
          break;
      }
    } finally {
      setloading(false); // End loading here, in the finally block
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Render the spinner if loading is true
  if (loading) {
    return <Spinner />;
  }

  // Render the data when it's finished loading
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
            Reset Password
          </button>
        </div>
      )}
      {/* <-- Include the PasswordResetForm component, but only when isLoginMode is false */}
      <SimpleModal
        type={ModalType.Info}
        size={ModalSize.Small}
        modalTitle={modalTitle}
        isSimpleModalOpen={isSimpleModalOpen}
        onClose={() => closeSimpleModal()}
        onConfirm={() => console.log("Confirmed")}>
        <PasswordReset />
      </SimpleModal>
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
};
  




export default LoginRegistrationForm;