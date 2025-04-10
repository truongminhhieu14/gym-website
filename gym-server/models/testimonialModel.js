const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  img: { type: String, required: true },
  email: { type: String },
  userId: { type: String },
},{
    timestamps: true
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
