import React from 'react'
import './LoginSignUp.css'
import successLogo from '../Assets/success-svgrepo-com.png'

const successPage = () => {
  return (
    <div className="successContainer">
      <img src={successLogo} alt="done" />
      <h1>Success</h1>

      <div>Your details are being reviewed. We will get back to you shortly!</div>
      </div>
  )
}

export default successPage