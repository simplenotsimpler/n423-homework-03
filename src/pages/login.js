import LoginStyles from "../styles/Login.module.css";
import useFirebase from "@/hooks/useFirebase.js";
//TODO: maybe set this as a component instead of a page??
const Login = () => {
  const firebase = useFirebase();
  return (
    <>
      <p className={LoginStyles.loginContent}>To continue, sign in with</p>
      <button
        className={LoginStyles.loginWithGoogleBtn}
        onClick={firebase.loginUser}
      >
        Google
      </button>
    </>
  );
};

export default Login;
