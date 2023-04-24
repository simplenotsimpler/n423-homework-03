import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import useFirebase from "@/hooks/useFirebase.js";
import { useRouter } from "next/router.js";

const Navbar = () => {
  const firebase = useFirebase();
  const { currentUser, logoutUser } = firebase;
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutUser();
    alert(result.message);

    //explicit redirect since way protect home page could change in futuer
    router.push("/login");
  };
  return (
    <nav className={NavbarStyles.navbar}>
      <h1>Private Posts</h1>
      <ul className={NavbarStyles.navmenu}>
        <li>
          <Link
            href="/"
            className={router.pathname === "/" ? NavbarStyles.activeLink : ""}
          >
            Home
          </Link>
        </li>

        {currentUser.email ? (
          <>
            <li>
              <Link
                href="/create"
                className={
                  router.pathname === "/create" ? NavbarStyles.activeLink : ""
                }
              >
                Create Post
              </Link>
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
