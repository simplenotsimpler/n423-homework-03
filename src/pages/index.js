import styles from "@/styles/Home.module.css";
import Login from "./login.js";
import { useState } from "react";
import useFirebase from "@/hooks/useFirebase.js";
import PostsList from "@/components/PostsList.jsx";

//TODO: make more obvious what will see when continue, e.g. posts
//MAYBE: more homepage stuff - branding, what site is about, etc.

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
