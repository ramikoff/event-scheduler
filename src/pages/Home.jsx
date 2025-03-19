import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/events`);

        console.log(response.data.results);
        setEvents(response.data.results);
      } catch (error) {
        console.error("error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-center text-3xl">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-6">
        {loading ? (
          <>
            <span className="loading loading-spinner loading-xs"></span>
            <span className="loading loading-spinner loading-sm"></span>
            <span className="loading loading-spinner loading-md"></span>
            <span className="loading loading-spinner loading-lg"></span>
            <span className="loading loading-spinner loading-xl"></span>
          </>
        ) : (
          events.map((event, index) => {
            return <Card key={event.id} event={event} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;
