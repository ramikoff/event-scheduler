import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
