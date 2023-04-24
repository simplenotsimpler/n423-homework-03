import LoginStyles from "../styles/Login.module.css";
import useFirebase from "@/hooks/useFirebase.js";
import { useRouter } from "next/router.js";

const Login = () => {
  const firebase = useFirebase();
  const { loginUser } = firebase;
  const router = useRouter();

  const handleLogin = async () => {
    const result = await loginUser();
    alert(result.message);

    router.push("/");
  };

  return (
    <>
      <div className={LoginStyles.loginContent}>
        <p className={LoginStyles.loginText}>To continue, sign in with</p>
        <button
          className={LoginStyles.loginWithGoogleBtn}
          onClick={handleLogin}
        >
          Google
        </button>
      </div>
    </>
  );
};

export default Login;
