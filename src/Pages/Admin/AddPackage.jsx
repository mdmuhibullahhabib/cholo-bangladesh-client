import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useGuide from '../../hooks/useGuide';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    gallery: [],
    description: '',
    tourPlan: [{ plan: '' }],
    guideId: ''
  });

  const [guides] = useGuide();
  const axiosSecure = useAxiosSecure();
  console.log(guides)

  const handleGalleryChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim());
    setFormData({ ...formData, gallery: urls });
  };

  const handleTourPlanChange = (index, value) => {
    const updatedTourPlan = [...formData.tourPlan];
    updatedTourPlan[index].plan = value;
    setFormData({ ...formData, tourPlan: updatedTourPlan });
  };

  const addTourDay = () => {
    setFormData({ ...formData, tourPlan: [...formData.tourPlan, { plan: '' }] });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    axiosSecure.post('/package', formData)
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
          form.reset();
        }
      })
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Package Title" className="input input-bordered w-full" required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input type="number" placeholder="Price" className="input input-bordered w-full" required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input type="text" placeholder="Gallery Images (comma-separated URLs)" className="input input-bordered w-full"
          value={formData.gallery.join(', ')}
          onChange={handleGalleryChange}
        />
        <textarea className="textarea textarea-bordered w-full" placeholder="About the Tour"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>

        <div>
          <label className="font-semibold">Tour Plan (Day-wise)</label>
          {formData.tourPlan.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Day ${index + 1} Plan`}
              className="input input-bordered w-full my-2"
              value={item.plan}
              onChange={(e) => handleTourPlanChange(index, e.target.value)}
            />
          ))}
          <button type="button" className="btn btn-outline btn-sm" onClick={addTourDay}>+ Add Day</button>
        </div>


        <select className="select select-bordered w-full" required
          value={formData.guideId}
          onChange={(e) => setFormData({ ...formData, guideId: e.target.value })}
        >
          <option disabled value="">Select Tour Guide</option>
          {
            guides.map(guide => (
              <option key={guide._id} value={guide._id}>{guide.name}</option>
            ))
          }
        </select>

        <button type="submit" className="btn btn-primary w-full">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackage;
