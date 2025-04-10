const membershipModel = require("../../models/membershipModel");

const membershipController = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const membershipList = await membershipModel.find({
      userId: currentUserId,
    });

    res.json({
      data: membershipList,
      message: "MemberShip List",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = membershipController
