const classModel = require("../../models/classModel")

const getClassController = async(req,res)=>{
    try{
        const allClass = await classModel.find().sort({ createdAt : -1 })

        res.json({
            message : "All Class",
            success : true,
            error : false,
            data : allClass
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }

}

module.exports = getClassController