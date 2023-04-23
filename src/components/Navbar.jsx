import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import useFirebase from "@/hooks/useFirebase.js";

//TODO: style button - use google button component? or just go back to directing to Login page??

const Navbar = () => {
  const firebase = useFirebase();
  const { currentUser, loginUser, logoutUser } = firebase;

  return (
    <nav className={NavbarStyles.navbar}>
      <ul className={NavbarStyles.navmenu}>
        <li>
          <Link href="/">Home</Link>
        </li>

        {currentUser.email ? (
          <>
            <li>
              <Link href="/create">Create Post</Link>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </>
        ) : (
          <button onClick={loginUser}>Login</button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
