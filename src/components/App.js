import React from 'react'
import {Route} from 'react-router-dom'
import Wall from './Wall'
import Login from './Login'
import Navbar from './Navbar'

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <Route path='/' exact component={Wall} />
            <Route path='/login' exact component={Login} />
        </div>
    )
}

export default App