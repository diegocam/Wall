import React from 'react'
import axios from 'axios'

class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            formSubmitted: false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {
                first_name: [],
                last_name: [],
                email: [],
                password: [],
                password_confirm: [],
            }
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
      }

    validateEmail(email) {
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return re.test(email);
    }

    onSubmit(e) {
        e.preventDefault()

        const {first_name, last_name, email, password, password_confirm} = this.state

        // reset errors
        let errors = {
            first_name: [],
            last_name: [],
            email: [],
            password: [],
            password_confirm: [],
        }

        // validate fields
        if (first_name == '') errors.first_name.push("First Name is required.")
        if (last_name == '') errors.last_name.push("Last Name is required.")
        if (email == '') errors.email.push("Email is required.")
        if (!this.validateEmail(email)) errors.email.push("Invalid email format.")
        if (password == '') errors.password.push("Password is required.")
        if (password_confirm == '') errors.password_confirm.push("Password confirmation is required.")
        if (password.length < 4) errors.password.push("The password should be at least 8 characters long")
        if (password !== password_confirm) {
            errors.password.push("Passwords do not match")
            errors.password_confirm.push("Passwords do not match")
        }

        this.setState({ formSubmitted: true, errors })

        const no_errors = Object.values(errors).every(x => (x.length == 0))

        if (no_errors) {

            axios.post(process.env.API_URL + '/api/register', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then( response => { 
                    console.log(response.data.message)
                    const wall_json = {
                        'access_token':response.data.token.access_token,
                        'refresh_token':response.data.token.refresh_token,
                        'user':response.data.user,
                    }
                    let expirationDateTime = new Date();
                    expirationDateTime.setTime(expirationDateTime.getTime() + response.data.token.expires_in);
                    document.cookie = "wall_json=" + JSON.stringify(wall_json) + "; expires=" + expirationDateTime.toUTCString() + "; path=/";
                    window.location = 'walls'
                }).catch( error => {
                    console.log(error)
                })
        }
        
    }

    render(){
        return (
            <React.Fragment>
                <div className="col-md-5 offset-md-4 mt-5">
                    <form className={"form-register needs-validation"} onSubmit={this.onSubmit} noValidate>
                        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                        <div className="form-group">
                            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                            <input type="text" 
                                   id="inputFirstName" 
                                   name="first_name" 
                                   onChange={this.handleChange} 
                                   className={"form-control " + (this.state.formSubmitted ? (this.state.errors.first_name.length > 0 ? "is-invalid" : "is-valid") : "")}
                                   placeholder="First Name"
                                   autoComplete="off"
                                   required />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">{this.state.errors.first_name.map((msg, k)=><div key={k}>{msg}</div>)}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                            <input type="text" 
                                   id="inputLastName" 
                                   name="last_name"
                                   onChange={this.handleChange} 
                                   className={"form-control " + (this.state.formSubmitted ? (this.state.errors.last_name.length > 0 ? "is-invalid" : "is-valid") : "")}
                                   placeholder="Last Name" 
                                   autoComplete="off" 
                                   required />
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">{this.state.errors.last_name.map((msg, k)=><div key={k}>{msg}</div>)}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input type="email" 
                                   id="inputEmail" 
                                   name="email" 
                                   onChange={this.handleChange} 
                                   className={"form-control " + (this.state.formSubmitted ? (this.state.errors.email.length > 0 ? "is-invalid" : "is-valid") : "")}
                                   placeholder="Email address" 
                                   autoComplete="off" 
                                   required/>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">{this.state.errors.email.map((msg, k)=><div key={k}>{msg}</div>)}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" 
                                   id="inputPassword" 
                                   name="password"
                                   onChange={this.handleChange} 
                                   className={"form-control " + (this.state.formSubmitted ? (this.state.errors.password.length > 0 ? "is-invalid" : "is-valid") : "")}
                                   placeholder="Password" 
                                   autoComplete="off" 
                                   required/>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">{this.state.errors.password.map((msg, k)=><div key={k}>{msg}</div>)}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input type="password" 
                                   id="confirmPassword" 
                                   name="password_confirm" 
                                   onChange={this.handleChange} 
                                   className={"form-control " + (this.state.formSubmitted ? (this.state.errors.password_confirm.length > 0  ? "is-invalid" : "is-valid") : "")} 
                                   placeholder="Confirm Password" 
                                   autoComplete="off" 
                                   required/>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">{this.state.errors.password_confirm.map((msg, k)=><div key={k}>{msg}</div>)}</div>
                        </div>
                        <button className="btn btn-primary btn-block" type="submit">Submit</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Register