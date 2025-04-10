const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true }, // Tên lớp
  trainerName: { type: String, required: true }, // Tên HLV
  schedule: { type: String, required: true }, // Lịch học (Ví dụ: "Thứ 2 - 18:00")
  classImage: { type: [String], required: true }, // Danh sách ảnh lớp tập gym
  description: { type: String, required: true }, // Mô tả lớp tập gym
});

module.exports = mongoose.model("class", classSchema);