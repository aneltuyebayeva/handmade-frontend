import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import CartItems from '../components/CartItems'

const Cart = (props) => {
const { userState, fetchUser } = useContext(UserContext)
const [user, setUser] = userState
const [cartItems, setCartItems] = useState([])
const [shouldReload, setShouldReload] = useState(true)
const [cartTotal, setCartTotal] = useState(0);
const [productValue, setProductValue] = useState({})

const fetchAllCartItems = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
        headers: {
            Authorization: localStorage.getItem('userId')
        }
    }).then((response) => {
        console.log(response.data.products)
          setCartItems(response.data.products)

    })
}

useEffect(fetchAllCartItems, [])

return (
    <div>
        {cartItems.length > 0 ? 
            cartItems.map((product) => {
            return <CartItems cartItems={cartItems} setCartTotal={setCartTotal} product={product} fetchAllCartItems={fetchAllCartItems} />
          })
          :
          <p className="cartEmpty">YOUR CART IS EMPTY</p>
        }
        <div>
            <p className="totalPrice">Total: ${cartTotal}</p>
        </div>
        <div className="checkoutCart">
           <Link to={`/mycart/checkout`}><button className="checkoutButton">Check out</button></Link> 
        </div>
      </div>
    )
}


export default Cart