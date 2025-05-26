import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePackage from "../hooks/usePackage";

const Trips = () => {
      const [packages ] = usePackage()

  return (
    <div className="max-w-6xl mt-12 mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        All Tour Packages
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-primary mb-1">{pkg.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Tour Type:</span> {pkg.type}
              </p>
              <p className="text-gray-700 font-bold text-lg mb-4">
                Price: ${pkg.price}
              </p>
              <Link
                to={`/package/${pkg._id}`}
                className="btn btn-primary btn-sm w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
