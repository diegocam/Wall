import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return <div>
            Wall

            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/">Wall</Link>
            </div>
        </div>
}

export default Navbar