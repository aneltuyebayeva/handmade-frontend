import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState ('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, { name, email, password})
        .then((response) => {
            console.log(response)
            localStorage.setItem('userId', response.data.user_id)
            fetchUser()
            setShouldRedirect(true)
        })
    }

    return (
      <div className="signupPage">
        { shouldRedirect && <Redirect to={`/dashboard`} exact /> }
       
       <form className="signupForm" onSubmit={submitForm}>
          <h2>Sign up</h2> 
               <input className="inputForm" placeholder="Name" value={name} onChange ={(e) => setName(e.target.value)} />
               <input className="inputForm" placeholder="Email" value={email} onChange ={(e) => setEmail(e.target.value)} />
               <input className="inputForm" placeholder="Password" value={password} onChange ={(e) => setPassword(e.target.value)} />
               <input className="button" type="submit" value = "Sign Up"/> 
       </form>
      </div>
    )
}

export default Signup

