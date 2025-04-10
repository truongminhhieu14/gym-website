const uploadClassPermission = require("../../helper/permission");
const classModel = require("../../models/classModel");

async function updateClassController(req, res) {
    try {
        // Kiểm tra quyền cập nhật lớp tập
        if (!uploadClassPermission(req.userId)) {
            throw new Error("Permission denied");
        }

        const { _id, ...resBody } = req.body;

        // Cập nhật lớp tập trong database
        const updatedClass = await classModel.findByIdAndUpdate(_id, resBody, { new: true });

        res.json({
            message: "Cập nhật lớp tập thành công",
            data: updatedClass,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = updateClassController;
