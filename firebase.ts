// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnESbBf8TujUKTkME--iQGKVYfAdKBW7Q",
  authDomain: "neda-app.firebaseapp.com",
  projectId: "neda-app",
  storageBucket: "neda-app.appspot.com",
  messagingSenderId: "428346250109",
  appId: "1:428346250109:web:3ee5888178fd12a8c6f214",
  measurementId: "G-M614QLM7FV",
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Define the 'analytics' variable as 'Analytics | undefined'
let analytics: Analytics | undefined;

// Check if the code is running in a browser environment
if (typeof window !== "undefined") {
  // If running in a browser, initialize Firebase analytics
  analytics = getAnalytics(app);
}

// Export the 'app' and 'analytics' variables
export { app, analytics, auth };
