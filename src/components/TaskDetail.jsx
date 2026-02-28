import { useParams } from "react-router-dom";
import { useState } from "react";

export default function TaskDetail() {
  const { title } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    if (!comment) return;
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="task-detail">
      <h2>{title}</h2>
      <p>This is the detailed page for {title}.</p>

      <div className="comment-box">
        <textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>
      </div>

      <div className="comments">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}