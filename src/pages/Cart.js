import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Cart = (props) => {
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const [cartItems, setCartItems] = useState([])
    const [shouldReload, setShouldReload] = useState(true)
    const [cartTotal, setCartTotal] = useState(0);

    const fetchAllCartItems = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
            headers: {
              Authorization: localStorage.getItem('userId')
            }
          })
        .then((response) => {
            console.log(response.data.products)
          setCartItems(response.data.products)
          setShouldReload(false)
        })
      }
      useEffect(fetchAllCartItems, [])
      useEffect(fetchAllCartItems, [shouldReload])


    
      const total = () => {
        let totalVal = 0.00;
        for (let i = 0; i < cartItems.length; i++) {
          totalVal += parseInt(cartItems[i].price)

        }
        setCartTotal(totalVal);
      };

      useEffect(() => {
        total();
      }, [cartItems]);

    return (
        <div>
        {
          cartItems.length > 0 ? 
          cartItems.map((product) => {
            return <div className="cartContainer">
                    <span key={product.id}></span>
                <div className="myCartList">
                    <div className="cartProductImage"><Link to={`/products/${product.id}`}><img className='thumbnail' src={product.image}/></Link></div>
                    <div className="cartProductDescription">
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                        <button className="removeFromCartButton"onClick = {() =>(
                        axios.delete (`${process.env.REACT_APP_BACKEND_URL}/carts/${product.id}`, {
                        headers: {
                            Authorization: localStorage.getItem('userId')
                        }
                        }).then((response) => {
                            console.log(response)
                            setShouldReload(!shouldReload)
                        })
                        )} >Remove from cart</button>
                        </div>
                        <div className="cartProductPrice">
                            <span>$ {product.price}</span>
                        </div>
                </div>
            </div>
  
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