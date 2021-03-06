import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ProductsList = (props) => {
  const [allProducts, setAllProducts] = useState([])
  const { userState, fetchUser } = useContext(UserContext)
  const [user, setUser] = userState
  
  
  const fetchAllProducts = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}${props.route}`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
    .then((response) => {
      setAllProducts(response.data.products)
    })
  }
  useEffect(fetchAllProducts, [])
  
  return (
    <div className="productsList">
      {
        allProducts.length ? 
        allProducts.map((product) => {
          return <div className="singleProduct">
            <span key={product.id}>
            {localStorage.getItem('userId') ?
            <div>
            <div className="productImage"><Link to={`/products/${product.id}`}><img className='thumbnail' src={product.image}/></Link></div>
            <div className="productName"><Link to={`/products/${product.id}`}>{product.name}</Link></div>              
            </div>
            
            :
            <div>
            <div className="productImage"><Link to={'/login'}><img className='thumbnail' src={product.image}/></Link></div>
            <div className="productName"><Link to={'/signup'}>{product.name}</Link></div>               
            </div>
 
            }
            </span>
          </div>
        })
        :
        <p>Loading...</p>
      }
    </div>
  )
}

export default ProductsList