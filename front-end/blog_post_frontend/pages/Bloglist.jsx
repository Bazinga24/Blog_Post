import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogList.css"; // Import the CSS
import NavBar from "../pages/NavBar";
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(5);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://blog-post-backend-44tv.onrender.com/api/blogs");
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const clickHandler = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  // All the variables to manipulate the post indexes
  const lastIndex = currentPage * blogsPerPage;
  const firstIndex = lastIndex - blogsPerPage;
  const blogsToShow = blogs.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(blogs.length / blogsPerPage);
  // Get all the pages number
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <>
      <div className="blog-list-container">
        <h1 className="blog-list-heading">All Blogs</h1>
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs available.</p>
        ) : (
          <>
            <div className="blog-cards">
              {blogsToShow.map((blog) => (
                <div key={blog._id} className="blog-card">
                  <h2 className="blog-title">{blog.title}</h2>
                  <p className="blog-author">By: {blog.author.email}</p>
                  <p className="blog-preview">
                    {blog.content.slice(0, 120)}...
                  </p>
                  <a href={`/blogs/${blog._id}`} className="read-more">
                    Read more →
                  </a>
                </div>
              ))}
            </div>
            <div className="button-container">
              <button onClick={() => clickHandler(currentPage - 1)}>
                ◀ Prev
              </button>
              <span>
                Page {currentPage}/{totalPage}
              </span>
              <button onClick={() => clickHandler(currentPage + 1)}>
                {" "}
                Next ▶
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BlogList;
