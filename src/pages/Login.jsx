import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const {isLoggedIn, user, login, logout} = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!userInput.trim() || !passwordInput.trim()){
      alert("Bitte Email und Passwort eingeben!");
      return;
    }
    
    const loginSuccess = await login(userInput, passwordInput);
    if(!loginSuccess){
      setLoginFailed(true);
    } else {
      navigate(-1);
    }
  }
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <h2 className="text-m font-bold mb-4">You must be logged in to create new Events!</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-80 md:w-96">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="user"
              placeholder="Email"
              className={`input input-bordered w-full`}            
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full `}
              onChange={(e) => setPasswordInput(e.target.value)}
            />          
          </div>

          {/* Login Error Message */}
          {loginFailed && (
            <p className="text-red-500 text-sm text-center">Login failed!</p>
          )}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* Don't have an account? Sign Up Link */}
        <p className="mt-4 text-sm">
          You don't have an account yet?{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
    </div>  
  )
}

export default Login