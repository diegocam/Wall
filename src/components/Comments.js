import React from 'react'
import axios from 'axios'
const cookies = require('browser-cookies')

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            new_comment: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
      }

    onSubmit() {
        // some validation might be needed here
        axios
            .post(
                process.env.API_URL + '/api/comment/' + this.props.post.id,
                {
                    content: this.state.new_comment,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.props.access_token,
                    },
                }
            )
            .then(res => {
                this.setState({
                    new_comment: ''
                })
                this.props.fetchCurrentUser()
            })
            .catch(e => console.log(e))
    }

    render(){
        return (
            <div className="comments-section px-3 mt-2">
                                
            <div className="comments py-2">
                {this.props.post.comments.map((comment,k) =>
                        <div key={k} className="comment">
                            <span>
                                <a href="">{comment.user.full_name}</a>
                            </span> {comment.content}
                        </div>
                    )}
            </div>

            <div className="input-group input-group-sm mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write a comment"
                    aria-label="Write a comment"
                    aria-describedby="button-addon2"
                    name="new_comment"
                    value={this.state.new_comment}
                    onChange={this.handleChange}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={this.onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

        </div>
        )
    }
}

export default Comments