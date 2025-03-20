import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const {isLoggedIn, user, login, logout} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const data = await res.json();
      console.log(data);
      navigate(`/event/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
    <h1 className="text-2xl font-bold mb-4">New Event</h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-screen px-[25%]">
      <input type="text" name="title" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} className={`input input-bordered w-full`}/>
      <textarea rows="3" name="description" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className={`textarea textarea-bordered w-full`}></textarea>
      <input type="text" name="location" placeholder="Location" onChange={(e)=>setLocation(e.target.value)} className={`input input-bordered w-full`}/>
      <label htmlFor="date" className="label">Date <input type="date" name="date" onChange={(e)=>setDate(e.target.value)} className={`input input-bordered w-full`}/></label>
      <button type="submit" name="sendbutton" className="btn btn-primary w-full">Create</button>
    </form>

    </div>
  )
 
};

export default NewEvent;
