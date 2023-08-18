import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../customhooks/useFetchDocument'
import spinnerImg from '../../assets/spinner.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../redux/slice/cartSlice'
const ProductDetails = () => {
  const {id}=useParams()
  const {document} = useFetchDocument("products",id)
  const [product,setProduct]=useState(null)
  const cartItems=useSelector(selectCartItems)
  const cart=cartItems.find((item)=>item.id === id)
  const isCartAdded= cartItems.findIndex((item)=>item.id === id)
  console.log(product)
  const dispatch=useDispatch()
  useEffect(()=>{
      setProduct(document)
  },[document])

  const addtocart=(product)=>{
      dispatch(ADD_TO_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const decreasecart=(product)=>{
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  return (
    <div className='container mt-4'>
        <div className='col-12'>
          <h2>Product Details</h2>
          <Link to='/' className='btn btn-primary'>&larr; Back to Products</Link>
        </div>
        <div className='row mt-4 border p-5'>
          {product==null?
          <img src={spinnerImg} alt="Loading" style={{width:'50px'}}/>
          :
          <>
            <div className='col-4'>
              <img src={product.imageURL} alt={product.name} style={{border:'2px solid black'}}/>
          </div>
          <div className='col-8'>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.brand}</p>
              <p>{product.desc}</p>
              <div>
                {isCartAdded <0 ?null:(
                  <>
                  <button type="button" class="btn" onClick={()=>decreasecart(product)}>-</button>
                  {cart.cartQuantity}
                  <button type="button" class="btn" onClick={()=>addtocart(product)}>+</button>
                  </>
                )}
              </div>
              <button type="button" class="btn btn-danger" onClick={()=>addtocart(product)}>Add to Cart</button>
          </div>
        </>
    }
        </div>
    </div>
  )
}

export default ProductDetails
