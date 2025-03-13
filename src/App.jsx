import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewEvent from "./pages/NewEvent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="new" element={<NewEvent />} />

          <Route path="*" element={<h2>NotFound</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
