import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [];
    setEvents(savedEvents);
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-center text-3xl">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-6">
        {events.map((event, index) => {
          const eventId = index + 1;
          return <Card key={eventId} id={eventId} event={event} />;
        })}
      </div>
    </div>
  );
};

export default Home;
