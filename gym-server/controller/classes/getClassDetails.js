
const classModel = require("../../models/classModel");

const getClassDetailController = async (req, res) => {
  const { className } = req.params; // Lấy tên lớp học từ URL params

  try {
    // Tìm lớp học trong cơ sở dữ liệu theo className
    const classDetail = await classModel.findOne({ className });

    if (!classDetail) {
      return res.status(404).json({
        message: "Class not found",
        success: false,
        error: true,
      });
    }

    res.json({
      message: "Class found",
      success: true,
      error: false,
      data: classDetail,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getClassDetailController;

