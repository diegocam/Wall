import React from 'react'

const Register = () => {
    return (
        <React.Fragment>
            <div className="col-md-5 offset-md-4 mt-5">
                <form className="form-register">
                    <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                    <div className="form-group">
                        <label for="inputFirstName" className="sr-only">First Name</label>
                        <input type="text" id="inputFirstName" className="form-control" placeholder="First Name" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <label for="inputLastName" className="sr-only">Last Name</label>
                        <input type="text" id="inputLastName" className="form-control" placeholder="Last Name" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <label for="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword" className="sr-only">Confirm Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" autocomplete="off" />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Register