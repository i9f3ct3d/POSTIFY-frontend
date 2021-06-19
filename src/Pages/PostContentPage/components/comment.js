import "./comment.css";

const Comment=props=>
{
    return (
      <div className="comment-component-main-div">
        <div className="comment-component-comment-div">
            <p>{props.commentContent}</p>
        </div>
        <div className="comment-component-author-div">
            <p>COMMENTED BY : {props.username}</p>
        </div>
      </div>
    );
}
export default Comment;
