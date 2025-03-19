import { Link } from "react-router-dom";

const Card = ({ event }) => {
  return (
    <div className="card w-full lg:w-96 bg-base-100 card-xl shadow-xl">
      <div className="card-body">
        <span>{event.date}</span>
        <h2 className="card-title">{event.title}</h2>
        <p className="line-clamp-2 w-64">{event.description}</p>
        <div className="justify-center card-actions mt-4">
          <Link key={event.id} to={`/event/${event.id}`}>
            <button className="btn btn-primary">Show Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
