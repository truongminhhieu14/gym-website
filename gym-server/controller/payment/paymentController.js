const Stripe = require('../../config/stripe')
const userModel = require('../../models/userModel')

const paymentController = async(req, res)=>{
    try {
        const { membershipTitle, membershipPrice } = req.body

        const user = await userModel.findOne({ _id : req.userId })

        const params = {
            submit_type : 'pay',
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            customer_email : user.email,
            metadata : {
                userId : req.userId 
            },
            line_items : [
                {
                    price_data : {
                        currency : 'vnd',
                        product_data : {
                            name : membershipTitle,
                            metadata : {
                                membershipTitle
                            }
                        },
                        
                        unit_amount : membershipPrice
                    },
                    quantity: 1,               
                }
            ],
            success_url : `${process.env.FRONTEND_URL}/success`, 
            cancel_url : `${process.env.FRONTEND_URL}/cancel`, 

        }

        const session = await Stripe.checkout.sessions.create(params)

        res.status(303).json(session)
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
        
    }
}

module.exports = paymentController