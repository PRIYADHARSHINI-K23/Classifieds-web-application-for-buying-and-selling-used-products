import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts, getProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import HomeHealthArticles from './HomeHealthArticles';
import HomeExperts from './HomeExperts';
import HomeBrands from './HomeBrands';
import HomeDelivery from './HomeDelivery';
import brandImg from '../../assets/images/Home/brand.svg';
import expertImg from '../../assets/images/Home/expert.svg';
import deliveryImg from '../../assets/images/Home/delivery.svg';
import tipsImg from '../../assets/images/Home/health_tips.svg';
import HomeHighlights from './HomeHighlights';
import AboutSite from './AboutSite';

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    if (error) {
      if (error !== "Please Login to Access") {
        enqueueSnackbar(error, { variant: "error" });
      }
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
    dispatch(getProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Quick Buy | Comfort Delivered Home" />

      <main className="w-full mt-20 sm:mt-24 min-h-screen bg-slate-50 relative overflow-hidden">

        {/* Premium Medical Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
          <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-white/40 blur-[120px] rounded-full"></div>

          {/* Clinical Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
        </div>

        <div className="container-responsive relative z-10 flex flex-col gap-16 py-8 sm:py-16">

          {/* Banner Section */}
          <section className="animate-fade-in-up w-full rounded-[3.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white bg-white/40 backdrop-blur-2xl">
            <Banner />
          </section>

          {/* Seller Dashboard Quick Access */}
          {seller?.role === 'seller' ? (
            <section className="animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
              <div className="w-full bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.1]"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-[9px] font-black uppercase tracking-widest mb-4">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      Seller Command Center
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                      Welcome Back, <span className="text-blue-200">{seller.name.split(' ')[0]}</span>
                    </h2>
                    <p className="text-blue-100/70 text-sm font-bold uppercase tracking-wide">
                      Manage your products and track your orders in real-time.
                    </p>
                  </div>
                  <Link 
                    to="/seller/dashboard" 
                    className="px-12 py-5 bg-white text-blue-800 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                  >
                    Enter Dashboard
                  </Link>
                </div>
              </div>
            </section>
          ) : (
             <section className="animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
              <div className="w-full bg-white rounded-[2.5rem] p-8 sm:p-12 border border-blue-100 shadow-xl shadow-blue-900/5 flex flex-col sm:flex-row items-center justify-between gap-8 bg-gradient-to-br from-white to-blue-50/30">
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tighter leading-none mb-2">
                    Become a <span className="text-blue-600">QuickBuy Merchant</span>
                  </h2>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">
                    Scale your business with our premium logistics network.
                  </p>
                </div>
                <Link 
                  to="/register" 
                  className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 transition-all duration-300"
                >
                  Start Selling
                </Link>
              </div>
            </section>
          )}



          {/* Featured Products Slider */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <ProductSlider title="Featured Products" tagline="Click any product to view details & order" />
          </section>

          {/* Why Choose Us - Premium Clinical Block */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <AboutSite
              variant="blue"
              image={brandImg}
              title="State-of-the-Art Clinical Care"
              description="We leverage advanced logistics and professional expertise to deliver a premium healthcare experience right to your fingertips."
              bullets={["100% SECURE PROTOCOL", "LIVE SPECIALIST SYNC", "EXPRESS CLINICAL DELIVERY"]}
            />
          </section>

          {/* Delivery & Support */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <HomeDelivery />
          </section>

          <section className="animate-fade-in-up mb-20" style={{ animationDelay: '1s' }}>
            <AboutSite
              variant="blue"
              image={deliveryImg}
              title="Vibrant Health Integration"
              description="Safe, fast, and secure delivery of your essential medical supplies. We prioritize your health with every shipment."
              bullets={["REAL-TIME ASSET TRACKING", "BIO-SECURE PACKAGING", "AUTOMATED RETURN PROTOCOLS"]}
            />
          </section>

        </div>
      </main>
    </>
  );
};

export default Home;