import React from 'react';
import { useNavigate } from 'react-router-dom';

const TourGuideCard = ({ guide }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/guides/${guide._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center transition hover:shadow-xl">
      <img
        src={guide.photo}
        alt={guide.name}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-green-700 mb-1">{guide.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{guide.experience} years experience</p>
      <p className="text-sm text-gray-500 mb-4">{guide.specialty}</p>

      <button
        onClick={handleDetailsClick}
        className="btn btn-sm btn-outline btn-success"
      >
        Details
      </button>
    </div>
  );
};

export default TourGuideCard;
