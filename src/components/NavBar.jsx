import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBar = (props) => {
   const {isLoggedIn, user, login, logout} = useAuth();
   const navigate = useNavigate();
   const handleLogout = async () => {
    await logout();
    navigate("/");
   }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Event Scheduler
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New Event</Link>
          </li>
          {
           isLoggedIn ? (
           <li>
              <Link onClick={handleLogout}>Logout</Link>
           </li>
            
          ) 
          : 
          (
            <li>
                <Link to="/login">Login</Link>
            </li>          
          )
          }
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
