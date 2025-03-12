import { useState } from "react"
import { useLogin } from "../Hooks/useLogin"
import Loader from "react-spinners/PacmanLoader";
import '../Styles/Auth.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (

        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Log in</h3>
 
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />

            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={isLoading}
            />

            
              {isLoading ?
              <div className="loader">
                <Loader
                  color={"#2c3e50"}
                  loading={isLoading}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p>Logging In...</p>
              </div>
            
            : <button disabled={isLoading}> Log In</button>}
        
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login