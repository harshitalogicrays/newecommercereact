import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../redux/slice/cartSlice'

const ProductItem = ({id,name,price,desc,category,brand,imageURL,product}) => {
  const dispatch=useDispatch()
  const addtocart=(product)=>{
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
}
  return (
  <div class="card col-2 m-2">
    <Link to={`/product-details/${id}`}>
    <img class="card-img-top" src={imageURL} height={150} alt="Title"/></Link>
    <div class="card-body">
        <h4 class="card-title">{name}</h4>
        <h4 class="card-title">{category}</h4>
        <h4 class="card-title">{brand}</h4>
        <p class="card-text">{price}</p>
        <button type="button" class="btn btn-danger" onClick={()=>addtocart(product)}>Add to Cart</button>
    </div>
  </div>
  )
}

export default ProductItem
