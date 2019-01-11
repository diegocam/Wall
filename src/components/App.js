import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import Walls from './Walls'
import Wall from './Wall'

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/walls" component={Walls} />
                    <Route path="/wall/:id?" component={Wall} />
                    <Route render={
                        () => <h3>Not Found</h3>
                    }/>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
