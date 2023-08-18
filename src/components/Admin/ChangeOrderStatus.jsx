import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchDocument from '../../customhooks/useFetchDocument'
import Loader from '../Loader'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

const ChangeOrderStatus = ({order,id,s}) => {
    let [status,setStatus]=useState(s)
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const {document}=useFetchDocument("orders",id)
    const handleSubmit=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const orderConfig={
            userID:order.userID,
            userEmail:order.userEmail,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            orderAmount:order.orderAmount,
            orderStatus:status,
            shippingAddress:order.shippingAddress,
            cartItems:order.cartItems,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toDate()
          } 
          try{
            setDoc(doc(db,"orders",id),orderConfig)
            setIsLoading(false)
            toast.success("Order status changed")
            navigate('/admin/orders')
            emailjs.send('service_6mb4fno','template_2r0rtef',{user_email:orderConfig.userEmail,subject:'order',amount:orderConfig.orderAmount,date:orderConfig.orderDate,orderStatus:orderConfig.orderStatus},'ouyyULNr1Fl9QYxiJ')
      .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
          }
          catch(error){
            setIsLoading(false)
            toast.error(error.message)
          }
    }
    return (
    <div className='container'>
        {isLoading && <Loader/>}
        <div className='card col-8 p-3'>
            <h4>Update Order Status</h4>
            <form onSubmit={handleSubmit}>
            <select className='form-select mb-3' value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="">-----choose one-------</option>
                <option>Order Placed</option>
                <option>Processing...</option>
                <option>Shipped...</option>
                <option>Delivered</option>
            </select>
            <button type="submit" class="btn btn-primary">Update Status</button>
            </form>
        </div>
    </div>
  )
}

export default ChangeOrderStatus
