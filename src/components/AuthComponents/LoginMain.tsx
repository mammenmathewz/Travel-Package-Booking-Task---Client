import { useState } from "react";
import LoginComponent from "./Login";
import SignUpComponent from "./SignUp";
import { Button } from "../../components/ui/button";

const LoginMain = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Auth Container with left alignment */}
      <div className="flex flex-col w-full md:w-3/4 px-4 py-8 md:px-8 lg:px-12 justify-center">
        <div className="max-w-md mx-auto md:mx-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500">
              {isLogin 
                ? "Sign in to access your account" 
                : "Sign up to get started with our service"}
            </p>
          </div>
          
          {/* Toggle Switch */}
          <div className="mb-6 flex">
            <Button 
              onClick={toggleForm} 
              variant="outline" 
              className="text-sm"
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </Button>
          </div>
          
          {/* Auth Form */}
          {isLogin ? <LoginComponent /> : <SignUpComponent />}
        </div>
      </div>
      
      {/* Image/Brand Section - Only visible on medium screens and above */}
      <div className="hidden md:flex md:w-2/4 items-center justify-center">
        <div className="p-8 ">
          <h2 className="text-3xl font-bold mb-4">Your Application</h2>
          <p className="mb-6">Secure, fast, and reliable service</p>
          {/* You could add a logo or illustration here */}
        </div>
      </div>
    </div>
  );
};

export default LoginMain;