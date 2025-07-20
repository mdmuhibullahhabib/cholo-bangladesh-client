import React, { useContext } from 'react' 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FacebookShareButton } from 'react-share';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaHandshake, FaWallet, FaHeadset, FaMapMarkedAlt } from "react-icons/fa";
import SectionTitle from './SectionTitle';
import OurPackages from './OurPackages';
import OurGuide from './OurGuide';
import { AuthContext } from '../Provider/Authprovider';
import TouristStorySection from './TouristStorySection';

function Travel({ story, isLoggedIn }) {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

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
        <div className="bg-gradient-to-br from-[#e0f2f1] via-[#fffde7] to-[#ffe0b2]">
            <section className="mt-16 max-w-6xl mx-auto px-4">
                <SectionTitle
                    heading={"Tourism & Travel Guide"}
                    subheading={"Your ultimate companion for discovering tours, meeting expert guides, and planning the perfect trip across Bangladesh."}
                />

                <Tabs>
                    <TabList className="flex justify-center gap-4">
                        <Tab>Our Packages</Tab>
                        <Tab>Meet Our Tour Guides</Tab>
                    </TabList>

                    <TabPanel>
                        <OurPackages />
                    </TabPanel>

                    <TabPanel>
                        <OurGuide />
                    </TabPanel>
                </Tabs>
            </section>

            <section className="card mx-auto rounded-lg py-12 px-6">
                <SectionTitle
                    heading={"Traveler Stories"}
                    subheading={"Real journeys. Real people. Discover unforgettable memories shared by travelers who explored the heart of Bangladesh."}
                />
                <TouristStorySection />
            </section>

            <section className="my-20 px-4 max-w-7xl mx-auto">
                <SectionTitle
                    heading={"Top Destinations of Bangladesh"}
                    subheading={"Explore the most iconic, breathtaking, and culturally rich places that define the beauty of Bangladesh."}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((place, idx) => (
                        <div key={idx} className="card bg-white bg-opacity-95 shadow-md hover:shadow-xl rounded-lg transition-all">
                            <figure>
                                <img src={place.image} alt={place.name} className="h-48 w-full object-cover rounded-t-lg" />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-xl font-bold text-[#00695c]">{place.name}</h3>
                                <p className="text-gray-600">{place.desc}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-outline btn-success">Explore</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-20 px-4 max-w-6xl mx-auto text-center">
                <SectionTitle
                    heading={"Why Travel With Us"}
                    subheading={"Discover the beauty of Bangladesh with experts who care. Here's why thousands of travelers choose us."}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => (
                        <div key={idx} className="p-6 bg-white bg-opacity-90 rounded-xl shadow hover:shadow-2xl transition duration-300">
                            <div className="mb-4 flex justify-center">{item.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-[#004d40]">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Travel
