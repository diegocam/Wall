import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light px-0">
                <Link to="/" className="navbar-brand"><strong>The Wall</strong></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link to="/posts" className="nav-link">Posts</Link>
                        </li>
                    </ul>
                    <Link role="button" to="/login" className="btn btn-outline-success my-2 my-sm-0">Log In</Link>
                    <Link role="button" to="/register" className="btn btn-outline-success my-2 my-sm-0">Register</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar