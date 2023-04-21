import PostFormStyles from "../styles/PostForm.module.css";
import { useState, useEffect } from "react";
import useFirebase from "@/hooks/useFirebase.js";

const PostForm = ({ postId }) => {
  const firebase = useFirebase();

  const initialFieldsState = {
    title: "",
    body: "",
  };

  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

  const [fields, setFields] = useState(initialFieldsState);

  useEffect(() => {
    if (postId) {
      //TODO: probably need to await this and return somehow or useContext & live filter from the state
      post = firebase.getPost(postId);
      setFields({
        title: post.title,
        body: post.body,
      });
    } else {
      setFields(initialFieldsState);
    }
  }, [postId]);

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const createPost = async (fields) => {
    const post = { ...fields, author: firebase.currentUser };
    const result = await firebase.addPost(post);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = {};
    //TODO: validation

    if (postId) {
      console.log("update postId", postId);
    } else {
      result = await createPost(fields);
    }

    //TODO: pretty this up
    alert(result.message);

    e.target.reset();
  };
  return (
    <>
      <form className={PostFormStyles.postForm} onSubmit={handleSubmit}>
        <h1>{postId ? "Edit" : "Create"} A Post</h1>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            value={fields.title}
            onChange={handleChange}
          />
        </div>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Body..."
            value={fields.body}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value={postId ? "Update Post" : "Add Post"}
          aria-label="submit-post"
        />
      </form>
    </>
  );
};

export default PostForm;
