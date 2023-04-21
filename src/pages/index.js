import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login.jsx";
import { useState } from "react";
import useFirebase from "@/hooks/useFirebase.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const firebase = useFirebase();
  const [postsList, setPostsList] = useState([]);

  const postsListComponents = postsList.map((post) => {
    return <li key={post.id}>{post.title}</li>;
  });

  //TODO: Move this up to a context so gets pulled automatically
  async function pullPostsFromDb() {
    const posts = await firebase.getPosts();
    setPostsList(posts);
  }
  return (
    <>
      {firebase.currentUser.email ? (
        <>
          <p>Welcome!! {firebase.currentUser.displayName}</p>
          <button onClick={pullPostsFromDb}>Get Posts</button>
          <ul>{postsListComponents}</ul>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
