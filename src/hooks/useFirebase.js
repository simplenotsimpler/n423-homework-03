import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//make sure Google has been added as auth provider in Firebase Authentication

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const db = firebase.firestore(app);

const googleProvider = new firebase.auth.GoogleAuthProvider();

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
    await auth.signInWithPopup(googleProvider);
    return {};
  };

  const logoutUser = async () => {
    await auth.signOut();
    return {};
  };

  const getPosts = async () => {
    const postsSnapshot = await db.collection("posts").get();
    const postsList = [];
    for (let post of postsSnapshot.docs) {
      const postData = post.data();
      postsList.push({
        ...postData,
        id: post.id,
      });
    }

    return postsList;
  };

  const getPostById = async (postId) => {
    let post = {};

    try {
      const docSnap = await db.collection("posts").doc(postId).get();
      post = { ...docSnap.data() };
    } catch (error) {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return post;
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
        message: "Post Added",
      };
    } catch (error) {
      console.error("Error adding document: ", error);
      result = {
        success: false,
        message: "Error adding post.",
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
        message: "Post updated.",
      };
    } catch (error) {
      console.error("Error removing document: ", error);
      result = {
        success: false,
        message: "Error updating post.",
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
        message: "Post deleted.",
      };
    } catch (error) {
      console.error("Error removing document: ", error);
      result = {
        success: false,
        message: "Error deleting post.",
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
