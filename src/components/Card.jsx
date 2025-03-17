import { Link } from "react-router-dom";

const Card = ({ event }) => {
  // const event = {
  //   id: 1,
  //   title: "Event Title",
  //   description: "Some Description for the Event",
  //   date: "2025-03-14T12:30:39.946Z",
  //   location: "Schloßbezirk 10, 76131 Karlsruhe",
  //   organizerId: 1,
  //   createdAt: "2025-03-14T12:30:39.946Z",
  //   updatedAt: "2025-03-14T12:30:39.946Z",
  // };
  // Statt dummy event muss event aus dem prop

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
