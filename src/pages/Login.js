import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
 import { UserContext } from '../context/UserContext'
 import {Redirect, Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const { userState, fetchUser} = useContext(UserContext)
  const [user, setUser] = userState
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const loginForm = (e) => {
      e.preventDefault()
      
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email, password})
      .then((response) => {
          console.log(response)
          localStorage.setItem('userId', response.data.user_id)
          fetchUser()
          setShouldRedirect(true)
      })
  }

  return (
    <div className="loginPage">
    { shouldRedirect && <Redirect to={`/`} exact /> }
     <form className ="loginForm" onSubmit={loginForm}>
          <div className="headerForm">
            <p><Link to="/signup">Sign Up</Link></p> 
            <p><Link to="/login">Login</Link></p> 
          </div>
             <input className="inputForm" placeholder="Email" value={email} onChange ={(e) => setEmail(e.target.value)} />
             <input className="inputForm" placeholder="Password" value={password} onChange ={(e) => setPassword(e.target.value)} />
             <input className="loginButton" type="submit" value = "Login!"/>
         
     </form>
    </div>
  )
}

export default Login