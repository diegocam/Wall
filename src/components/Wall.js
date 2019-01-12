import React from 'react'
import axios from 'axios'
import Comments from './Comments';
const cookies = require('browser-cookies')

class Wall extends React.Component {
    constructor(props) {
        super(props)

        this.current_user_id = this.props.match.params.id

        this.state = {
            logged_in_user: {},
            current_user: {
                posts: []
            },
            post_content: '',
            access_token: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.onCreate = this.onCreate.bind(this)
        this.fetchCurrentUser = this.fetchCurrentUser.bind(this)
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
        this.fetchCurrentUser()
    }

    fetchCurrentUser() {
        axios
            .get(process.env.API_URL + '/api/user/' + this.current_user_id)
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
            })
            .catch(e => console.log(e))
    }

    render() {

        let wall_user = this.state.logged_in_user
        if (this.state.logged_in_user.id !== this.current_user_id) {
            wall_user = this.state.current_user
        } 

        let create_post_box = ''
        if (this.state.logged_in_user && wall_user.id == this.state.logged_in_user.id) {
            create_post_box = (
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

        let posts = ''
        if (wall_user.posts.length > 0) {
            posts = wall_user.posts.map( (post, k) => {
                return <div key={k} className="post text-left">
                            <div className="header">
                                <div className="title">
                                    <a href="">{ wall_user.full_name}</a>
                                </div>
                                <div className="subtitle">{ post.updated_when}</div>
                            </div>
                            <div className="content">
                                {post.content}
                            </div>
                            <Comments post={post} access_token={this.state.access_token} fetchCurrentUser={this.fetchCurrentUser}/>
                        </div>

            })
        }

        return (
            <div id="wall-page" className="col-md-8 offset-md-2 text-center">
                <h2>{wall_user.full_name}'s Wall</h2>
                {create_post_box}
                <div className="px-4">
                    {posts}
                </div>
            </div>
        )
    }
}

export default Wall
