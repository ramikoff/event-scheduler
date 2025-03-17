import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="new" element={<NewEvent />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<h2>NotFound</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
