import React from 'react'
import Slider from 'react-slick';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const SliderCustom = ({ images }) => {
    return (
        <div>
            <Slider {...settings}>
                {images && images.length > 0 && images.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
                            <img
                                src={item}
                                alt={`slide-${index}`}
                                className='object-contain m-auto rounded-md h-full' />
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default SliderCustom