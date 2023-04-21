import styles from "@/styles/Home.module.css";
import Login from "@/components/Login.jsx";
import { useState } from "react";
import useFirebase from "@/hooks/useFirebase.js";
import PostsList from "@/components/PostsList.jsx";

export default function Home() {
  const firebase = useFirebase();
  const [postsList, setPostsList] = useState([]);

  //TODO: Move this up to a context so gets pulled automatically
  async function pullPostsFromDb() {
    const posts = await firebase.getPosts();
    setPostsList(posts);
  }
  return (
    <>
      {firebase.currentUser.email ? (
        <>
          <button onClick={pullPostsFromDb}>Get Posts</button>
          <PostsList posts={postsList} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
