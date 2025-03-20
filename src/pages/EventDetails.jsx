import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const {isLoggedIn, user, login, logout} = useAuth();
  const navigate = useNavigate();

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

  const handleDelete = async (e)=>{
    e.preventDefault();
    
    if(confirm("Do you really want to delete this event?")){
      if(!(isLoggedIn && user.id == event.organizerId)){
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:3001/api/events/${id}`,
          {headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }}
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.error(error)
      }
    } else {
      return;
    }
    
  }

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
        <div className="container card w-full bg-base-100 card-xl mx-auto mt-8">
          <div className="card-body">
            <span>{event.date.split("T")[0]}</span>
            <div className="card-title">{event.title}</div>
            <div>{event.description}</div>
            {
              (isLoggedIn && user.id == event.organizerId) && (
              <form onSubmit={handleDelete}>
                <button type="submit" className="btn btn-primary w-max mt-4">
                  Delete
                </button>
              </form>
              )
            }
            
          </div>
          
        </div>
      ) : (
        <p>No event found</p>
      )}
    </>
  );
};

export default EventDetails;
