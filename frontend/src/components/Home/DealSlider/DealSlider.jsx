import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 1,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const DealSlider = ({ title }) => {
    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center bg-white rounded-2xl mx-4 mt-4 mb-2 shadow-sm border border-gray-200">
    <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        </div>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    </div>
    <Link 
        to="/products" 
        className="bg-blue-600 text-sm font-semibold text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 border border-blue-600 hover:border-blue-700"
    >
        VIEW ALL
    </Link>
</div>
            <hr />
            {/* <!-- header --> */}

                <Slider {...settings}>
                    {getRandomProducts(offerProducts, 12).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>

        </section>
    );
};

export default DealSlider;
