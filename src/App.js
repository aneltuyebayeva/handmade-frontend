import {useContext} from 'react'
import {UserContext} from './context/UserContext'
import { Route, Redirect } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
const { userState, fetchUser } = useContext(UserContext)
const [user, setUser] = userState


  return (
    <div className="App">
      <Navbar />
      <Route path="/" exact
        render={() => {
          return <Home />
        }}
      />
      <Route path="/signup" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Signup />
        }
      }}  />
      <Route path="/login" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Login />
        }
      }}  />

    </div>
  );
}

export default App;
