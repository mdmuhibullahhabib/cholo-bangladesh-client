import React, { useContext } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Provider/Authprovider';

const Community = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Fetch stories using react-query
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/stories');
      console.log(stories)
      return res.data;
    },
  });
  console.log(stories)

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
    return <div className="text-center py-10">Loading stories...</div>;
  }

  return (
    <div className="px-4 mt-12 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">🌏 Community Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id?.$oid || story._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={story.image}
                alt={story.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body space-y-2">
              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-gray-600">{story.description}</p>

              <div className="flex items-center gap-3 mt-2">
                <img
                  src={story.userPhoto || 'https://i.ibb.co/4pDNDk1/default-user.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold">{story.name}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
