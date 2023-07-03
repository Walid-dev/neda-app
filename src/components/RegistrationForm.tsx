import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { RegistrationFormProps } from "../types/types";

// RegistrationForm component receives the 'firebase' prop from its parent component
const RegistrationForm: React.FC<RegistrationFormProps> = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extract the 'app' property from the 'firebase' object
  const auth = getAuth(firebase.app);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // The user is signed up, you can use the 'user' object for user details
      // You might want to save it to your state management system
    } catch (error: any) {
      // Handle Errors here.
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      {/* Controlled input elements */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegistrationForm;
