import React, { useEffect } from 'react'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrders, store_order } from '../../redux/slice/orderSlice'
import { selectUserID } from '../../redux/slice/authSlice'
import Loader from '../Loader'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
    const {data,isLoading}=useFetchCollection("orders")
    const dispatch=useDispatch()
    const orders=useSelector(selectOrders)
    const userID=useSelector(selectUserID)
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(store_order(data))
    },[dispatch,data])

    const handleClick = (id,orderStatus) => {
        if(orderStatus=="Delivered")
            navigate('/admin/orders')
          else
            navigate(`/admin/order-details/${id}/${orderStatus}`);
      };
  return (
    <div className='mt-4'>
      <h1>Orders</h1>
      {isLoading && <Loader/>}
      {orders.length==0?
      <p>No order Found</p>
        :
        <>
         <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={()=>handleClick(id,orderStatus)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? "text-danger"
                                : "text-success"
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>   
        </>
    }
    </div>
  )
}

export default Orders
