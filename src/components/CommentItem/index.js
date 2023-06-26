import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {
    id,
    name,
    comment,
    isLiked,
    commentDate,
    randomClassname,
  } = commentDetails
  const commentAddedTime = formatDistanceToNow(new Date(commentDate))

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClassname = isLiked ? 'colored-like' : ''

  const likeClicked = () => {
    toggleLike(id)
  }

  const deleteBtnClicked = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-li-container">
      <div className="comment-li-top-section">
        <div className={`${randomClassname} profile-icon-container`}>
          <p className="letter"> {name[0]} </p>
        </div>
        <div className="text-container">
          <div className="name-time-container">
            <p className="person-name"> {name} </p>
            <p className="comment-time"> {`${commentAddedTime} ago`} </p>
          </div>
          <p className="comment-text"> {comment} </p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <button
            className={`${likeClassname} like-txt-button`}
            type="button"
            onClick={likeClicked}
          >
            <div className="like-button">
              <img className="like-img" src={likeImgUrl} alt="like" />
            </div>
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={deleteBtnClicked}
          id="delete"
          data-testid="delete"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
