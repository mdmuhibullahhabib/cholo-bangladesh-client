import React, { useEffect, useState, useContext } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/Authprovider';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


// Helper to format ISO date
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const TouristStorySection = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()


        const { data: stories = [], refetch } = useQuery({
            queryKey: ['story'],
            queryFn: async () => {
                const res = await axiosPublic.get('/story-random')
                return res.data;
            }
        })

        const handleShareClick = () => {
            if (!user) {
                navigate('/auth/login');
            }
        };

        const handleViewAll = () => {
            navigate('/stories');
        };

        return (
            <section className="max-w-6xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stories.map((story) => (
                        <div key={story._id.$oid || story._id} className="bg-base-100 p-6 rounded-xl shadow-md space-y-4">
                            {story.image && (
                                <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg" />
                            )}
                            <h3 className="text-xl font-semibold">{story.title}</h3>
                            <p className="text-sm text-gray-600">{formatDate(story.createdAt)}</p>
                            <p className="text-gray-700">{story.description?.slice(0, 150)}...</p>
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-sm font-medium text-primary">By {story.name}</p>
                                {user ? (
                                    <FacebookShareButton
                                        url={`${window.location.origin}/stories/${story._id.$oid || story._id}`}
                                        quote={`Check out this travel story: "${story.title}"`}
                                        onClick={handleShareClick}
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                ) : (
                                    <button
                                        onClick={() => navigate('/auth/login')}
                                        className="text-blue-600 underline text-sm"
                                    >
                                        Login to Share
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8">
                    <Link to={'/community'} className="btn btn-outline btn-primary">
                        All Stories
                    </Link>
                </div>
            </section>
        );
    };

    export default TouristStorySection;
