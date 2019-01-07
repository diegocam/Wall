import React from 'react'

const Login = () => {
    return (
        <React.Fragment>
            <div className="col-md-5 offset-md-4 mt-5">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
                    <div className="form-group">
                        <label for="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" autocomplete="off" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" autocomplete="off" />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Log in</button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login