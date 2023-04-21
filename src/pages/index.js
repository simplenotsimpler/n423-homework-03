import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Login.jsx";
import useFirebase from "@/hooks/useFirebase.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const firebase = useFirebase();
  return (
    <>
      {firebase.currentUser.email ? (
        <p>Welcome!! {firebase.currentUser.displayName}</p>
      ) : (
        <Login />
      )}
    </>
  );
}
