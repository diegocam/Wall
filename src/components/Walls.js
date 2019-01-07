import React from 'react'
import {Link} from 'react-router-dom'

const Walls = () => {
    return <div>
        <h2>Walls</h2>
        <p>A list of users' walls.</p>
       
        <div className="list-group">
        <Link to="/wall" className="list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Diego Camacho</h5>
                <small>Last updated 3 days ago</small>
            </div>
            <p className="mb-1">This is some post I created.</p>
            <small>Last comment or "no comments have not yet been made".</small>
        </Link>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Diego Camacho</h5>
                <small>Last updated 3 days ago</small>
            </div>
            <p className="mb-1">This is some post I created.</p>
            <small>Last comment or "no comments have not yet been made".</small>
        </a>
        <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Diego Camacho</h5>
                <small>Last updated 3 days ago</small>
            </div>
            <p className="mb-1">This is some post I created.</p>
            <small>Last comment or "no comments have not yet been made".</small>
        </a>
        </div>
    </div>
}

export default Walls