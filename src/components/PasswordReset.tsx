import React, { useContext, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { ModalContext } from "@/context/ModalContext";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { closeSimpleModal } = useContext(ModalContext);

  const sendResetEmail = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      setIsEmailSent(true);
    } catch (error) {
      console.error("Error in sending password reset email: ", error);
    }
  };

  return isEmailSent ? (
    <div>
      <h2>Email Sent!</h2>
      <p>Check your email for the password reset link.</p>
    </div>
  ) : (
    <div>
      <form onSubmit={sendResetEmail}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit">Send password reset email</button>
      </form>
    </div>
  );
};

export default PasswordReset;
