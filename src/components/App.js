import React from 'react'
import {Route} from 'react-router-dom'
import Wall from './Wall'
import Login from './Login'
import Register from './Register'
import Navbar from './Navbar'
import Posts from './Posts'

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <Route path='/' exact component={Wall} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/posts' exact component={Posts} />
        </div>
    )
}

export default App