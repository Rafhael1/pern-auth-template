import React from 'react'

import {Link} from "react-router-dom";

export default function Home({isAuthenticated}) {
    return (
        <div>
            {
                isAuthenticated === true ? <h1>You are already logged in</h1> : null
            }
            <Link to="/login" ><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </div>
    )
}
