import React from 'react'
import { Link } from 'react-router-dom'
const cookies = require('browser-cookies');

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
        }
    }

    componentDidMount() {
        // check if already logged in (if token is stored)
        if (document.cookie.indexOf('wall_access_token') > -1) {
            this.setState({
                isLoggedIn: true,
            })
        } else {
            this.setState({
                isLoggedIn: false,
            })
        }
    }

    logout(e) {
        e.preventDefault
        cookies.erase('wall_access_token');
        cookies.erase('wall_refresh_token');
        window.location = '/login'
    }

    render() {
        let loginButtons
        if (this.state.isLoggedIn) {
            loginButtons = (
                <React.Fragment>
                    <a
                        role="button"
                        className="btn btn-outline-success my-2 my-sm-0"
                        onClick={this.logout}
                    >
                        Log Out
                    </a>
                </React.Fragment>
            )
        } else {
            loginButtons = (
                <React.Fragment>
                    <Link
                        role="button"
                        to="/login"
                        className="btn btn-outline-success my-2 my-sm-0"
                    >
                        Log In
                    </Link>
                    <Link
                        role="button"
                        to="/register"
                        className="btn btn-outline-success my-2 my-sm-0"
                    >
                        Register
                    </Link>
                </React.Fragment>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light px-0">
                    <Link to="/" className="navbar-brand">
                        <strong>The Wall</strong>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li>
                                <Link to="/walls" className="nav-link">
                                    Walls
                                </Link>
                            </li>
                        </ul>
                        {loginButtons}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
