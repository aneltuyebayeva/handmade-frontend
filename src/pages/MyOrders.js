import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import { UserContext } from '../context/UserContext'

const MyOrders = (props) => {
  const [allOrders, setAllOrders] = useState([])
  const { userState, fetchUser } = useContext(UserContext)
  const [user, setUser] = userState
  
  
  const fetchAllOrders = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
    .then((response) => {
        console.log(response.data.orders)
      setAllOrders(response.data.orders)
    })
  }
  useEffect(fetchAllOrders, [])


  return (
    <div className="ordersList">
      {
        allOrders.length ? 
        allOrders.map((order) => {
          return <div key={order.id} className="orderNumber">
            <span key={order.id}>
              <div><Link  to={{pathname: `/myorders/${order.id}`, state: {orderId:order.id}}}>Order number: {order.id}</Link></div>
            </span>
          </div>

        })
        :
        <p>You don't have any orders yet..</p>
      }
    </div>
  )
}

export default MyOrders