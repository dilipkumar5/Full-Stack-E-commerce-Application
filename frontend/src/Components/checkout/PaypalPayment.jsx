import { Alert, AlertTitle } from "@mui/material"

const PaypalPayment = () => {
  return (
    <div className="h-96 flex justify-center items-center">
        <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
            <AlertTitle>Paypal unavailable</AlertTitle>
            Paypal Payment is not available yet. Please use another payment method.
        </Alert>
    </div>
  )
}

export default PaypalPayment
