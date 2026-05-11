import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignInForm from "../../components/signInForm";

type LoginResponse = {
  message: string;
  accessToken: string;
  user: {
    id: number;
    name: string;
    role: string;
  };
};

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

const handleSignIn = async () => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3000/auth/login",
      {
        email,
        password,
      }
    );

    const { accessToken, user } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

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