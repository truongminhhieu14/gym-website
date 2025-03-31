const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const useRole = require("../../contants/useRole");
async function userRegisterController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    console.log("user", user);
    if (user) {
      throw new Error("Already user exits.");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    if (!email) {
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      role: useRole.MEMBER,
      password: hashedPassword,
    };
    const newUser = new userModel(payload);
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8,
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        data: token,
        success: true,
        error: false,
      });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userRegisterController;
