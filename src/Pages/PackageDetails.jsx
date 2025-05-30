import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/Authprovider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useBooked from "../hooks/useBooked";

const PackageDetails = () => {
  const packages = useLoaderData();
  const {
    _id,
    title,
    images,
    description,
    tourPlan,
    price,
    type,
    guides
  } = packages;
  const [, refetch] = useBooked();
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation()
  const [startDate, setStartDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState(guides?.[0] || "");

  const handleBooking = (e) => {
    e.preventDefault();

    if (user && user.email) {
      const bookingData = {
        menuId:_id,
        packageName:title,
        name:user?.displayName,
        email:user?.email,
        image:user?.photoURL,
        price:price,
        tourDate:startDate,
        tourGuideName:selectedGuide,
        status:"pending",
      };
      console.log(bookingData)
      axiosSecure.post('/booked', bookingData)
        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            //redirect & refetch data for update data
            navigate('/dashboard/bookings')
            refetch();
          }
        })
    }
    else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please Login to add to the Booking!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate the login page
          navigate('/auth/login')
          // {state: {form: location.pathname}}
        }
      });
    }

  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-14">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 text-green-600">{title}</h1>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {images?.map((img, idx) => (
          <img key={idx} src={img} alt={`Place ${idx + 1}`} className="w-full h-64 object-cover rounded-xl shadow-md" />
        ))}
      </div>

      {/* About the Tour */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">About the Tour</h2>
        <p className="text-gray-700 text-justify">{description}</p>
      </div>

      {/* Tour Plan */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Tour Plan</h2>
        <div className="space-y-3">
          {tourPlan?.map((day, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold">Day {index + 1}</h3>
              <p>{day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tour Guides */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Our Tour Guides</h2>
        <div className="flex flex-wrap gap-3">
          {guides?.map((guide, idx) => (
            <button
              key={idx}
              className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded-full text-sm"
              onClick={() => navigate(`/guides/${guide}`)}
            >
              {guide}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="bg-white border rounded-xl p-6 shadow-lg mb-16">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Booking Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <h2 className="text-l font-semibold mb-1">Tour Title</h2>
            <input type="text" value={title} readOnly className="input input-bordered w-full" />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Your Name</h2>
            <input type="text" value={user?.displayName || ""} readOnly className="input input-bordered w-full" />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Your Email</h2>
            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full" />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Your Photo</h2>
            <input type="text" value={user?.photoURL || ""} readOnly className="input input-bordered w-full" />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Package Price</h2>
            <input type="text" value={`৳${price}`} readOnly className="input input-bordered w-full" />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Tour Date</h2>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="">
            <h2 className="text-l font-semibold mb-1">Selact Your Tour guide</h2>
            <select
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="select select-bordered w-full"
            >
              {guides?.map((guide, i) => (
                <option key={i} value={guide}>{guide}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button className="btn btn-success mt-6 w-full">
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageDetails;
