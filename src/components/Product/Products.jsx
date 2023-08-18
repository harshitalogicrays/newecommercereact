import React, { useEffect } from 'react'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { selectProducts, store_product } from '../../redux/slice/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from './ProductList'
import { selectFilteredProducts } from '../../redux/slice/filterSlice'

const Products = () => {
    const{data,isLoading}=useFetchCollection("products")
    const dispatch=useDispatch()
    // const products=useSelector(selectProducts)
    const filterProducts=useSelector(selectFilteredProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    })
    return (
    <>
      <ProductList products={filterProducts}/>
    </>
  )
}

export default Products
