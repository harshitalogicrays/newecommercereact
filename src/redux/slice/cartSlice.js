import { act } from "react-dom/test-utils";
import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cartItems:[],
        cartTotalQuantity:0,
        cartTotalAmount:0,
        previousURL:""
    },
    reducers:{
        ADD_TO_CART(state,action){
            // console.log(action.payload)
            const productIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
            if(productIndex != -1){
                //item already exists in the cart so increasew qty by 1
                state.cartItems[productIndex].cartQuantity +=1
                toast.info(`${action.payload.name} increased by one`)
            }
            else{
                const pro={...action.payload , cartQuantity:1}
                state.cartItems.push(pro)
                toast.success(`${action.payload.name} added to cart`)
            }
       
        },
        DECREASE_CART(state,action){
            const productIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
            if(state.cartItems[productIndex].cartQuantity>1){
                state.cartItems[productIndex].cartQuantity -=1;
                toast.info(`${action.payload.name} drcease by one`)
            }
            else if(state.cartItems[productIndex].cartQuantity==1){
                state.cartItems[productIndex].cartQuantity =1;
            }
        },
        REMOVE_FROM_CART(state,action){
            const newCartItems=state.cartItems.filter((item)=>item.id!==action.payload.id)
            state.cartItems=newCartItems
            toast.success(`${action.payload.name} removed from cart`)
        },
        CLEAR_CART(state,action){
            state.cartItems=[]
            toast.info(`cart empty`)
        },
        CALCULATE_SUBTOTAL(state,action){
            const array=[];
            state.cartItems.map((item)=>{
                const {price,cartQuantity}=item
                const cartItemAmount=price*cartQuantity
                return array.push(cartItemAmount)
            })
            const totalAmount=array.reduce((a,b)=>a+b)
            state.cartTotalAmount = totalAmount;
        },
        CALCULATE_TOTAL_QUANTITY(state,action){
            const array=[]
            state.cartItems.map((item)=>{
                const {cartQuantity}=item
                const quantity=cartQuantity
                return array.push(quantity)
            })
            const totalQuantity=array.reduce((a,b)=>a+b)
            state.cartTotalQuantity=totalQuantity
        },
        SAVE_URL(state,action){
            state.previousURL=action.payload
        }
    }
})

export const{ADD_TO_CART,DECREASE_CART,REMOVE_FROM_CART,CALCULATE_SUBTOTAL,CALCULATE_TOTAL_QUANTITY,SAVE_URL,CLEAR_CART}=cartSlice.actions

export const selectCartItems=(state)=>state.cart.cartItems
export const selectCartTotalQuantity=(state)=>state.cart.cartTotalQuantity
export const selectCartTotalAmount=(state)=>state.cart.cartTotalAmount
export const selectPreviousURL=(state)=>state.cart.previousURL
export default cartSlice


