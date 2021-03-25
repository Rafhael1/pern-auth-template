import React, {useState} from 'react'

import '../Form.scss'

import { toast } from 'react-toastify';


export default function Register() {

  const [input,
    setInput] = useState({name: "", email: "", password: "", confirmPassword: ""})

  const {name, email, password, confirmPassword} = input

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async(e) => {
    e.preventDefault()
    if (password !== confirmPassword){
      toast.error("Passwords don't match")
    } else {
      try {

        const body = {
          name,
          email,
          password
        };
  
        const baseURL = process.env.NODE_ENV === 'production' ? "api/auth/register" : "http://localhost:5000/api/auth/register"
  
        const res = await fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
  
        const parseRes = await res.json()
  
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token)
          toast.success("Registered Successfully")
        } else {
            console.log("Sheeeeeeeeesh")
        }
  
      } catch (error) {
        console.log(error.message)
      }
    } 
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h1>Register</h1>
        <label>Username</label>
        <input type="text" name="name" value={name} onChange={e => onChange(e)}/>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={e => onChange(e)}/>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}/>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => onChange(e)}/>
        <button onClick={onFormSubmit}>Submit</button>
      </form>
    </div>
  )
}
