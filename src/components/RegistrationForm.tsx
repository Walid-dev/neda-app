import React, { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "@/context/UserContext";

import { RegistrationFormProps } from "../types/types";

// RegistrationForm component receives the 'firebase' prop from its parent component
const RegistrationForm: React.FC<RegistrationFormProps> = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the updateUser function from your UserContext
  const { updateUser } = useContext(UserContext)!;

  // Extract the 'app' property from the 'firebase' object
  const auth = getAuth(firebase.app);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log(user);

      if (user.email !== null) {
        const newUser = {
          id: user.uid,
          email: user.email,
          // Add other fields as necessary
        };

        // Update the user in your UserContext
        updateUser(newUser);
      } else {
        console.error("Error: user.email is null");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegistrationForm;
