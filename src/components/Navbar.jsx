import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import useFirebase from "@/hooks/useFirebase.js";

//TODO: style button - use google button component

const Navbar = () => {
  const firebase = useFirebase();
  // console.log(firebase.currentUser);
  return (
    <nav className={NavbarStyles.navbar}>
      <ul className={NavbarStyles.navmenu}>
        <li>
          <Link href="/">Home</Link>
        </li>

        {firebase.currentUser.email ? (
          <>
            <li>
              <Link href="/create">Create TBD</Link>
            </li>
            <li>
              <button onClick={firebase.logoutUser}>Logout</button>
            </li>
          </>
        ) : (
          <button onClick={firebase.loginUser}>Login</button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
