import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div data-theme="mytheme">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route index element={<Home />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewEvent />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route path="event/:id" element={<EventDetails />} />

          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<h2>NotFound</h2>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
