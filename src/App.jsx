import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Event from "./pages/Event";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/new" element={
            <ProtectedRoute>
                <NewEvent />  
            </ProtectedRoute>
            } />
          <Route path="/login" element={<Login />}/>
            <Route path="/event/:id" element={<Event />}/>
          <Route path="*" element={<h2>NotFound</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
