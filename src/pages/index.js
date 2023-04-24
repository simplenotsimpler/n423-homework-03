import styles from "@/styles/Home.module.css";
import Login from "./login.js";
import useFirebase from "@/hooks/useFirebase.js";
import PostsList from "@/components/PostsList.jsx";

export default function Home() {
  const { currentUser } = useFirebase();

  return (
    <>
      {currentUser.email ? (
        <>
          <h1>View Our Private Posts</h1>
          <PostsList />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
