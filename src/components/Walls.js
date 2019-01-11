import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const cookies = require('browser-cookies')

class Walls extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: {},
            walls: [],
        }
    }

    componentWillMount() {
        this.checkAuth()
        this.fetchWalls()
    }

    checkAuth() {
        const cookie = JSON.parse(cookies.get('wall_json'))

        if (cookie) {
            this.setState({
                isLoggedIn: true,
                user: cookie.user,
            })
        } else {
            this.setState({
                isLoggedIn: false,
            })
        }
    }

    fetchWalls() {
        // get the walls
        axios
            .get(process.env.API_URL + '/api/walls')
            .then(response => {
                this.setState({
                    walls: response.data,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        let startWallQuestion = ''
        if (
            !this.state.isLoggedIn ||
            (this.state.isLoggedIn && !this.state.user.wall)
        ) {
            startWallQuestion = (
                <div className="text-center">
                    <Link
                        role="button"
                        to={ !this.state.isLoggedIn ? '/login' : '/wall/' + this.state.user.id}
                        className="btn btn-outline-success mb-2"
                        onClick={this.createWall}
                    >
                        Start your own Wall
                    </Link>
                    <div className="small muted">... or view other users' walls below</div>
                </div>
            )
        }

        let walls = 'No walls have been created.'

        if (this.state.walls.length > 0) {
            walls = this.state.walls.map((user, k) => {
                return (
                    <Link
                        key={k}
                        to={"/wall/"+ user.id}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{user.full_name}</h5>
                            <small>
                                Last updated {user.posts[0].updated_when}
                            </small>
                        </div>
                        <p className="mb-1">{user.posts[0].content}</p>
                    </Link>
                )
            })
        }

        return (
            <div>
                <h2>Walls</h2>
                <p>A list of users' walls.</p>

                {startWallQuestion}

                <div className="list-group">{walls}</div>
            </div>
        )
    }
}

export default Walls
