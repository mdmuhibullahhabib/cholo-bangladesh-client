import React from 'react'
import SectionTitle from './SectionTitle'

function Overview() {
    return (
        <div className="my-16 text-center max-w-5xl mx-auto px-4">
            <SectionTitle
            heading={"Why Cholo Bangladesh?"}
            subheading={"Discover the beauty, heritage, and hospitality of Bangladesh. Our platform helps you explore iconic destinations and hidden gems with ease."}
            ></SectionTitle>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
                <iframe
                    src="https://www.youtube.com/embed/puDBmnIXe_k?si=aPAxBfena1Xno7dJ"
                    title="Cholo Bangladesh Overview"
                    allowFullScreen
                    className="w-full h-[415px]"
                ></iframe>
            </div>
        </div>
    )
}

export default Overview