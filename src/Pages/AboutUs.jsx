import React from "react";
import { FaMapMarkedAlt, FaPeopleCarry, FaRoute } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-white py-12 mt-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          About Cholo Bangladesh
        </h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Discover the heart of Bangladesh – from iconic landmarks to hidden gems.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90zvGNZpq4VjWheDODwDsS0X5uhrOd15PBBO1f07koWpbrOCwOGE1G_0HfkBdHX29KnE&usqp=CAU"
              alt="Tour Bangladesh"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Cholo Bangladesh is more than just a travel platform — it's a journey through the heart and soul of our beautiful country. We help travelers explore the richness of our history, landscapes, and culture while connecting them with local tour guides, authentic experiences, and amazing packages.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-lg mb-14">
          <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
            Why Choose Cholo Bangladesh?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Explore Top Destinations</h3>
              <p className="text-gray-600">
                From the Sundarbans to Cox's Bazar — discover the beauty of Bangladesh like never before.
              </p>
            </div>
            <div className="p-4">
              <FaPeopleCarry className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect With Experts</h3>
              <p className="text-gray-600">
                Our certified local tour guides help you enjoy a safe and insightful experience.
              </p>
            </div>
            <div className="p-4">
              <FaRoute className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Packages</h3>
              <p className="text-gray-600">
                Choose from a variety of custom-designed packages based on your travel style.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-primary mb-4">A Platform for Everyone</h2>
          <p className="text-gray-700">
            Whether you're a solo traveler, a group of friends, or a family with kids — our platform is designed for you. Share your tourist stories, book amazing packages, and become part of a growing travel community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
