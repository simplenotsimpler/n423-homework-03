/* 
  Resources: https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook
*/

import PostFormStyles from "../styles/PostForm.module.css";
import { useState, useEffect } from "react";
import useFirebase from "@/hooks/useFirebase.js";

const PostForm = ({ postId }) => {
  const { getPostById } = useFirebase();

  const initialPostState = {
    title: "",
    body: "",
  };

  const [post, setPost] = useState(initialPostState);

  const getPost = async () => {
    const { result, post } = await getPostById(postId);

    if (result.success) {
      setPost(post);
    } else {
      alert(result.message);
    }
  };

  useEffect(() => {
    if (postId) {
      getPost();

      //clean up
      return () => {};
    } else {
      setPost(initialPostState);
    }
  }, [postId]);

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const createPost = async () => {
    const newPost = { ...post, author: firebase.currentUser };
    const result = await firebase.addPost(newPost);
    return result;
  };

  const updatePost = async () => {
    const result = await firebase.updatePost(postId, post);
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let result = { success: false, message: "" };

    if (postId) {
      result = await updatePost();

      //TODO: figure out flow? stay on page or go back to home?
    } else {
      result = await createPost();

      //does not work with this set up b/c state has updated post
      // e.target.reset();
      //reset form by resetting the post state
      //https://stackoverflow.com/questions/63475521/how-to-clear-input-field-after-a-successful-submittion-in-react-using-useeffect
      setPost(initialPostState);
    }

    //TODO: pretty this up
    alert(result.message);
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
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={PostFormStyles.postInputGroup}>
          <label htmlFor="body">Body:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Body..."
            value={post.body}
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
