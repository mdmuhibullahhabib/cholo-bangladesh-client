import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Community = () => {
  const [stories, setStories] = useState(
    [
        {
          _id: "1",
          userName: "Nusrat Jahan",
          userPhoto: "https://i.ibb.co/2j9c7nb/female-user.jpg",
          title: "Magical Moments at Sajek Valley",
          description: "The clouds dancing below the hills made me feel like I was in heaven.",
          image: "https://i.ibb.co/xMqjc7k/sajek.jpg",
          postDate: "2025-03-12"
        },
        {
          _id: "2",
          userName: "Tanvir Rahman",
          userPhoto: "https://i.ibb.co/jGxHTxT/male-user.jpg",
          title: "Adventure in Bandarban",
          description: "Hiking Nilgiri and sleeping under the stars—Bandarban stole my heart.",
          image: "https://i.ibb.co/q5M68fJ/bandarban.jpg",
          postDate: "2025-03-15"
        },
        {
          _id: "3",
          userName: "Sumaiya Akter",
          userPhoto: "https://i.ibb.co/NV4Xgfk/user3.jpg",
          title: "Sunset Serenity at Cox’s Bazar",
          description: "Watching the sunset with my family on the world’s longest sea beach!",
          image: "https://i.ibb.co/SJ0ZvnB/coxsbazar.jpg",
          postDate: "2025-03-20"
        },
        {
          _id: "4",
          userName: "Mehedi Hasan",
          userPhoto: "https://i.ibb.co/2YVqbtp/user4.jpg",
          title: "Exploring Srimangal Tea Gardens",
          description: "The aroma of tea and the scenic green hills refreshed my soul.",
          image: "https://i.ibb.co/5L5DQ3L/srimangal.jpg",
          postDate: "2025-03-22"
        },
        {
          _id: "5",
          userName: "Jannatul Ferdous",
          userPhoto: "https://i.ibb.co/F5HFhS6/female-avatar.jpg",
          title: "Rangamati Boat Journey",
          description: "Floating on the Kaptai Lake felt like drifting through a dream.",
          image: "https://i.ibb.co/HT0k7F5/rangamati.jpg",
          postDate: "2025-03-25"
        },
        {
          _id: "6",
          userName: "Ashikur Rahman",
          userPhoto: "https://i.ibb.co/ZK4fmy2/avatar1.jpg",
          title: "A Day in Paharpur Ruins",
          description: "The ancient Buddhist Vihara gave me goosebumps. History lives here!",
          image: "https://i.ibb.co/tH0q5f9/paharpur.jpg",
          postDate: "2025-03-28"
        },
        {
          _id: "7",
          userName: "Farzana Mimi",
          userPhoto: "https://i.ibb.co/xgsDLxh/user-f.jpg",
          title: "Whispers of Sundarbans",
          description: "The mangrove forests, wild silence, and a glimpse of a tiger’s paw!",
          image: "https://i.ibb.co/Yf8QnR1/sundarbans.jpg",
          postDate: "2025-04-01"
        },
        {
          _id: "8",
          userName: "Rafiul Islam",
          userPhoto: "https://i.ibb.co/txNK4g6/user-m.jpg",
          title: "Shat Gambuj Mosque Visit",
          description: "The serenity of this historical mosque is unmatched. A must-visit!",
          image: "https://i.ibb.co/GP4w1Hs/shatgambuj.jpg",
          postDate: "2025-04-03"
        },
        {
          _id: "9",
          userName: "Mahin Chowdhury",
          userPhoto: "https://i.ibb.co/z6QzVmH/user7.jpg",
          title: "Cycling Through Saint Martin’s Island",
          description: "Crystal clear water, friendly locals, and coconut paradise!",
          image: "https://i.ibb.co/yqCFFPt/st-martin.jpg",
          postDate: "2025-04-05"
        },
        {
          _id: "10",
          userName: "Lamia Nahar",
          userPhoto: "https://i.ibb.co/gmGbDcT/user8.jpg",
          title: "Peaceful Days in Khagrachari",
          description: "The hills of Khagrachari gave me a new perspective on life.",
          image: "https://i.ibb.co/k8gFXm3/khagrachari.jpg",
          postDate: "2025-04-07"
        }
      ]      
  );
//   const { user } = useContext(AuthContext);
  const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('/api/stories')
//       .then(res => setStories(res.data))
//       .catch(err => console.error('Error fetching stories:', err));
//   }, []);

  const handleShare = (storyUrl) => {
    if (!user) {
      navigate('/login');
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">🌏 Community Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="card bg-base-100 shadow-md">
            <figure><img src={story.image} alt={story.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body space-y-2">
              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-gray-600">{story.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <img src={story.userPhoto} alt="User" className="w-10 h-10 rounded-full border" />
                <div>
                  <p className="font-semibold">{story.userName}</p>
                  <p className="text-xs text-gray-500">{story.postDate}</p>
                </div>
              </div>
              <div className="pt-3">
                <FacebookShareButton
                  url={window.location.href}
                  quote={story.title}
                  onClick={() => handleShare(window.location.href)}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
