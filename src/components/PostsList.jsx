import PostsListStyles from "../styles/PostsList.module.css";

const PostsList = ({ posts }) => {
  const postsListComponents = posts.map((post) => {
    return (
      <li key={post.id}>
        <article className={PostsListStyles.post}>
          <header className={PostsListStyles.postHeader}>
            <h1 className={PostsListStyles.postTitle}>{post.title}</h1>
          </header>
          <div className={PostsListStyles.postBody}>{post.body}</div>
          <footer className={PostsListStyles.postFooter}>
            <div>By: tbd</div>
            <div className={PostsListStyles.postActions}>
              <button>
                <span className="visually-hidden">Edit</span> &#128393;
              </button>
              <button>
                <span className="visually-hidden">Delete</span> &#128465;
              </button>
            </div>
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
