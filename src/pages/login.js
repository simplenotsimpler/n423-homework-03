import LoginStyles from "../styles/Login.module.css";
import useFirebase from "@/hooks/useFirebase.js";

const Login = () => {
  const firebase = useFirebase();
  const { loginUser } = firebase;

  //TODO: redirect to home
  const handleLogin = async () => {
    const result = await loginUser();
    alert(result.message);
  };

  return (
    <>
      <p className={LoginStyles.loginContent}>To continue, sign in with</p>
      <button className={LoginStyles.loginWithGoogleBtn} onClick={handleLogin}>
        Google
      </button>
    </>
  );
};

export default Login;
