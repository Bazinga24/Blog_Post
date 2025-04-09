import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";
import NavBar from "../pages/NavBar";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  if (!blog) return <p>Loading blog...</p>;

  return (
    <>
      <NavBar />
      <div className="blog-detail-container">
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <p className="blog-meta">Author: {blog.author.email}</p>

        {/* Show buttons only if user is the blog author */}
        {userId === blog.author._id && (
          <div className="blog-actions">
            <button onClick={() => navigate(`/blogs/${id}/edit`)}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">
              Remove
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default BlogDetail;
