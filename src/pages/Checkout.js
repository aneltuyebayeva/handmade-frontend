import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import { UserContext } from '../context/UserContext'

const Checkout = (props) => {
    const [shouldRedirect, setShouldRedirect] = useState(null)
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const [order, setOrder] = useState({
      address: '',
      credit_card: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setOrder({
          ...order,
          [name]: value
        })
      }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, order, {
          headers: {
            Authorization: localStorage.getItem('userId')
          }
        }).then((response) => {
          console.log(response.data);
          setShouldRedirect(response.data)
      })

    }

    return (
        <div>
            <form className="checkoutForm" onSubmit={handleSubmit}>
          
          <input name="address" placeholder="Address" value={order.address} onChange={handleChange} />
          <input name="credit_card" placeholder="Credit Card Number" value={order.credit_card} onChange={handleChange} />
         
        <input className="submitCheckout" type="submit" value="Place order" />
        </form>
        </div>
    )
}
export default Checkout