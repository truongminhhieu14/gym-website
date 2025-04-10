const userModel = require("../models/userModel")

const uploadClassPermission = async(userId) => {
    const user = await userModel.findById(userId)

    if(user.role === 'ADMIN'){
        return true
    }

    return false
}


module.exports = uploadClassPermission