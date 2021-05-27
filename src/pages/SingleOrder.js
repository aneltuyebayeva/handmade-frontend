import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const SingleOrder= (props) => {
    const [orders, setOrders] = useState ({})
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const [shouldRedirect, setShouldRedirect] = useState(null)
    const [shouldReload, setShouldReload] = useState(true)
    const [cartTotal, setCartTotal] = useState(0);

    const fetchSingleOrder = async () => {
      console.log(props.location.state.orderId)

       let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/${props.location.state.orderId}`,{
            headers: {
              Authorization: localStorage.getItem('userId')
            }
          })
        //.then((response) => {
          console.log('RESPONSE')
        console.log(response)
         setOrders(response.data) 
         setShouldReload(false)
   
        //})
       }
      
    useEffect(() => {
      fetchSingleOrder();
 
    }, [])
    //useEffect(fetchSingleOrder, [shouldReload])

  
    const total = () => {
        let totalVal = 0;
        if(orders.products){
          for (let i = 0; i < orders.products.length; i++) {
            totalVal += parseInt(orders.products[i].price)

          }
        }
        setCartTotal(totalVal.toFixed(2));
      };

      useEffect(() => {
        total();
      }, [orders]);

    return (
        <div>
          { shouldRedirect && <Redirect to={shouldRedirect} /> }
          <h2 className="orderHeader">Order Details</h2>
          {
        orders.products ? 
        orders.products.map((product) => {
          return <div className="singleOrder">
            <span key={product.id}></span>
            <div className="cartProductImage"><Link to={`/products/${product.id}`}><img className='thumbnail' src={product.image}/></Link></div>
            <div className="productDetails">
                <p>{product.name}</p>
                <span>$ {product.price}</span>
            </div>
          </div>

        })
        :
        <p>You don't have any orders yet..</p>
      }
        <div>
                {
                    orders.products && orders.order && 
                    <>
                    <div className="orderDetails">
                        <p>Total price: ${cartTotal}</p> 
                        <p>Shipping Address: {orders.order.address}</p> 
                    </div>
                    
                    </>
                }
            </div>
        </div>
    )
}

export default SingleOrder