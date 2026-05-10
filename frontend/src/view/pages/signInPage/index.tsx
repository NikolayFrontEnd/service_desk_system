import { useState } from "react";
import SignInForm from "../../components/signInForm"

const SignInPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
const handleSignIn = () => {

console.log({
      email,
      password,
    });
  };
 

    return (
        <div>
            <SignInForm email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleSignIn = {handleSignIn} />
        </div>
    )
}
export default SignInPage;