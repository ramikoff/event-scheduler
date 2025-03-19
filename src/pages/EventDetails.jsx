import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/events/${id}`
        );
        console.log(response.data);

        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  return (
    <>
      {loading ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
          <span className="loading loading-spinner loading-xl"></span>
        </>
      ) : event ? (
        <>
          <span>{event.date}</span>
          <div>{event.title}</div>
          <div>{event.description}</div>
        </>
      ) : (
        <p>No event found</p>
      )}
    </>
  );
};

export default EventDetails;
