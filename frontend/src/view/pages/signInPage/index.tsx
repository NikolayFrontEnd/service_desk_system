import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/signInForm";
import { authService } from "../../../domain/services/AuthService";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const session = await authService.login(email, password);

      console.log("Logged in user:", session.user.name);
      console.log("User role:", session.user.role);

      navigate("/main");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

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