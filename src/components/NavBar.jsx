import { Link } from "react-router-dom";

const NavBar = (props) => {
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
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
