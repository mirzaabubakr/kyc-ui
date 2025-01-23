import { useState } from "react";
import { Button } from "../ui/button";
import LoginForm from "./LoginForm";
import RegisterationForm from "./RegisterationForm";

export default function AuthForm() {
  const [account, setAccount] = useState(true);

  const handleAccountStatus = () => {
    setAccount(!account);
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      {account ? <LoginForm /> : <RegisterationForm />}
      <div className="flex items-center justify-center">
        {account ? (
          <>
            <h4>Don't have an account?</h4>
            <Button
              variant={"link"}
              onClick={handleAccountStatus}
              className="font-medium"
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <h4>Already have an account?</h4>
            <Button
              variant={"link"}
              onClick={handleAccountStatus}
              className="font-medium"
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
