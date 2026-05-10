import Button from "../../primitives/button";
import Input from "../../primitives/input";
import style from "./index.module.css";

type SignInFormProps = {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSignIn: () => void;
};

const SignInForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSignIn,
}: SignInFormProps) => {
  return (
    <div className={style.signInForm}>
      <div className={style.title}>Вход</div>

      <Input
        id="email"
        label="Email"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button className={style.button} onClick={handleSignIn}>
        Вход
      </Button>
    </div>
  );
};

export default SignInForm;