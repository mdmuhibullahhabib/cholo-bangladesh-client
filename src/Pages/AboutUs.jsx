import React from "react";
import { FaMapMarkedAlt, FaPeopleCarry, FaRoute } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-[#00796b] mb-6">
          About Cholo Bangladesh
        </h1>
        <p className="text-center text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Discover the heart of Bangladesh – from iconic landmarks to hidden gems. Our mission is to connect people with the beauty, culture, and heritage of this vibrant nation.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90zvGNZpq4VjWheDODwDsS0X5uhrOd15PBBO1f07koWpbrOCwOGE1G_0HfkBdHX29KnE&usqp=CAU"
              alt="Tour Bangladesh"
              className="rounded-2xl shadow-2xl w-full transform hover:scale-105 transition duration-500"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[#00695c] mb-4">Our Mission</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              Cholo Bangladesh is more than just a travel platform — it's your gateway to exploring Bangladesh with ease and trust. We empower travelers with curated packages, local guide connections, and unforgettable cultural adventures.
            </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl mb-20 border border-gray-200">
          <h2 className="text-3xl font-semibold text-[#00796b] mb-10 text-center">
            Why Choose Cholo Bangladesh?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-[#f1f8e9] p-6 rounded-xl hover:shadow-lg transition duration-300">
              <FaMapMarkedAlt className="text-4xl text-green-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Explore Top Destinations</h3>
              <p className="text-gray-700">
                From the Sundarbans to Cox's Bazar — uncover breathtaking locations.
              </p>
            </div>
            <div className="bg-[#fff3e0] p-6 rounded-xl hover:shadow-lg transition duration-300">
              <FaPeopleCarry className="text-4xl text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Connect With Experts</h3>
              <p className="text-gray-700">
                Get guided by certified locals who know the land and its stories.
              </p>
            </div>
            <div className="bg-[#e3f2fd] p-6 rounded-xl hover:shadow-lg transition duration-300">
              <FaRoute className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Flexible Packages</h3>
              <p className="text-gray-700">
                Personalized tours that suit every traveler's style and budget.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#004d40] mb-4">A Platform for Everyone</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            Whether you're a solo explorer, a family on vacation, or a group of friends — Cholo Bangladesh is your trusted travel companion. Book, explore, share and experience the true spirit of our land.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
