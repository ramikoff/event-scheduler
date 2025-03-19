import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const NewEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const {isLoggedIn, user, login, logout} = useAuth;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEventObject = {
      title : title,
      description : description,
      location : location,
      date : date+time,
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

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
    <h2>Neues Event</h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" name="title" placeholder="Titel" onChange={(e)=>setTitle(e.target.value)} />
      <textarea name="description" placeholder="Beschreibung" onChange={(e)=>setDescription(e.target.value)}></textarea>
      <input type="text" name="location" placeholder="Ort" onChange={(e)=>setLocation(e.target.value)}/>
      <label htmlFor="date">Datum <input type="date" name="date" onChange={(e)=>setDate(e.target.value)}/></label>
      <label htmlFor="time">Uhrzeit <input type="time" name="time" onChange={(e)=>setTime(e.target.value)}/></label>
    </form>

    </>
  )
 
};

export default NewEvent;
