// usePayment.ts

import SummaryApi from "@/services/SummaryApi";
import { loadStripe } from "@stripe/stripe-js";


export const usePayment = () => {
  const handlePayment = async (membership: { title: string; price: string }) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    console.log("key", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    
    // Call the backend to create a payment session
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membershipTitle: membership.title,
        membershipPrice: membership.price,
      }),
    });
    
    const responseData = await response.json();
    console.log("payment res", responseData);

    if (responseData?.id) {
      stripe?.redirectToCheckout({ sessionId: responseData.id });
    }
  };

  return { handlePayment };
};
