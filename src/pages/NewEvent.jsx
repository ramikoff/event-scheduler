import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({});
  const {isLoggedIn, user, login, logout} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleInput = e.target.title.value.trim();
    const descriptionInput = e.target.description.value.trim();
    const locationInput = e.target.location.value.trim();
    const dateInput = e.target.date.value.trim();

    if(!titleInput || !descriptionInput || !locationInput || ! dateInput) {
      alert("All input fields are required!");
      return;
    }


    const newEventObject = {
      title : title,
      description : description,
      location : location,
      date : date,
      organizerId : user.id
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw Error('No User');

      const res = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(newEventObject),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if(!res.ok){
        throw new Error(`${res.statusText}`);
      }
      const data = await res.json();
      setError({});
      setSuccess(true);
      setTimeout(() => {
        navigate(`/event/${data.id}`);
      }, 2000);
      
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <h1 className="text-2xl font-bold mb-4">New Event</h1>
    {success && (
        <p className="text-m font-bold mb-4 text-green-600">New Event created successfully.</p>
      )}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-screen px-[25%]">
      <input type="text" name="title" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} className={`input input-bordered w-full`}/>
      <textarea rows="3" name="description" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className={`textarea textarea-bordered w-full`}></textarea>
      <input type="text" name="location" placeholder="Location" onChange={(e)=>setLocation(e.target.value)} className={`input input-bordered w-full`}/>
      <label htmlFor="date" className="label">Date <input type="date" name="date" onChange={(e)=>setDate(e.target.value)} className={`input input-bordered w-full`}/></label>
      
      {error.message && (
          <p className="text-red-500 text-sm">{"An error occured while creating: "+error.message}</p>
        )}
      <button type="submit" name="sendbutton" className="btn btn-primary w-full">Create</button>
    </form>

    </div>
  )
 
};

export default NewEvent;
