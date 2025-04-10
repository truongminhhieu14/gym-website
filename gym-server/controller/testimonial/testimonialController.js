const testimonialModel = require("../../models/testimonialModel");

const createTestimonial = async (req, res) => {
  try {
    const { name, message, img } = req.body;

    if (!name || !message || !img) {
      return res.status(400).json({ message: "Thiếu dữ liệu!" });
    }

    const newTestimonial = await testimonialModel.create({
      name,
      message,
      img,
      userId: req.userId,
    });

    await newTestimonial.save()
    console.log("✅ Đã tạo testimonial:", newTestimonial);
    res.status(201).json({
      message: "Tạo testimonial thành công",
      data: newTestimonial,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Lỗi server",
      error: true,
      success: false,
    });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Danh sách testimonials",
      data: testimonials,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Lỗi server",
      error: true,
      success: false,
    });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
};
