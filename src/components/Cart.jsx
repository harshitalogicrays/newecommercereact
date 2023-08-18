import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalQuantity } from '../redux/slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { selectIsLoggedIn } from '../redux/slice/authSlice'

const Cart = () => {
    const cartItems=useSelector(selectCartItems)
    const totalqty=useSelector(selectCartTotalQuantity)
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(CALCULATE_SUBTOTAL()); dispatch(CALCULATE_TOTAL_QUANTITY());
        dispatch(SAVE_URL(""))
    },[cartItems,dispatch])
    const addtocart=(cart)=>{
        dispatch(ADD_TO_CART(cart))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }
  
    const decreasecart=(cart)=>{
      dispatch(DECREASE_CART(cart))
      dispatch(CALCULATE_TOTAL_QUANTITY())
    }
    const removeFromCart=(cart)=>{
        dispatch(REMOVE_FROM_CART(cart))
        dispatch(CALCULATE_TOTAL_QUANTITY())
    }
    const clearcart=()=>(dispatch(CLEAR_CART()))
    const url = window.location.href;
    const checkout=()=>{
        if(isLoggedIn){
            navigate('/checkout-details')
        }
        else{
            dispatch(SAVE_URL(url))
          navigate('/login')
        }
    }
 
  return (
    <div className='container mt-5'>
        <h1>Shopping Cart</h1>
         {cartItems.length === 0 ? 
            <>
            <p>Your cart is empty</p> <br/>
            <Link to='/' className="btn btn-primary">&larr; Back to Products </Link>
            </>
        :   <>            <div class="table-responsive">
                <table class="table table-striped
                table-hover	
                table-borderless
                table-primary
                align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>Sr. NO</th>
                            <th>Name</th>
                            <th>imageURL</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            {cartItems.map((cart,index)=>{
                            const {id,name,price,imageURL, cartQuantity}=cart
                            return(
                            <tr class="table-primary" key={index} >
                                <td>{index+1}</td>
                                <td>{name}</td>
                                <td><img src={imageURL} alt={name} style={{width:'50px',height:'50px'}}/></td>
                                <td>{price}</td>
                                <td> <button type="button" class="btn" onClick={()=>decreasecart(cart)}>-</button>
                                {cartQuantity}
                                  <button type="button" class="btn" onClick={()=>addtocart(cart)}>+</button></td>
                                  <td>{(price*cartQuantity.toFixed(2))}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" onClick={()=>removeFromCart(cart)}>
                                    <FaTrashAlt/></button>
                                       </td>
                            </tr>)
                             } )}
                        </tbody>
                    </table>
            </div>
            <div class="row">
                <div className='col-4'>
                <button type="button" class="btn btn-danger" onClick={clearcart}>Clear Cart</button>
                </div>
                <div className='col-3 offset-5'>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">{`Cart Item(s) :${totalqty}`}</h4>
                            <p class="card-text">Tax and Shipping calcualted at checkout</p>
                            <div class="d-grid gap-2">
                              <button type="button" name="" id="" class="btn btn-primary" onClick={checkout}>Checkout</button>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            
            </>

        }   
    </div>
  )
}

export default Cart
