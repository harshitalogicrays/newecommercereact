import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from '../redux/slice/cartSlice'
import { selectShippingAddress } from '../redux/slice/checkoutSlice'
import {selectEmail} from '../redux/slice/authSlice'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
const stripePromise=loadStripe('pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw')

const Checkout = () => {
    const [message,setMessage]=useState("Initializing checkout")
    const [clientSecret,setClientSecret]=useState("")
    const cartItems=useSelector(selectCartItems)
    const totalAmount=useSelector(selectCartTotalAmount);
    const shippingAddress=useSelector(selectShippingAddress)
    const userEmail=useSelector(selectEmail)
    const dispatch=useDispatch()
    // useEffect(()=>{
    //   dispatch(CALCULATE_SUBTOTAL())
    //   dispatch(CALCULATE_TOTAL_QUANTITY())
    // },[dispatch,cartItems])

    const description=`myShop payment: email:${userEmail} Amount:${totalAmount}`
    useEffect(()=>{
        fetch("http://localhost:1000/payment",{
            method:"POST",
            headers:{"Content-Type":'application/json'},
            body:JSON.stringify({
              items:cartItems,userEmail:userEmail,shipping:shippingAddress,
              description:description
            })
        }).then((res)=>{return res.json()})
          .then(data=>setClientSecret(data.clientSecret))
          .catch(error=>{
            setMessage("Failed to initialize checkout")
            toast.error('Something went wrong')
          })
    },[])
    const appearance={theme:'stripe'}
    const options={clientSecret,appearance}
    return (
    <>
      <div className='container'>
        {!clientSecret && <h3>{message}</h3>}
      </div>
      {
        clientSecret &&(
          <Elements options={options} stripe={stripePromise}>
              <CheckoutForm/>
          </Elements>
        )
      }
    </>
  )
}

export default Checkout
