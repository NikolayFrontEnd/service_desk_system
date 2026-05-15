import Button from "../../primitives/button";
import Input from "../../primitives/input";
import style from "./index.module.css";

type SignInFormProps = {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSignIn: () => void;
};

const SignInForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSignIn,
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
          onEmailChange(e.target.value);
        }}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => {
          onPasswordChange(e.target.value);
        }}
      />

      <Button className={style.button} onClick={onSignIn}>
        Вход
      </Button>
    </div>
  );
};

export default SignInForm;
