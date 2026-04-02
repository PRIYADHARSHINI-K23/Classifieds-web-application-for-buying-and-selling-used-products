import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import Product from './Product';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    swipe: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 768,
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

const ProductSlider = ({ title, tagline, productId }) => {

    const { loading, products } = useSelector((state) => state.products);

    // Filter out the current product from the list if productId is provided
    const filteredProducts = productId ? products?.filter(product => product._id !== productId) : products;

    return (
        <section className="bg-white/50 backdrop-blur-3xl w-full overflow-hidden border border-blue-100 rounded-[3rem] shadow-2xl shadow-blue-900/5 mb-12">
            {/* <!-- header --> */}
            <div className="flex px-10 py-8 justify-between items-center">
                <div className="title flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        <h1 className="text-2xl font-black text-blue-950 uppercase tracking-tighter leading-none">{title}</h1>
                    </div>
                    <p className="text-[10px] font-black text-blue-800/40 uppercase tracking-[0.3em] ml-11">{tagline}</p>
                </div>
                <Link to="/products" className="bg-blue-600 hover:bg-blue-800 text-[10px] font-black text-white px-8 py-4 rounded-2xl shadow-2xl shadow-blue-600/30 uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 leading-none">View All</Link>
            </div>

            <div className="px-1 shadow-inner bg-blue-50/20">
                {loading ? (
                    <div className="h-[400px] flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    filteredProducts && filteredProducts.length > 0 ? (
                        <Slider {...settings} className="flex items-center py-8 justify-start">
                            {getRandomProducts(filteredProducts, 12).map((product) => (
                                <div className="px-4" key={product._id}>
                                    <Product {...product} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[300px] text-center p-8 bg-blue-50/10 gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-200 mb-2">
                                <ShoppingBagIcon sx={{ fontSize: 32 }} />
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">No Similar Products Available</p>
                        </div>
                    )
                )}
            </div>

        </section>
    );
};

export default ProductSlider;
