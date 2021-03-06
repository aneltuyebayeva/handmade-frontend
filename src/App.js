import {useContext} from 'react'
import {UserContext} from './context/UserContext'
import { Route, Redirect } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AllProducts from './pages/AllProducts';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyOrders from './pages/MyOrders'
import SingleOrder from './pages/SingleOrder'

function App() {
const { userState, fetchUser } = useContext(UserContext)
const [user, setUser] = userState

  return (
    <div className="App">
      <Navbar />
      <Route path="/" exact render={() => {
          return <Home />
      }}/>
      <Route path="/signup" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Signup />
        }
      }}/>
      <Route path="/login" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Login />
        }
      }}/>
      <Route path="/products" exact render={() => {
        if (user.id) {
          return <AllProducts />          
        } else {
          return <Redirect to="/" exact />         
        }
      }}/> 
      <Route path="/products/:id" exact render={(routingInfo) => {
          if (user.id) {
            return <SingleProduct id={routingInfo.match.params.id} />            
          } else {
            return <Redirect to="/" exact />
          }
        }}/>
      <Route path="/mycart" exact render={() => {
        if (user.id) {
          return <Cart />          
        } else {
          return <Redirect to="/" exact />         
        }
      }}/> 
        <Route
        path="/mycart/checkout" exact render={() => {
          if (user.id) {
            return <Checkout />
          } else {
            return <Redirect to="/" exact /> 
          }
        }}/> 
      <Route path="/myorders" exact render={() => {
        if (user.id) {
          return <MyOrders />
        } else {
          return <Redirect to="/" exact /> 
        }  
        }}/> 
      <Route path="/myorders/:id" exact component={SingleOrder}/>
    </div>
  );
}

export default App;
