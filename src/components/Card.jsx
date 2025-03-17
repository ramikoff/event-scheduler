import { Link } from "react-router-dom";

const Card = ({ event }) => {
  return (
    <div className="card w-96 bg-base-100 card-xl shadow-xl">
      <div className="card-body">
        <span>{event.date}</span>
        <h2 className="card-title">{event.title}</h2>
        <p>{event.description}</p>
        <div className="justify-center card-actions">
          <Link key={event.id} to={`/event/${event.id}`}>
            <button className="btn btn-primary">Show Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
