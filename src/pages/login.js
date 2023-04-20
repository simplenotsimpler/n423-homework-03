import LoginStyles from "../styles/Login.module.css";

const Login = () => {
  return (
    <>
      <p className={LoginStyles.loginContent}>To continue, sign in with</p>
      <button className={LoginStyles.loginWithGoogleBtn}>Google</button>
    </>
  );
};

export default Login;
