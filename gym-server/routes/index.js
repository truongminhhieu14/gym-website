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
const { getAllTrainers, addTrainer, updateTrainer, deleteTrainer } = require('../controller/users/trainerController')
const uploadClassController = require('../controller/classes/uploadClass')
const getClassController = require('../controller/classes/getClass')
const updateClassController = require('../controller/classes/updateClass')
const paymentController = require('../controller/payment/paymentController')
const webhooks = require('../controller/payment/webhook')
const membershipController = require('../controller/payment/membershipController')
const getClassDetailController = require('../controller/classes/getClassDetails')
const { createTestimonial, getAllTestimonials } = require('../controller/testimonial/testimonialController')




router.post("/register", userRegisterController)
router.post("/signin", userSignInController)
router.get("/user-details", authMiddleware, userDetailsController)
router.get("/userLogout", userLogout)

// admin panel
router.get("/all-user",authMiddleware, allUsers)
router.post("/update-user",authMiddleware, updateUser)

// trainer
router.get("/trainers",authMiddleware, getAllTrainers);
router.post('/trainers',authMiddleware, addTrainer);
router.put('/trainers/:id',authMiddleware, updateTrainer);
router.delete('/trainers/:id',authMiddleware, deleteTrainer);

// class session
router.post("/upload-class",authMiddleware, uploadClassController)
router.get("/get-class", authMiddleware, getClassController)
router.post("/update-class", authMiddleware, updateClassController)
router.get("/class/:className", getClassDetailController)

// testimonial
router.post("/testimonial",authMiddleware, createTestimonial)
router.get("/testimonial", getAllTestimonials)

// payment
router.post("/checkout",authMiddleware, paymentController)
router.post("/webhook", webhooks)
router.get("/membership-list",authMiddleware, membershipController)


module.exports = router