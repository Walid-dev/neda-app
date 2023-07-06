import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const sendResetEmail = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error("Error in sending password reset email: ", error);
    }
  };

  return (
    <form onSubmit={sendResetEmail}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
      <button type="submit">Send password reset email</button>
    </form>
  );
};

export default PasswordReset;
