import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router'
import { UserContext } from '../context/UserContext'

const Checkout = (props) => {
    const [shouldRedirect, setShouldRedirect] = useState(null)
    const { userState, fetchUser, productState } = useContext(UserContext)
    const [user, setUser] = userState
    const [products, setProducts] = productState

    useEffect (() => {
      fetchUser()
    },[])

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
        let userProducts = products.map((product) => {
        return {...product, quantity: localStorage.getItem(product.id)}})
        console.log(userProducts)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, {order, userProducts}, {
          headers: {
            Authorization: localStorage.getItem('userId')
          }
        }).then((response) => {
          console.log(response.data)
          response.data.products.forEach(product => localStorage.removeItem(product.id))
          setShouldRedirect(response.data)
      })

    }

    return (
        <div>
          { shouldRedirect && <Redirect to={`/myorders`} exact /> }
            <form className="checkoutForm" onSubmit={handleSubmit}>
          
          <input name="address" placeholder="Address" value={order.address} onChange={handleChange} />
          <input name="credit_card" placeholder="Credit Card Number" value={order.credit_card} onChange={handleChange} />
         
        <input className="submitCheckout" type="submit" value="Place order" />
        </form>
        </div>
    )
}
export default Checkout