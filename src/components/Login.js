import React from 'react'
import axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            formSubmitted: false,
            errors: {
                email: [],
                password: [],
            },
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        // check if already logged in (if token is stored)
        if (document.cookie.indexOf('wall_json') > -1) {
            // redirect to walls
            window.location = 'walls'
        }
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
        return re.test(email)
    }

    onSubmit(e) {
        e.preventDefault()

        const { email, password } = this.state

        // reset errors
        let errors = {
            email: [],
            password: [],
        }

        if (email == '') errors.email.push('Email is required.')
        if (!this.validateEmail(email))
            errors.email.push('Invalid email format.')
        if (password == '') errors.password.push('Password is required.')

        this.setState({ formSubmitted: true, errors })

        const no_errors = Object.values(errors).every(x => x.length == 0)

        if (no_errors) {
            console.log('SUBMIT')

            axios
                .post(
                    process.env.API_URL + '/api/login',
                    {
                        email: email,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then(response => {
                    console.log(response.data.message)

                    const wall_json = {
                        'access_token':response.data.token.access_token,
                        'refresh_token':response.data.token.refresh_token,
                        'user':response.data.user,
                    }

                    let expirationDateTime = new Date()
                    expirationDateTime.setTime(
                        expirationDateTime.getTime() + response.data.token.expires_in
                    )
                    document.cookie = 'wall_json=' + JSON.stringify(wall_json) + '; expires=' + expirationDateTime.toUTCString() + '; path=/'

                    window.location = 'walls'
                })
                .catch(error => {
                    console.log(error)
                    alert('Login failed. Please try again.')
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-5 offset-md-4 mt-5">
                    <form
                        className="form-signin needs-validation"
                        onSubmit={this.onSubmit}
                        noValidate
                    >
                        <h1 className="h3 mb-3 font-weight-normal">
                            Please log in
                        </h1>
                        <div className="form-group">
                            <label htmlFor="inputEmail" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                                id="inputEmail"
                                className={
                                    'form-control ' +
                                    (this.state.formSubmitted
                                        ? this.state.errors.email.length > 0
                                            ? 'is-invalid'
                                            : 'is-valid'
                                        : '')
                                }
                                placeholder="Email address"
                                autoComplete="off"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                                {this.state.errors.email.map((msg, k) => (
                                    <div key={k}>{msg}</div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                id="inputPassword"
                                className={
                                    'form-control ' +
                                    (this.state.formSubmitted
                                        ? this.state.errors.password.length > 0
                                            ? 'is-invalid'
                                            : 'is-valid'
                                        : '')
                                }
                                placeholder="Password"
                                autoComplete="off"
                            />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">
                                {this.state.errors.password.map((msg, k) => (
                                    <div key={k}>{msg}</div>
                                ))}
                            </div>
                        </div>
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Login
