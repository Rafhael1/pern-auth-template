import React, {useState} from 'react'

export default function Login() {

  const [input,
    setInput] = useState({ email: "", password: ""})

  const { email, password} = input

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = async(e) => {
    e.preventDefault()
    try {

      const body = {
        email,
        password
      };

      const baseURL = process.env.NODE_ENV === 'production' ? "api/auth/login" : "http://localhost:5000/api/auth/login"

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
      } else {
          console.log(parseRes)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={e => onChange(e)}/>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}/>
        <button onClick={onFormSubmit}>Submit</button>
      </form>
    </div>
  )
}
