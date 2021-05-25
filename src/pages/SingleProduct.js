import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const SingleProduct = (props) => {
    const [product, setProduct] = useState ({})
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const [shouldRedirect, setShouldRedirect] = useState(null)
    const [shouldReload, setShouldReload] = useState(true)

    const fetchSingleProduct = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${props.id}`,{
            headers: {
              Authorization: localStorage.getItem('userId')
            }
          })
        .then((response) => {
        console.log(response.data)
         setProduct(response.data.product) 
         setShouldReload(false)
        })
       }
      
    useEffect(fetchSingleProduct, [])
    useEffect(fetchSingleProduct, [shouldReload])

    const addToCart = (e) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/carts`, {
            product_id: product.id
        },
            { headers: { 
                    Authorization: localStorage.getItem('userId')
                }
          })
        .then((response) => {
            console.log(response)
            console.log('added to cart')
        })
       }

    return (
        <div>
          { shouldRedirect && <Redirect to={shouldRedirect} /> }

            <div className="singleProductContainer">
                <div className="singleLeft">
                    <Link to={'/products'}><button className="backToAllButton">Back to All Products</button></Link >
                    <img className='image' src={product.image}/>  
                </div>
                <div className="singleRight">
                    <h2>{product.name}</h2>
                    <p className="productDescription">{product.description}</p>
                    <h1>$ {product.price}</h1>
                    <div>
                       <button className="addToCartButton" onClick={addToCart}>Add To Cart</button> 
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default SingleProduct