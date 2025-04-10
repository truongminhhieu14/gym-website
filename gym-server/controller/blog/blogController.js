const blogModel = require("../../models/blogModel");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await blogModel.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, date, img, slug, content } = req.body;
    const newBlog = new blogModel({ title, date, img, slug, content });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ message: "Không thể tạo bài viết" });
  }
};

module.exports = {
    getAllBlogs, 
    getBlogBySlug,
    createBlog,
}
