import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Event() {
    const { id } = useParams();

  return (
    <div>Event</div>
  )
}

export default Event