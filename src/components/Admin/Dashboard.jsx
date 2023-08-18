import React from 'react'
import { FaShoppingBag, FaShoppingCart, FaUserAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../redux/slice/ProductSlice'
import { selectOrders } from '../../redux/slice/orderSlice'

const Dashboard = () => {
    const products=useSelector(selectProducts)
    const orders=useSelector(selectOrders)
  return (
    <div>
      <h1>My Dashboard</h1>
        <div className='row'>
            <div class="card col-3 m-2">
             <div class="card-body text-center">
                    <h4 class="card-title"><FaUserAlt size={40} /></h4>
                    <p class="card-text">Total Users</p>
                    <p class="card-text">100</p>
                </div>
        
            </div>
            <div class="card col-3 m-2">
             <div class="card-body text-center">
                    <h4 class="card-title"><FaShoppingBag size={40} /></h4>
                    <p class="card-text">Total Products</p>
                    <p class="card-text">{products.length}</p>
                </div>
        
            </div>
            <div class="card col-3 m-2">
             <div class="card-body text-center">
                    <h4 class="card-title"><FaShoppingCart size={40} /></h4>
                    <p class="card-text">Total Orders</p>
                    <p class="card-text">{orders.length}</p>
                </div>
        
            </div>
        </div>
    </div>
  )
}

export default Dashboard
