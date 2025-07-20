import React from 'react';
import SectionTitle from './SectionTitle';

function Overview() {
    return (
        <div className="bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fce4ec] pb-10 pt-16 px-4">
            <div className="text-center max-w-5xl mx-auto">
                <SectionTitle
                    heading={"Why Cholo Bangladesh?"}
                    subheading={"Discover the beauty, heritage, and hospitality of Bangladesh. Our platform helps you explore iconic destinations and hidden gems with ease."}
                />
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl mt-8">
                    <iframe
                        src="https://www.youtube.com/embed/puDBmnIXe_k?si=aPAxBfena1Xno7dJ"
                        title="Cholo Bangladesh Overview"
                        allowFullScreen
                        className="w-full h-[415px]"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Overview;
