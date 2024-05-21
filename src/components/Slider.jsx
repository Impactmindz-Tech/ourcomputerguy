import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Images from '../constant/Images'

const Slider = () => {
    return (
        <Carousel className='pt-8' autoPlay={true} interval={2000} infiniteLoop={true} showThumbs={false}>
            <div>
                <img src={Images.Slider_img1} />
            </div>
            <div>
                <img src={Images.Slider_img2} />
            </div>
            <div>
                <img src={Images.Slider_img3} />
            </div>
        </Carousel>
    )
}

export default Slider