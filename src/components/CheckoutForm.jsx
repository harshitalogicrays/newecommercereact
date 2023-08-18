import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectEmail, selectUserID } from '../redux/slice/authSlice'
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../redux/slice/cartSlice'
import { selectShippingAddress } from '../redux/slice/checkoutSlice'
import CheckoutSummary from './CheckoutSummary'
import SpinnerImg from '../assets/spinner.jpg'
import {Timestamp, addDoc, collection} from 'firebase/firestore'
import { db } from "../firebase/config";
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'
const CheckoutForm = () => {
    const [message,setMessage]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const stripe=useStripe()
    const elements=useElements()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userID=useSelector(selectUserID)
    const userEmail=useSelector(selectEmail)
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectCartTotalAmount)
    const shippingAddress=useSelector(selectShippingAddress)
    useEffect(()=>{
        const clientSecret=new URLSearchParams(window.location.search).get("payment_intent_client_secret")
    },[stripe])
    
    const saveOrder=()=>{
      const today=new Date()
      const date=today.toDateString()
      const time=today.toLocaleTimeString()
      const orderConfig={
        userID:userID,userEmail,orderDate:date,orderTime:time,
        orderAmount:totalAmount,orderStatus:"Order Placed",
        shippingAddress,cartItems,
        createdAt:Timestamp.now().toDate()
      }
      try{
          addDoc(collection(db,"orders"),orderConfig)
          dispatch(CLEAR_CART())
          toast.success("Order saved")
          navigate('/checkout-success')
          emailjs.send('service_6mb4fno','template_2r0rtef',{user_email:orderConfig.userEmail,subject:'order',amount:orderConfig.orderAmount,date:orderConfig.orderDate,orderStatus:orderConfig.orderStatus},'ouyyULNr1Fl9QYxiJ')
          .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
      }
      catch(error){
        toast.error(error.message)
      }
    }

 const handleSubmit=async(e)=>{
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    const confirmPayment=await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:"http://localhost:3000/checkout-success"
      },
      redirect:"if_required"
    }).then((result)=>{
        if(result.error){
          toast.error(result.error.message)
          setMessage(result.error.message)
          return;
        }
        if(result.paymentIntent){
          if(result.paymentIntent.status=="succeeded"){
            setIsLoading(false)
            toast.success("payment success")
            saveOrder()
           
          }
        }
    })
    setIsLoading(false)
 }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className='row mt-3'>
        <div className='card col-5 me-2'><CheckoutSummary/> </div>
        <div className='card col-5'>
            <h3>Stripe Checkout</h3>
            <PaymentElement id="payment-element"></PaymentElement>
            <button disabled={isLoading || !stripe || !elements} id="submit" 
            type="submit" className='btn btn-primary'>
                <span>
                    {isLoading?
                    <img src={SpinnerImg} alt="Loading" height="50px"/>
                    :<>(Pay Now)</>
                    }
                    
                </span>
            </button>
          {message && <div>{message}</div>}
        </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
