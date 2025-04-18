const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        unique: true,
        required: true
    },
    password: String,
    phone: String, // chỉ dùng cho trainers
    specialization: String, //chỉ dùng cho trainers
    role: {
        type: String,
        enum: ["admin", "trainer", "member"],
        default: "member"
    }
},{
    timestamps: true
});
const userModel = mongoose.model("user", userSchema);


module.exports = userModel
