import React from 'react'
import axios from 'axios'
const cookies = require('browser-cookies')

class Wall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false,
            user: {},
            wall_user: {},
            postContent: '',
            cookie: {},
        }

        this.handleChange = this.handleChange.bind(this)
        this.onCreate = this.onCreate.bind(this)
    }

    componentWillMount() {
        const cookie = JSON.parse(cookies.get('wall_json'))

        if (cookie) {
            this.setState({
                cookie: cookie,
                isLoggedIn: true,
                user: cookie.user,
            })
        } else {
            this.setState({
                isLoggedIn: false,
            })
        }
    }

    componentDidMount() {
        const user_id = this.props.match.params.id
        axios
            .get(process.env.API_URL + '/api/user/' + user_id)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    onCreate() {
        if (this.state.postContent == '') {
            alert('Cannot be blank')
            return
        }

        // more validation here
        
        axios
            .post(
                process.env.API_URL + '/api/post',
                {
                    content: this.state.postContent,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.cookie.access_token,
                    },
                }
            )
            .then(res => {
                this.setState({
                    postContent: ''
                })
                this.fetchPosts()
            })
            .catch(e => console.log(e))
    }

    fetchPosts() {

    }

    render() {
        let postBox = ''
        if (this.state.isLoggedIn) {
            postBox = (
                <div className="form-group new-post-box">
                    <textarea
                        className="form-control"
                        name="postContent"
                        value={this.state.postContent}
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary" onClick={this.onCreate}>
                        Create Post
                    </button>
                </div>
            )
        }

        return (
            <div id="wall-page" className="col-md-8 offset-md-2 text-center">
                <h2>{this.state.user.full_name}'s Wall</h2>
                {postBox}
                <div className="px-4">
                    <div className="post text-left">
                        <div className="header">
                            <div className="title">
                                <a href="">Diego Camacho</a>
                            </div>
                            <div className="subtitle">May 12, 2018 12:31pm</div>
                        </div>
                        <div className="content">
                            This is my first post. Im so excited! kjh khj kj kj
                            hkfjdshkjfhsd kfjhksdjfhskjdfh ksdjfhk sdjfh ksdhfks
                            dfhksjdhf ks
                        </div>
                        <div className="comments-section px-3 mt-2">
                            <div className="comments py-2">
                                <div className="comment">
                                    <span>
                                        <a href="">Jane Doe</a>
                                    </span>{' '}
                                    That's so cool. Welcome.
                                </div>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Write a comment"
                                    aria-label="Write a comment"
                                    aria-describedby="button-addon2"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="post text-left">
                        <div className="header">
                            <div className="title">
                                <a href="">Diego Camacho</a>
                            </div>
                            <div className="subtitle">May 12, 2018 12:31pm</div>
                        </div>
                        <div className="content">
                            This is my first post. Im so excited! kjh khj kj kj
                            hkfjdshkjfhsd kfjhksdjfhskjdfh ksdjfhk sdjfh ksdhfks
                            dfhksjdhf ks
                        </div>
                        <div className="comments-section px-3 mt-2">
                            <div className="comments py-2">
                                <div className="comment">
                                    <span>
                                        <a href="">Jane Doe</a>
                                    </span>{' '}
                                    That's so cool. Welcome.
                                </div>
                                <div className="comment">
                                    <span>
                                        <a href="">Jane Doe</a>
                                    </span>{' '}
                                    I agree. Welcome. My first time here was
                                    amazing. This app has been the best so far.
                                    Even better than the competetion. You know
                                    who im talking about.
                                </div>
                            </div>
                            <div className="input-group input-group-sm mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Write a comment"
                                    aria-label="Write a comment"
                                    aria-describedby="button-addon2"
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Wall
