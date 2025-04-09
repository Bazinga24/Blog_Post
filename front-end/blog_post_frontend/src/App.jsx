import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login";
import BlogList from "../pages/Bloglist";
import BlogDetail from "../pages/BlogDetail";
import CreateBlog from "../pages/CreateBlog.jsx";
import Layout from "../pages/Layout.jsx";
import EditBlog from "../pages/EditBlog.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs/:id/edit" element={<EditBlog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
