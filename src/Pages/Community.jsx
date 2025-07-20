import React, { useContext } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Provider/Authprovider';
import { motion } from 'framer-motion';

const Community = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/stories');
      return res.data;
    },
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLoginRedirect = () => {
    navigate('/auth/login');
  };

  if (isLoading) {
    return <div className="text-center py-10 text-xl font-medium">Loading stories...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-[#fdfcfb] via-[#eae8e1] to-[#f4f1ed] min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center text-[#2c3e50]"
        >
          🌏 Community Stories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center max-w-2xl mx-auto text-gray-700 mb-12"
        >
          Read inspiring travel stories shared by real users who explored the heart and soul of Bangladesh. Whether it’s an off-the-beaten-path adventure, a cultural gem, or a meaningful interaction—our community is here to inspire your next journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story._id?.$oid || story._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 space-y-3">
                <h3 className="text-xl font-semibold text-[#34495e]">{story.title}</h3>
                <p className="text-sm text-gray-600">{story.description}</p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={story.userPhoto || 'https://i.ibb.co/4pDNDk1/default-user.png'}
                    alt="User"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{story.name}</p>
                    <p className="text-xs text-gray-500">{formatDate(story.createdAt)}</p>
                  </div>
                </div>

                <div className="pt-3">
                  {user ? (
                    <FacebookShareButton
                      url={`${window.location.origin}/stories/${story._id?.$oid || story._id}`}
                      quote={story.title}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  ) : (
                    <button
                      onClick={handleLoginRedirect}
                      className="text-blue-600 underline text-sm"
                    >
                      Login to Share
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
