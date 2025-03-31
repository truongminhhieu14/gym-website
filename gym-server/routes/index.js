const express = require('express')

const router = express.Router()


// controller
const userRegisterController = require('../controller/users/userRegister')
const userSignInController = require('../controller/users/userSignIn')
const authMiddleware = require('../middleware/authMiddleware')
const userDetailsController = require('../controller/users/userDetails')
const userLogout = require('../controller/users/userLogout')
const allUsers = require('../controller/users/allUser')
const updateUser = require('../controller/users/updateUser')


router.post("/register", userRegisterController)
router.post("/signin", userSignInController)
router.get("/user-details", authMiddleware, userDetailsController)
router.get("/userLogout", userLogout)

// admin panel
router.get("/all-user",authMiddleware, allUsers)
router.post("/update-user",authMiddleware, updateUser)

module.exports = router