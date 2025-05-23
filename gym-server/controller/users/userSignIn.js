const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function userSignInController(req, res) {
    try {
        const {email, password} = req.body
        if(!email) {
            throw new Error("Please enter email")
        }
        if(!password){
            throw new Error("Please enter password")
        }

        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")           
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("Check password", checkPassword)
        if(checkPassword) {
            const tokenData = {
                _id : user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 8})
            const tokenOption = {
                httpOnly: true,
                secure: true,
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message : "Login successful",
                data : token,
                success : true,
                error : false
            })
        }else {
            throw new Error("Please check password")
        }
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }   
}

module.exports = userSignInController