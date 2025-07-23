import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogsPage from "./pages/BlogsPage";
import CreateBlog from "./pages/CreateBlog";

function App() {
  const { user, getUser } = useUserStore();

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="dir-rtl">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={user ? <CreateBlog /> : <Navigate to="/" />} />
        <Route
          path="/blogs"
          element={user ? <BlogsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
