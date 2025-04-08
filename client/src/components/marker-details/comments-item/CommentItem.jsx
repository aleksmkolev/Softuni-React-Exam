import './CommentItem.css'

export default function CommentItem(comment) {
    
    return (
        <div className="comment">
            <p>{comment.username}: <span className="comment">{comment.comment}</span></p>    
        </div>
    );
};