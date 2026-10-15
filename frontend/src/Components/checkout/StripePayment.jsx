import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./PaymentForm";
import { useEffect } from "react";
import { createStripePaymentSecret } from "../../store/actions";
import Skeleton from "../shared/Skeleton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const StripePayment = () => {
  const dispatch = useDispatch();
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress} = useSelector((state) => state.auth);

  useEffect(() => {
    if(!clientSecret){  
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "usd",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.email}`,
        metadata: {
          test: "1"
        }
      };
      dispatch(createStripePaymentSecret(sendData));
    }
  }, [clientSecret]);

  if(isLoading){
    return(
      <div className="max-w-lg mx-auto">
        <Skeleton/>
      </div>
    )
  }

  return (
    <>
      {clientSecret && (
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <PaymentForm clientSecret = {clientSecret} totalAmount={totalPrice}/>
      </Elements>
      )}
    </>
  )
}

export default StripePayment
