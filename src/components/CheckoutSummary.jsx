import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../redux/slice/cartSlice'
import { Link } from 'react-router-dom'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectCartTotalAmount)
    const cartTotalQuantity=useSelector(selectCartTotalQuantity)
  return (
    <div>
      <h1>Checkout Summary</h1>
      <div>
        {cartItems.length==0 ?
            <>
                <p>No item in your cart</p>
                <Link class="btn btn-primary" to='/'>
                   &larr; Back to Home
                </Link>
            </>
            :
            <>
             <h4>{`Cart Item(s) : ${cartTotalQuantity}`}</h4>
            <h5>{`Subtotal: ${cartTotalAmount}`}</h5>
            {cartItems.map((item,index)=>
                <div class="card" key={index}>
                    <div class="card-body">
                        <h4 class="card-title">Product: {item.name}</h4>
                        <p class="card-text">Quantity: {item.cartQuantity}</p>
                        <p class="card-text">Unit Price: {item.price}</p>
                        <p class="card-text">Total: {item.price * item.cartQuantity}</p>
                    </div>
                </div>
            )}
            </>

        }
      </div>
    </div>
  )
}

export default CheckoutSummary
