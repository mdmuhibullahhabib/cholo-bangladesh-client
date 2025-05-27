import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const OurGuide = () => {
  const [allGuides, setGuide]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users/guides')
    .then(res =>res.json())
    .then(data => {
      setGuide(data)
    })
  },[])
  console.log(allGuides)

  // Random 6 guides
  const guides = allGuides.sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {guides.map(guide => (
        <div key={guide._id} className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={guide.image} alt={guide.name} className="rounded-xl w-32 h-32 object-cover" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{guide.name}</h2>
            <p><strong>Experience:</strong> {guide.experience}</p>
            <p><strong>Specialty:</strong> {guide.specialty}</p>
            <p><strong>Language:</strong> {guide.language}</p>
            <div className="card-actions mt-4">
              <Link to={`/guide-details/${guide._id}`} className="btn btn-outline btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurGuide