import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Premium banner images
const medicalBanner1 = 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&h=600&fit=crop';
const medicalBanner2 = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=600&fit=crop';
const medicalBanner3 = 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1600&h=600&fit=crop';

export const PreviousBtn = ({ className, onClick }) => (
  <div className={`${className} z-20 !flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 left-4 sm:left-8`} onClick={onClick}>
    <ArrowBackIosIcon sx={{ color: 'white', fontSize: 20, ml: 1 }} />
  </div>
);

export const NextBtn = ({ className, onClick }) => (
  <div className={`${className} z-20 !flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 right-4 sm:right-8`} onClick={onClick}>
    <ArrowForwardIosIcon sx={{ color: 'white', fontSize: 20 }} />
  </div>
);

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: !isMobile ? <PreviousBtn /> : false,
    nextArrow: !isMobile ? <NextBtn /> : false,
    arrows: !isMobile,
    fade: true,
    customPaging: i => (
      <div className="w-2 h-2 mx-1 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300 dot-inner" />
    )
  };

 const banners = [
    {
      img: medicalBanner1,
      title: "Flash Sale: 70% Off",
      sub: "Limited time offers on top brands. Electronics, fashion, and more delivered free across India."
    },
    {
      img: medicalBanner2,
      title: "Summer Collection Drop",
      sub: "Fresh styles, lightweight fabrics and bold colors. New arrivals starting at just ₹499."
    },
    {
      img: medicalBanner3,
      title: "Smartphone Mega Deals",
      sub: "Latest 5G smartphones with no-cost EMI up to 24 months. Exchange bonus available."
    }
  ];
  return (
    <section className="w-full relative group overflow-hidden rounded-[3rem] shadow-2xl shadow-blue-900/10 border-4 border-white/50">
      <Slider {...settings}>
        {banners.map((banner, i) => (
          <div key={i} className="relative outline-none">
            <div className="h-[400px] sm:h-[500px] lg:h-[550px] w-full relative">
              <img
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                src={banner.img}
                alt={banner.title}
              />
              {/* Premium Clinical Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/60 to-transparent"></div>

              {/* Clinical Decorative Elements */}
              <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-teal-400/10 blur-[100px] rounded-full"></div>

              <div className="absolute inset-0 flex items-center px-6 sm:px-12 lg:px-32">
                <div className="max-w-3xl animate-fade-in-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 text-blue-200 text-[10px] font-black tracking-[0.4em] uppercase mb-6 shadow-2xl">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping"></span>
                    Verified Clinical Expo
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase line-clamp-2">
                    {banner.title.split(' ').map((word, idx) => (
                      <span key={idx} className={idx % 2 === 0 ? "text-white" : "text-blue-400"}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>

                  <div className="w-16 h-1.5 bg-blue-500 mb-6"></div>

                  <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed max-w-xl font-bold uppercase tracking-wide opacity-90">
                    {banner.sub}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a href="/products" className="btn-primary !px-10 !py-5 !text-[10px] !bg-blue-600 hover:!bg-blue-800">
                      Access Care Catalog
                    </a>
                    <a href="/about" className="group flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-white/10 backdrop-blur-3xl text-white border border-white/20 hover:bg-white/20 transition-all duration-500">
                      Our Philosophy
                      <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                        <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;
