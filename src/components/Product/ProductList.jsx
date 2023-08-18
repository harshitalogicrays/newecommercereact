import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <>
      {products.length==0?
       (<h3>No product found</h3>):(
        <div className='row'>
        {products.map((product,index)=>
            <ProductItem {...product} key={index} product={product}/>     
        )}  
        </div>
      )}
    </>
  )
}

export default ProductList
