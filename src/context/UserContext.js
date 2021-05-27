import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

const UserProvider = ({ children }) => {
const [user, setUser] = useState({})
const [products, setProducts] = useState ([])

 const fetchUser = () => {
    const userId = localStorage.getItem('userId')
    if (userId) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
            headers: {
                Authorization: userId
            }
        }).then((response) => {
        console.log(response)
        setUser(response.data.user)
        setProducts(response.data.products)
        })
    }
}

useEffect(fetchUser, [])

const state = {
    userState: [user, setUser],
    productState: [products, setProducts],
    fetchUser: fetchUser
}

return(
    <UserContext.Provider value = {state}>
        {children}
    </UserContext.Provider>
    )
}

export{UserProvider, UserContext}