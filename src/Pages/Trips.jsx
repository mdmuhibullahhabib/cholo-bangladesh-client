import React from "react";
import { Link } from "react-router-dom";
import usePackage from "../hooks/usePackage";

const Trips = () => {
  const [packages] = usePackage();

  return (
    <div className="bg-gradient-to-br from-[#f0f9ff] via-[#e0f7fa] to-[#fce4ec] py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#004d40] mb-4">
          All Tour Packages
        </h1>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Choose from a wide variety of tour packages designed for every kind of traveler — whether you're an adventurer, a nature lover, or a cultural explorer.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={pkg.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#00796b] mb-1">
                  {pkg.title}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Tour Type:</span> {pkg.type}
                </p>
                <p className="text-gray-800 font-bold text-lg mb-4">
                  Price: ${pkg.price}
                </p>
                <Link
                  to={`/package/${pkg._id}`}
                  className="btn btn-sm bg-[#00796b] text-white hover:bg-[#004d40] w-full rounded-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trips;
