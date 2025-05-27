import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const OurPackages = () => {
    const [packages, setPackages] = useState([]);


      useEffect(() => {
        fetch('https://tourism-management-server-5ts035kx5-muhibullah-habibs-projects.vercel.app/random-packages')
          .then(res => res.json())
          .then(data => setPackages(data))
      }, []);
      
  return (
    <div className="grid md:grid-cols-3 gap-6 p-4">
      {packages?.map((pkg) => (
        <div key={pkg._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={pkg.image} alt={pkg.title} className="h-60 w-full object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl text-green-600">{pkg.title}</h2>
            <p><strong>Tour Type:</strong> {pkg.type}</p>
            <p><strong>Price:</strong> ৳{pkg.price}</p>
            <div className="card-actions justify-end">
              <Link to={`/package/${pkg._id}`}>
                <button className="btn btn-outline btn-success flex items-center gap-2">
                  <FaEye /> View Package
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default OurPackages