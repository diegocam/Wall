import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
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
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/walls" exact component={Walls} />
                <Route path="/wall/:id" exact component={Wall} />
            </div>
        </BrowserRouter>
    )
}

export default App
