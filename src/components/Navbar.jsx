import Link from "next/link.js";
import NavbarStyles from "../styles/Navbar.module.css";
import { useRouter } from "next/router.js";
import useFirebase from "@/hooks/useFirebase.js";

const Navbar = () => {
  const firebase = useFirebase();
  console.log(firebase.currentUser);
  return (
    <nav className={NavbarStyles.navbar}>
      <ul className={NavbarStyles.navmenu}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/create">Create TBD</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>

      <div>Welcome {firebase.currentUser.displayName}</div>
    </nav>
  );
};

export default Navbar;
