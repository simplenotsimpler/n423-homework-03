import PostsListStyles from "../styles/PostsList.module.css";
import useFirebase from "@/hooks/useFirebase.js";

const PostsList = ({ posts }) => {
  const firebase = useFirebase();
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
                <button>
                  <span className="visually-hidden">Edit</span> &#128393;
                </button>
                <button>
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
