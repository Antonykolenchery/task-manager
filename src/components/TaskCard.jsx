import { Link } from "react-router-dom";

export default function TaskCard({ title }) {
  return (
    <Link to={`/task/${title}`} className="card-link">
      <div className="card">
        {title}
      </div>
    </Link>
  );
}