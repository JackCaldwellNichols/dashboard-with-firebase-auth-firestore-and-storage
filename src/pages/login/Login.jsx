import React, { useState, useRef, useContext } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import './login.scss'
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
const {dispatch} = useContext(AuthContext)
const [error, setError] = useState(false)
const [loading, setLoading] = useState(false)
const emailRef = useRef()
const passwordRef = useRef()
const navigate = useNavigate()
const handleLogin = (e) => {
  e.preventDefault()
  setLoading(true)
  signInWithEmailAndPassword(auth,  emailRef.current.value, passwordRef.current.value)

  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch({type: 'LOGIN', payload: user}) 
    navigate('/')
    setLoading(false)
  })
  .catch((error) => {
    console.log(error)
    setError(true)
    setLoading(false)
    // ..
  });

}

  return (
    <div className='login'>
      <form onSubmit={handleLogin}>
      <h1>Login</h1>
        <input type="email" placeholder='Email' ref={emailRef}/>
        <input type="password" placeholder='Password' ref={passwordRef}/>
        <button type='submit' disabled={loading}>Login</button>
        {error && <span>Wrong email or password </span>}
      </form>
    </div>
  )
}

export default Login