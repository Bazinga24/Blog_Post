import React, { useState } from "react";
import axios from "axios";
import "./CreateBlog.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // assuming you stored JWT

    if (!token) {
      return setError("You must be logged in to create a blog.");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/blogs",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      navigate("/"); // redirect to homepage or blog list
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog. Make sure you are logged in.");
    }
  };

  return (
    <div className="create-blog-container">
      <h1 className="create-blog-title">Create a New Blog</h1>
      {error && <p className="create-blog-error">{error}</p>}
      <form className="create-blog-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Blog Title"
          className="create-blog-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your blog content here..."
          className="create-blog-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
        />
        <button type="submit" className="create-blog-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
