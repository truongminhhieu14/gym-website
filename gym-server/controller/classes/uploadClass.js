const uploadClassPermission = require("../../helper/permission")
const classModel = require("../../models/classModel")

async function uploadClassController(req, res) {
    try {
        const sessionUserId = req.userId 
        if(!uploadClassPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadClass = new classModel(req.body)
        const saveClass = await uploadClass.save()
        
        res.status(201).json({
            message: "Upload class successfully",
            error: false,
            success: true,
            data: saveClass,
          });
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })   
        
    }
    
}

module.exports = uploadClassController