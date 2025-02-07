import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import About from "./pages/About";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </>
  );
}

export default App;
