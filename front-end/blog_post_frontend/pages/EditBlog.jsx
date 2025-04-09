import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBlog.css"; // Reuse or create a form CSS file

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch blog to pre-fill form
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setForm({
          title: res.data.blog.title,
          content: res.data.blog.content,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>Edit Blog</h2>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          rows={8}
          required
        ></textarea>
        <button type="submit">Update Blog</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default EditBlog;
