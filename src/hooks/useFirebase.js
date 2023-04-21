import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useState } from "react";

//make sure Google has been added as auth provider in Firebase Authentication

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function useFirebase() {
  const initialUser = {
    email: "",
    displayName: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUser);

  auth.onAuthStateChanged(function (user) {
    if (user && currentUser.email !== user.email) {
      setCurrentUser({
        email: user.email,
        displayName: user.displayName,
      });
    } else if (!user && currentUser.email) {
      setCurrentUser(initialUser);
    }
  });

  // console.log(currentUser);
  return {
    currentUser,
    async loginUser() {
      await auth.signInWithPopup(googleProvider);
      return {};
    },
    async logout() {
      await auth.signOut();
      return {};
    },
  };
}
