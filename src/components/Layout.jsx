import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
