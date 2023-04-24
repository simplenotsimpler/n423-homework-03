import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import useFirebase from "@/hooks/useFirebase.js";

const Navbar = () => {
  const firebase = useFirebase();
  const { currentUser, logoutUser } = firebase;

  const handleLogout = async () => {
    const result = await logoutUser();
    alert(result.message);
  };

  //TODO: activelink
  return (
    <nav className={NavbarStyles.navbar}>
      <h1>Private Posts</h1>
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
              <button className={NavbarStyles.btn} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className={NavbarStyles.btn}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
