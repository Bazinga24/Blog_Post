const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const blog = new Blog({
      title,
      content,
      author: req.user.id, // `req.user` comes from JWT middleware
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Show latest blogs first
      .populate("author", "email"); // Show author's email only

    res.status(200).json({ blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId).populate("author", "email");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if logged-in user is the blog author
    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this blog" });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the blog author
    if (blog.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
