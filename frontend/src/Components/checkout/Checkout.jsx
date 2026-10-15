import { Button, Step, StepLabel, Stepper } from '@mui/material'
import AddressInfo from './AddressInfo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import toast from 'react-hot-toast';
import ErrorPage from './ErrorPage';
import PaymentMethod from './PaymentMethod';
import OrderSummary from './OrderSummary';
import StripePayment from './StripePayment';
import PaypalPayment from './PaypalPayment';
import Skeleton from '../shared/Skeleton';

const Checkout = () => {

    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { paymentMethod } = useSelector((state) => state.payment);
    const { cart, totalPrice } = useSelector((state) => state.carts)

    
    const { address, selectedUserCheckoutAddress } = useSelector(
        (state) => state.auth
    );

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    }

    const handleNext = () => {
        if(activeStep === 0 && !selectedUserCheckoutAddress){
            toast.error("Please select checkout address");
            return;
        }
        if(activeStep === 1 && !paymentMethod){
            toast.error("Please select checkout address");
            return;
        }
        
        setActiveStep((prevStep) => prevStep + 1);
    }

    const steps = [
        "Address",
        "Payment Method",
        "Order Summary",
        "Payment"
    ]

    useEffect(() => {
        dispatch(getUserAddresses());
    }, [dispatch]);

    return (
        <div className="py-14 pb-20 min-h-[calc(100vh-100px)]">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isLoading ? (
                <div className="max-w-md mx-auto pt-6">
                    <Skeleton/>
                </div>
            ) : (
                <div className="mt-5">
                    { activeStep===0 && <AddressInfo address = { address } />}
                    { activeStep===1 && <PaymentMethod /> }
                    { activeStep===2 && <OrderSummary
                                            totalPrice={totalPrice}
                                            cart={cart}
                                            address={selectedUserCheckoutAddress}
                                            paymentMethod={paymentMethod}
                                            /> }
                    { activeStep===3 &&
                        <>
                            {paymentMethod === "stripe" ? (
                                <StripePayment/>
                            ) : (
                                <PaypalPayment/>
                            )}
                        </> }
                </div>
            )}

            <div
                className="flex justify-between items-center px-4 fixed z-50 h-18 bottom-0 bg-white left-0 w-full py-4 border-t border-slate-300"
                style={{boxShadow: "0 -3px 12px rgba(100, 100, 100, 0.50)"}}>
                <Button
                    variant="outlined"
                    disabled={activeStep===0}
                    onClick={handleBack}>
                        Back
                </Button>

                <button
                    variant="outlined"
                    disabled={
                        activeStep===3 ||
                        errorMessage || (
                            ( activeStep===0 ? !selectedUserCheckoutAddress
                                : activeStep===1 ? !paymentMethod 
                                : false

                            )
                    )}
                    className={`bg-custom-blue font-semibold px-6 h-10 rounded-md text-white
                        ${
                            errorMessage || 
                            ( activeStep===0 && !selectedUserCheckoutAddress) ||
                                (activeStep===1 && !paymentMethod) 
                                ? "opacity-60"
                                : ""
                        }`}
                    onClick={handleNext}>
                        Next
                </button>
                
            </div>
            {errorMessage && <ErrorPage message={errorMessage}/>}
            
        </div>
    )
}

export default Checkout
