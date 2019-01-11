import React from 'react'
import axios from 'axios'
const cookies = require('browser-cookies')

class Wall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            logged_in_user: {},
            current_user: {},
            post_content: '',
            access_token: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.onCreate = this.onCreate.bind(this)
    }

    componentWillMount() {
        const cookie = JSON.parse(cookies.get('wall_json'))

        if (cookie) {
            this.setState({
                access_token: cookie.access_token,
                logged_in_user: cookie.user,
            })
        } else {
            this.setState({
                logged_in_user: false,
            })
        }
    }

    componentDidMount() {

        // this is the id of the user whose current wall we are seeing. It is the user Id on the URL.
        const url_user_id = this.props.match.params.id

        // if the URL_USER is the same as the LOGGED_IN user, then we are viewing our own wall

        // if we are not viewing our own wall, then we are not allowed to see the POST BOX. However
        // we are allowed to see COMMENT Boxes

        axios
            .get(process.env.API_URL + '/api/user/' + url_user_id)
            .then(res => {
                this.setState({
                    current_user: res.data
                })
            })
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
        if (this.state.post_content == '') {
            alert('Cannot be blank')
            return
        }

        // more validation here

        axios
            .post(
                process.env.API_URL + '/api/post',
                {
                    content: this.state.post_content,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.state.access_token,
                    },
                }
            )
            .then(res => {
                this.setState({
                    post_content: ''
                })
                this.fetchPosts()
            })
            .catch(e => console.log(e))
    }

    fetchPosts() {
        // @TODO. This needs fixing
        axios
            .get(process.env.API_URL + '/api/posts')
            .then(response => {
                this.setState({
                    walls: response.data,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        let post_box = ''
        if (this.state.logged_in_user) {
            post_box = (
                <div className="form-group new-post-box">
                    <textarea
                        className="form-control"
                        name="post_content"
                        value={this.state.post_content}
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
                <h2>{this.state.logged_in_user.full_name}'s Wall</h2>
                {post_box}
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
