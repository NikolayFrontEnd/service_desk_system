import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/signInForm";
import { authService } from "../../../domain/services/AuthService";
import style from "./index.module.css";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);

      await authService.login(email, password);

      navigate("/main");
    } catch (error) {
      console.log("Login error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loaderScreen}>
        <div className={style.loader}></div>
      </div>
    );
  }

  return (
    <div>
      <SignInForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignIn={handleSignIn}
      />
    </div>
  );
};

export default SignInPage;