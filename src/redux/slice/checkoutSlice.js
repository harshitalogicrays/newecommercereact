import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{shippingAddress:{}},
    reducers:{
        SAVE_SHIPPING_ADDRESS(state,action){
            state.shippingAddress=action.payload
            localStorage.setItem("shippingAddress",JSON.stringify(action.payload))
        }
    }
})
export const {SAVE_SHIPPING_ADDRESS}=checkoutSlice.actions
export const selectShippingAddress=(state)=>state.checkout.shippingAddress
export default checkoutSlice