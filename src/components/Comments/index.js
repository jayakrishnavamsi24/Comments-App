import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    name: '',
    comment: '',
    commentsCount: 0,
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name.length === 0) {
      alert('Please Enter your name')
      return
    }
    if (comment.length === 0) {
      alert('Please Write Comment')
      return
    }

    const randomColorClassname =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const now = new Date()

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      commentDate: now,
      randomClassname: randomColorClassname,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
      commentsCount: prevState.commentsCount + 1,
    }))
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentsList: filteredCommentsList,
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, name, comment, commentsCount} = this.state

    return (
      <div className="bg-container">
        <h1> Comments </h1>
        <div className="top-section">
          <form className="left-container" onSubmit={this.onAddComment}>
            <p className="left-cont-descr">
              {' '}
              Say something about 4.0 Technologies{' '}
            </p>
            <input
              value={name}
              type="text"
              onChange={this.onChangeName}
              placeholder="Your Name"
            />
            <textarea
              value={comment}
              rows="7"
              onChange={this.onChangeComment}
              placeholder="Your Comment"
            />
            <button className="comment-button" type="submit">
              Add Comment
            </button>
          </form>
          <div className="right-container">
            <img
              className="comment-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <div className="comments-count-section">
          <div className="count"> {commentsCount} </div>
          <p className="comments"> Comments </p>
        </div>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              toggleLike={this.toggleLike}
              deleteComment={this.deleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
