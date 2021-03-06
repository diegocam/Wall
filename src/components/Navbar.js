import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const cookies = require('browser-cookies')

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: null,
            access_token: '',
        }
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        // check if already logged in (if token is stored)
        const cookie = JSON.parse(cookies.get('wall_json'))

        if (cookie) {
            this.setState({
                isLoggedIn: true,
                user: cookie.user,
                access_token: cookie.access_token,
            })
        } else {
            this.setState({
                isLoggedIn: false,
            })
        }
    }

    logout(e) {
        e.preventDefault()

        axios
            .post(
                process.env.API_URL + '/api/logout',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + this.state.access_token,
                    },
                }
            )
            .then(response => {
                console.log(response)
                cookies.erase('wall_json')
                window.location = '/login'
            })
            .catch(error => {
                console.log(error)
                alert('Logout failed. Please try again.')
            })
    }

    render() {
        let loginButtons
        if (this.state.isLoggedIn) {
            loginButtons = (
                <React.Fragment>
                    <a href={'/wall/' + this.state.user.id}>
                        {this.state.user.full_name}
                    </a>

                    <a
                        role="button"
                        className="btn btn-outline-success my-2 my-sm-0 ml-2"
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
