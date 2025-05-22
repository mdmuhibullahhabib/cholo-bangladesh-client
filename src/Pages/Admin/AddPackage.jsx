// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import useGuide from '../../hooks/useGuide';
// import useAxiosSecure from '../../hooks/useAxiosSecure';


//         <select className="select select-bordered w-full" required
//           value={formData.guideId}
//           onChange={(e) => setFormData({ ...formData, guideId: e.target.value })}
//         >
//           <option disabled value="">Select Tour Guide</option>
//           {
//             guides.map(guide => (
//               <option key={guide._id} value={guide._id}>{guide.name}</option>
//             ))
//           }
//         </select>

//  {guides.map((guide, i) => (
//       <input
//         key={i}
//         type="text"
//         placeholder={`Guide ${i + 1} name`}
//         className="input input-bordered w-full mb-2"
//         value={guide}
//         onChange={(e) => {
//           const updated = [...guides];
//           updated[i] = e.target.value;
//           setGuides(updated);
//         }}
//         required
//       />
//     ))}


import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useGuide from '../../hooks/useGuide';

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [allGuides] = useGuide();
  
  const [guides, setSelectedGuides] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(["", "", ""]);
  const [description, setDescription] = useState("");
  const [tourPlan, setTourPlan] = useState([""]);
  // const [guides, setGuides] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPackage = {
      title,
      type,
      price: parseInt(price),
      images,
      description,
      tourPlan,
      guides,
    };
    console.log(newPackage)
    const res = await axiosSecure.post("/package", newPackage);
    if (res.data.insertedId) {
      Swal.fire("Success!", "Package added successfully!", "success");
      // Optionally reset the form
      // setTitle("");
      // setType("");
      // setPrice("");
      // setImages(["", "", ""]);
      // setDescription("");
      // setTourPlan([""]);
      // setGuides([""]);
    }

  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Add New Tour Package</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="font-semibold">Tour Type</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (৳)</label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="font-semibold">Image URLs (3)</label>
          {images.map((img, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Image URL ${i + 1}`}
              className="input input-bordered w-full mb-2"
              value={img}
              onChange={(e) => {
                const updated = [...images];
                updated[i] = e.target.value;
                setImages(updated);
              }}
              required
            />
          ))}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Tour Plan */}
        <div>
          <label className="font-semibold">Tour Plan</label>
          {tourPlan.map((plan, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Day ${i + 1} plan`}
              className="input input-bordered w-full mb-2"
              value={plan}
              onChange={(e) => {
                const updated = [...tourPlan];
                updated[i] = e.target.value;
                setTourPlan(updated);
              }}
              required
            />
          ))}
          <button
            type="button"
            className="btn btn-outline btn-sm mt-2"
            onClick={() => setTourPlan([...tourPlan, ""])}
          >
            + Add Day
          </button>
        </div>

        {/* Guides */}
        <div>
          <label className="font-semibold">Tour Guides</label>
          {allGuides.map((guide) => (
            <div key={guide._id} className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={guides.includes(guide.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedGuides([...guides, guide.name]);
                    } else {
                      setSelectedGuides(guides.filter(name => name !== guide.name));
                    }
                  }}
                />
                <span className="label-text ml-2">{guide.name}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button className="btn btn-success w-full mt-6" type="submit">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
