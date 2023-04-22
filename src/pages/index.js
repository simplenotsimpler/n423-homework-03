import styles from "@/styles/Home.module.css";
import Login from "@/components/Login.jsx";
import { useState } from "react";
import useFirebase from "@/hooks/useFirebase.js";
import PostsList from "@/components/PostsList.jsx";

export default function Home() {
  const firebase = useFirebase();

  return (
    <>
      {firebase.currentUser.email ? (
        <>
          <PostsList />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
