import { useState } from "react"
import { useSignup } from "../Hooks/useSignup"
import Loader from "react-spinners/PacmanLoader";
import '../Styles/Auth.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h3>Sign up</h3>
 
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
                <p>Signing Up...</p>
              </div>
            : <button disabled={isLoading}>Sign Up</button>}
        
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup