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
      navigate("/new");
    }
  }
  return (
    <div>
      <h2>Sie müssen sich einloggen, um neue Events anzulegen.</h2>

      {loginFailed && (<p className="text-red-800">Login fehlgeschlagen!</p>)}
      <form onSubmit={handleSubmit}>
        <input type="text" name="user" onChange={(e)=>setUserInput(e.target.value)} placeholder="Email"/>
        <input type="password" name="password" onChange={(e)=>setPasswordInput(e.target.value)} placeholder="Passwort"/>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Noch keinen Account?</p> <Link to="/signUp"> Sign Up</Link>
      </div>

    </div>
  )
}

export default Login