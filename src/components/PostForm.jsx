import PostFormStyles from "../styles/PostForm.module.css";
import { useState } from "react";
import useFirebase from "@/hooks/useFirebase.js";

const PostForm = ({ formTitle = "Create A Post" }) => {
  const firebase = useFirebase();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const post = { title, body, author: firebase.currentUser };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await firebase.addPost(post);
    //TODO: pretty this up
    alert(result.message);
    e.target.form.reset();
  };
  return (
    <>
      <form className={PostFormStyles.postForm}>
        <h1>{formTitle}</h1>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Body..."
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Submit Post"
          aria-label="submit-post"
          onClick={handleSubmit}
        />
      </form>
    </>
  );
};

export default PostForm;
