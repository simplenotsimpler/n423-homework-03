import { useState } from "react";
import { MESSAGES } from "@/utils/messages.js";

import { auth, db, googleProvider } from "@/firebaseInit.js";

export default function useFirebase() {
  const initialUser = {
    email: "",
    displayName: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUser);

  auth.onAuthStateChanged(function (user) {
    if (user && currentUser.email !== user.email) {
      setCurrentUser({
        email: user.email,
        displayName: user.displayName,
      });
    } else if (!user && currentUser.email) {
      setCurrentUser(initialUser);
    }
  });

  const loginUser = async () => {
    let result = {
      success: false,
      message: "",
    };
    try {
      await auth.signInWithPopup(googleProvider);
      result = { success: true, message: MESSAGES.SUCCESS_LOGIN };
    } catch (error) {
      console.error(error);
      const errorCode = error.code;

      switch (errorCode) {
        case "auth/operation-not-allowed":
          result = { ...result, message: MESSAGES.GOOGLE_OP_NOT_ENABLED };
          break;
        case "auth/operation-not-supported-in-this-environment":
          result = { ...result, message: MESSAGES.GOOGLE_OP_NOT_SUPPORTED };
          break;
        case "auth/popup-blocked":
          result = { ...result, message: MESSAGES.GOOGLE_POPUP_BLOCKED };
          break;
        case "auth/popup-closed-by-user":
          result = { ...result, message: MESSAGES.GOOGLE_POPUP_CLOSED };
          break;
        default:
          result = { ...result, message: MESSAGES.GOOGLE_GENERIC_LOGIN };
          break;
      }
    }
    return result;
  };

  const logoutUser = async () => {
    let result = {
      success: false,
      message: "",
    };

    try {
      await auth.signOut();
      result = { success: true, message: MESSAGES.SUCCESS_LOGOUT };
    } catch (error) {
      console.error(error);
      result = { ...result, message: MESSAGES.GOOGLE_LOGOUT_ERROR };
    }
    return result;
  };

  const getPosts = async () => {
    let result = {
      success: false,
      message: "",
    };

    const postsList = [];

    try {
      const postsSnapshot = await db.collection("posts").get();
      for (let post of postsSnapshot.docs) {
        const postData = post.data();
        postsList.push({
          ...postData,
          id: post.id,
        });
      }

      result = {
        success: true,
        message: MESSAGES.SUCCESS_FETCH_POSTS,
      };
    } catch (error) {
      result = {
        ...result,
        message: MESSAGES.ERROR_FETCH_POSTS,
      };
    }

    return { postsList, result };
  };

  const getPostById = async (postId) => {
    let result = {
      success: false,
      message: "",
    };

    let post = {};

    try {
      const docSnap = await db.collection("posts").doc(postId).get();
      post = { ...docSnap.data() };

      result = {
        success: true,
        message: MESSAGES.SUCCESS_FETCH_POST_BY_ID + ` with id: ${postId}`,
      };

    } catch (error) {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      result = {
        ...result,
        message: MESSAGES.ERROR_FETCH_POST_BY_ID,
      };
    }
    return {post, result};
  };

  const addPost = async (post) => {
    let result = {
      success: false,
      message: "",
    };
    try {
      await db.collection("posts").add(post);

      result = {
        success: true,
        message: MESSAGES.SUCCESS_CREATE_POST,
      };
    } catch (error) {
      console.error("Error adding document: ", error);
      result = {
        success: false,
        message: MESSAGES.ERROR_CREATE_POST,
      };
    }
    return result;
  };

  const updatePost = async (postId, post) => {
    let result = {
      succes: false,
      message: "",
    };

    try {
      await db
        .collection("posts")
        .doc(postId)
        .update({ ...post });

      result = {
        success: true,
        message: MESSAGES.SUCCESS_UPDATE_POST,
      };
    } catch (error) {
      console.error("Error removing document: ", error);
      result = {
        success: false,
        message: MESSAGES.ERROR_UPDATE_POST,
      };
    }
    return result;
  };

  const deletePost = async (postId) => {
    let result = {
      success: false,
      message: "",
    };

    try {
      await db.collection("posts").doc(postId).delete();
      console.log("Document successfully deleted! Id:", postId);
      result = {
        success: true,
        message: MESSAGES.SUCCESS_DELETE_POST,
      };
    } catch (error) {
      console.error("Error removing document: ", error);
      result = {
        success: false,
        message: MESSAGES.ERROR_DELETE_POST,
      };
    }
    return result;
  };
  return {
    currentUser,
    loginUser,
    logoutUser,
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
  };
}
