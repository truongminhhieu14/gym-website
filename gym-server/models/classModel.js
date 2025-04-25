const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true }, // Tên lớp
  trainerName: { type: String, required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // Tên HLV
  schedule: { type: String, required: true }, // Lịch học (Ví dụ: "Thứ 2 - 18:00")
  duration: {type: Number},
  maxParticipants: { type: Number },
  currentParticipants: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["active", "inactive", "cancelled"],
    default: "active"
  },
  classImage: { type: [String], required: true }, // Danh sách ảnh lớp tập gym
  description: { type: String, required: true }, // Mô tả lớp tập gym
  goals: {type: [String], default: []},
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      content: { type: String },
      stars: { type: Number, min: 1, max: 5 }
    }
  ]

}, {timestamps: true});

module.exports = mongoose.model("class", classSchema);