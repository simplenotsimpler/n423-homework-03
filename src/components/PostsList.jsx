import PostsListStyles from "../styles/PostsList.module.css";
import useFirebase from "@/hooks/useFirebase.js";
import { getTextAfterCharacter } from "@/utils/helpers.js";

const PostsList = ({ posts }) => {
  const firebase = useFirebase();

  const handleDeleteClick = async (e) => {
    const postId = getTextAfterCharacter(e.target.id, "-");

    //TODO: replace with pretty confirm w/ default on cancel
    const confirmResult = confirm("Are you sure you want to delete this post?");

    if (confirmResult) {
      console.log("Yes, delete postId", postId);
      const result = await firebase.deletePost(postId);
      //TODO: pretty this up
      alert(result.message);
    } else {
      console.log("Delete cancelled");
    }
  };
  const postsListComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        <article className={PostsListStyles.post}>
          <header className={PostsListStyles.postHeader}>
            <h1 className={PostsListStyles.postTitle}>{post.title}</h1>
          </header>
          <div className={PostsListStyles.postBody}>{post.body}</div>
          <footer className={PostsListStyles.postFooter}>
            <div>By: {post.author.displayName}</div>
            {firebase.currentUser.email === post.author.email ? (
              <div className={PostsListStyles.postActions}>
                <button id={`edit-${post.id}`}>
                  <span className="visually-hidden">Edit</span> &#128393;
                </button>
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
