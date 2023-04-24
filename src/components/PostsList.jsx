import PostsListStyles from "../styles/PostsList.module.css";
import useFirebase from "@/hooks/useFirebase.js";
import { getTextAfterCharacter } from "@/utils/helpers.js";
import Link from "next/link.js";
import { useState, useEffect } from "react";

//load via useEffect
// https://www.pluralsight.com/guides/consume-data-from-firebase-firestore-in-a-react-app

const PostsList = () => {
  
  const {currentUser, getPosts, deletePost} = useFirebase();

  const [postsList, setPostsList] = useState([]);

  // https://plainenglish.io/blog/using-reacts-useeffect-hook-to-fetch-data-and-periodically-refresh-that-data-2a69b6d44081
  // https://rapidapi.com/guides/api-requests-intervals
  //https://stackoverflow.com/questions/64144497/fetch-and-setinterval-react-hooks-problem

  async function fetchPosts() {
    const { result, postsList } = await getPosts();

    if (result.success) {
      setPostsList(postsList);
    } else {
      alert(result.message);
    }
  }

  //TODO: show is loading...
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPosts();
    }, 5000);

    fetchPosts();

    return () => clearInterval(intervalId);
  }, []);

  const handleDeleteClick = async (e) => {
    const postId = getTextAfterCharacter(e.target.id, "-");

    //TODO: replace with pretty confirm w/ default on cancel
    const confirmResult = confirm("Are you sure you want to delete this post?");

    if (confirmResult) {
      console.log("Yes, delete postId", postId);
      const result = await deletePost(postId);
      //TODO: pretty this up
      alert(result.message);
    } else {
      console.log("Delete cancelled");
    }
  };
  const postsListComponents = postsList.map((post) => {
    return (
      <li key={post.id}>
        <article className={PostsListStyles.post}>
          <header className={PostsListStyles.postHeader}>
            <h1 className={PostsListStyles.postTitle}>{post.title}</h1>
          </header>
          <div className={PostsListStyles.postBody}>{post.body}</div>
          <footer className={PostsListStyles.postFooter}>
            <div>By: {post.author.displayName}</div>
            {currentUser.email === post.author.email ? (
              <div className={PostsListStyles.postActions}>
                <Link href={`/posts/edit/${post.id}`}>
                  <span className="visually-hidden">Edit</span> &#128393;
                </Link>

                <button id={`delete-${post.id}`} onClick={handleDeleteClick}>
                  <span className="visually-hidden">Delete</span> &#128465;
                </button>
              </div>
            ) : (
              <></>
            )}
          </footer>
        </article>
      </li>
    );
  });
  return (
    <>
      <ul className={PostsListStyles.postList}>{postsListComponents}</ul>
    </>
  );
};

export default PostsList;
