import LoginStyles from "../styles/Login.module.css";
import useFirebase from "@/hooks/useFirebase.js";

//TODO: convert the button to its own component or use 3rd party?

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
