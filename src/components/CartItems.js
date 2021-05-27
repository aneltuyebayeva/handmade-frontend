import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CartItems = (props) => {
const [quantity, setQuantity] = useState (localStorage.getItem(props.product.id))

const handleChange =(e, id) => {
    localStorage.setItem(id, e.target.value)
    setQuantity(e.target.value)
}

const total = () => {
    let totalVal = 0.00;
    for (let i = 0; i < props.cartItems.length; i++) {
        totalVal += parseFloat(props.cartItems[i].price*localStorage.getItem(props.cartItems[i].id))
    }
        props.setCartTotal(totalVal.toFixed(2));
};

useEffect(() => {
    total();
}, [quantity]);

    return (
        <div className="cartContainer">
                    <span key={props.product.id}></span>
                    <div className="myCartList">
                    <div className="cartProductImage"><Link to={`/products/${props.product.id}`}><img className='thumbnail' src={props.product.image}/></Link></div>
                    <div className="cartProductDescription">
                        <Link to={`/products/${props.product.id}`}>{props.product.name}</Link>
                        <button className="removeFromCartButton"onClick = {() =>(
                        axios.delete (`${process.env.REACT_APP_BACKEND_URL}/carts/${props.product.id}`, {
                        headers: {
                            Authorization: localStorage.getItem('userId')
                        }
                        }).then((response) => {
                            console.log(response)
                            props.fetchAllCartItems()
                            localStorage.removeItem(props.product.id)

                        })
                        )} >Remove from cart</button>
                    </div>
                    <div className="cartProductQuantity">
                    <input className="quantityProduct" type="number" min="1" value = {quantity} onChange={(e) => handleChange(e, props.product.id)}/>                        
                    </div>
                    <div className="cartProductPrice">$ {(props.product.price*quantity).toFixed(2)}</div>
                </div>
            </div>
    )
}

export default CartItems