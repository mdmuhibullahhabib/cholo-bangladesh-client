import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

import image1 from '../assets/Banner.1.jpg'
import image2 from '../assets/Banner.2.jpg'
import image3 from '../assets/Banner.3.jpg'
import image4 from '../assets/Banner.4.jpg'
import image5 from '../assets/Banner.5.jpg'
import image6 from '../assets/Banner.6.jpg'

function Banner() {
    return (
        <Carousel>
            <div>
                <img src={image1} />
            </div>
            <div>
                <img src={image2} />
            </div>
            <div>
                <img src={image3} />
            </div>
            <div>
                <img src={image4} />
            </div>
            <div>
                <img src={image5} />
            </div>
            <div>
                <img src={image6} />
            </div>
        </Carousel>
    )
}

export default Banner