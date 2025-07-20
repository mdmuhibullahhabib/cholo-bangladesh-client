import React from "react";
import { Link } from "react-router-dom";
import usePackage from "../hooks/usePackage";

const Trips = () => {
  const [packages] = usePackage();

  return (
    <div className="bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#ffffff] min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1a3c40] mb-6">
          Explore Our Tour Packages
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Handpicked tours designed for unforgettable experiences — from nature retreats to cultural adventures across Bangladesh and beyond.
        </p>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-[#2e7d32]">{pkg.title}</h2>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span> {pkg.type}
                </p>
                <p className="text-lg font-bold text-[#37474f]">
                  Price: ${pkg.price}
                </p>
                <Link
                  to={`/package/${pkg._id}`}
                  className="mt-3 inline-block w-full text-center bg-gradient-to-r from-[#43cea2] to-[#185a9d] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
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
