import PostFormStyles from "../styles/PostForm.module.css";

const PostForm = ({ formTitle = "Create A Post" }) => {
  return (
    <>
      <form className={PostFormStyles.postForm}>
        <h1>{formTitle}</h1>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" placeholder="Title..." />
        </div>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="body">Body:</label>
          <textarea name="body" id="body" placeholder="Body..." />
        </div>
        <input type="submit" value="Submit Post" aria-label="submit-post" />
      </form>
    </>
  );
};

export default PostForm;
