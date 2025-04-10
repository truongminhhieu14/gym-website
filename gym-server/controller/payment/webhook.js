const stripe = require('../../config/stripe')
const membershipModel = require('../../models/membershipModel')
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY

async function getLineItems(lineItems) {
    let MembershipItems = []
    if(lineItems?.data?.length) {
        for(const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            const membershipId = product.metadata.membershipId

            const membershipData = {
                membershipId: membershipId,
                name: product.name,
                price: item.price.unit_amount,
                quantity: item.quantity
            }

            MembershipItems.push(membershipData)

        }
    } 
    return MembershipItems;      
}
const webhooks = async(request, response) => {

    const payloadString = JSON.stringify(request.body)
    const headers = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret
    })

    let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        headers,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      const membershipDetails = await getLineItems(lineItems)

      const membershipDetail = {
        membershipDetails: membershipDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
            paymentIntentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status
        },
        totalAmount: session.amount_total
      }
      const memberships = new membershipModel(membershipDetail)
      const saveMembership = await memberships.save()
      break;

    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  response.status(200).send();
}

module.exports = webhooks