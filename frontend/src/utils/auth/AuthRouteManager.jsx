import { useState } from "react";
import Signin from "@/pages/authentication/signin/Signin";
import Signup from "@/pages/authentication/signup/Signup";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <Signup switchMode={() => setIsSignUp(false)} />
  ) : (
    <Signin switchMode={() => setIsSignUp(true)} />
  );
};

export default Auth;
