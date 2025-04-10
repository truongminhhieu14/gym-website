const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema({
    membershipDetails : {
        type: Array,
        default: []
    },
    email: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        default: ""
    },
    paymentDetails: {
        paymentIntentId: {
            type: String,
            default: ""
        },
        payment_method_type: [],
        payment_status: {
            type: String,
            default: ""
        }
    },
    totalAmount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const membershipModel = mongoose.model("membership", membershipSchema);

module.exports = membershipModel