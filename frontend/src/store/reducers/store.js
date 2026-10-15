import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentReducer } from "./paymentReducer";

const user = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        :  null;

const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];

const initialState = {
    auth: { user: user, selectUserCheckoutAddress },
    carts: { cart: cartItems }
}

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentReducer
    },
    preloadedState: initialState
});

export default store;