import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FacebookShareButton } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaHandshake, FaWallet, FaHeadset, FaMapMarkedAlt } from "react-icons/fa";
import SectionTitle from './SectionTitle';
import OurPackages from './OurPackages';
import OurGuide from './OurGuide';

function Travel({ story, isLoggedIn }) {

    const navigate = useNavigate();

    const handleShare = () => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    };

    const destinations = [
        {
            name: "Cox’s Bazar",
            image: "/images/coxs-bazar.jpg",
            desc: "World's longest sea beach with breathtaking sunsets.",
        },
        {
            name: "Sundarbans",
            image: "/images/sundarbans.jpg",
            desc: "Home of the Royal Bengal Tiger and lush mangroves.",
        },
        {
            name: "Srimangal",
            image: "/images/srimangal.jpg",
            desc: "The tea capital of Bangladesh, rich in natural beauty.",
        },
        {
            name: "Bandarban",
            image: "/images/bandarban.jpg",
            desc: "Hilly paradise filled with waterfalls and tribal culture.",
        },
    ];

    const features = [
        {
            icon: <FaUserCheck className="text-3xl text-primary" />,
            title: "Expert Guides",
            desc: "Our guides are locals with deep knowledge and passion.",
        },
        {
            icon: <FaHandshake className="text-3xl text-primary" />,
            title: "Authentic Experience",
            desc: "We focus on culture, cuisine, and real connections.",
        },
        {
            icon: <FaWallet className="text-3xl text-primary" />,
            title: "Affordable Pricing",
            desc: "Best experiences without breaking the bank.",
        },
        {
            icon: <FaHeadset className="text-3xl text-primary" />,
            title: "24/7 Support",
            desc: "We’ve got your back, anytime, anywhere.",
        },
    ];



    return (
        <div>
            <section className="my-16 max-w-6xl mx-auto px-4">
            <SectionTitle
            heading={"Tourism & Travel Guide"}
            subheading={"Your ultimate companion for discovering tours, meeting expert guides, and planning the perfect trip across Bangladesh."}
            ></SectionTitle>

                <Tabs>
                    <TabList className="flex justify-center gap-4">
                        <Tab>Our Packages</Tab>
                        <Tab>Meet Our Tour Guides</Tab>
                    </TabList>

                    <TabPanel>
                        {/* Fetch 3 random packages from MongoDB using $sample and map them into cards */}
                        <OurPackages></OurPackages>
                    </TabPanel>

                    <TabPanel>
                        <OurGuide></OurGuide>
                    </TabPanel>
                </Tabs>
            </section>

            {/* story section*/}
            <section className="card mx-auto bg-base-100 shadow-xl">
                <SectionTitle
                heading={"Traveler Stories"}
                subheading={"Real journeys. Real people. Discover unforgettable memories shared by travelers who explored the heart of Bangladesh."}
                ></SectionTitle>
                <figure><img src={story?.image} alt={story?.title} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{story?.title}</h2>
                    <p>{story?.snippet}</p>
                    <div className="flex justify-between items-center">
                        <FacebookShareButton
                            url={window.location.href}
                            quote={story?.title}
                            onClick={handleShare}
                        >
                            <button className="btn btn-outline btn-primary">Share</button>
                        </FacebookShareButton>
                    </div>
                </div>
            </section>
            {/* Top Destinations */}
            <section className="my-20 px-4 max-w-7xl mx-auto">
                <SectionTitle
                heading={"Top Destinations of Bangladesh"}
                subheading={"Explore the most iconic, breathtaking, and culturally rich places that define the beauty of Bangladesh."}
                ></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((place, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-md hover:shadow-lg">
                            <figure>
                                <img src={place.image} alt={place.name} className="h-48 w-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-xl">{place.name}</h3>
                                <p>{place.desc}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-success">Explore</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* why travel with us */}
            <section className="my-20 px-4 max-w-6xl mx-auto text-center">
                <SectionTitle
                    heading={"Why Travel With Us"}
                    subheading={"Discover the beauty of Bangladesh with experts who care. Here's why thousands of travelers choose us."}
                    ></SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => (
                        <div key={idx} className="p-6 bg-base-100 rounded-xl shadow hover:shadow-xl transition duration-300">
                            <div className="mb-4 flex justify-center">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    )
}

export default Travel