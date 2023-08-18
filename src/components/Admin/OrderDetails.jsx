import React, { useEffect, useState } from 'react'
import useFetchDocument from '../../customhooks/useFetchDocument'
import { Link, useParams } from 'react-router-dom'
import spinnerImg from '../../assets/spinner.jpg'
import ChangeOrderStatus from './ChangeOrderStatus'
const OrderDetails = () => {
    const {id,orderstatus}=useParams()
    const {document} =useFetchDocument("orders",id)
    const [order,setOrder]=useState(null)
    useEffect(() => {
        setOrder(document);
      }, [document]);
    
  return (
    <>
    <div>
      <h2>Order Details</h2>
      <div>
        <Link to="/admin/orders">&larr; Back To Orders</Link>
      </div>
      <br />
      {order === null ? (
        <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
      ) : (
        <>
          
            <b>Shipping Address</b>
            <br />
            Address: {order.shippingAddress.line1},
            {order.shippingAddress.line2}, {order.shippingAddress.city}
            <br />
            State: {order.shippingAddress.state}
            <br />
            Country: {order.shippingAddress.country}
          <br />
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{price}</td>
                    <td>{cartQuantity}</td>
                    <td>{(price * cartQuantity)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <ChangeOrderStatus order={order} id={id} s={orderstatus} />
    </div>
  </>
  )
}

export default OrderDetails
