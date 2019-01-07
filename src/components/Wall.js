import React from 'react'
import {Link} from 'react-router-dom' 

const Wall = () => {
    return (
        <div className="text-center mt-5">
            <h2>Welcome to The Wall</h2>
            <p>
                The Wall is simply a list of posts made by an individual user. <br/>
                You may view someone's wall or you may create your own.<br/>
                Check out some of our <Link to='/walls'>users' walls.</Link>
            </p>
        </div>
    )
}

export default Wall