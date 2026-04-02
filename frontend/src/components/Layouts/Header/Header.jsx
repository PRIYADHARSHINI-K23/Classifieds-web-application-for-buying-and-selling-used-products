import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import quickByLogo from '../../../assets/images/quickbuy_logo.png';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const location = useLocation();

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const prevCartCountRef = useRef(0);
  const dropdownRef = useRef(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartItems.length > prevCartCountRef.current && cartItems.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 600);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItems.length;
  }, [cartItems.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTogglePrimaryDropDown(false);
      }
    };

    if (togglePrimaryDropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [togglePrimaryDropDown]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md border-b border-gray-200 py-2' 
        : 'bg-white border-b border-gray-200 py-3'
    } ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center">

          {/* Logo Section - Flipkart/Amazon Style */}
          <Link className="flex items-center" to="/" onClick={closeMobileMenu}>
            <div className="flex items-center">
              <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center">
                <img 
                  draggable="false" 
                  className="w-full h-full object-contain" 
                  src={quickByLogo} 
                  alt="QuickBuy" 
                />
              </div>
              <div className="ml-1.5 hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-[#2874f0] tracking-tight leading-none">
                  Quick<span className="text-[#fb641b]">Buy</span>
                </h1>
                <div className="flex items-center text-[10px] text-gray-500 mt-0.5">
                  <span className="text-[#388e3c] font-semibold">Delivery</span>
                  <span className="mx-1">in</span>
                  <span className="text-[#fb641b] font-semibold">Hours</span>
                  <span className="ml-1 text-yellow-500">★</span>
                  <span className="ml-1 text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Search Bar - Amazon/Flipkart Style (Desktop) */}
          {/* <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="w-full flex">
              <input 
                type="text" 
                placeholder="Search for products, brands and more..." 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-l-md text-sm focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]"
              />
              <button className="px-6 py-2.5 bg-[#fb641b] text-white rounded-r-md hover:bg-[#f85a1a] transition-colors flex items-center gap-2">
                <SearchIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          </div> */}

          {/* Desktop Navigation - Flipkart/Amazon Style */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* Navigation Links */}
            <nav className="flex items-center gap-1">
              {[
                { label: 'Home', path: '/', icon: <HomeIcon sx={{ fontSize: "18px" }} /> },
                { label: 'Products', path: '/products', icon: <CategoryIcon sx={{ fontSize: "18px" }} /> },
                { label: 'About', path: '/about', icon: <InfoIcon sx={{ fontSize: "18px" }} /> },
                { label: 'Contact', path: '/contact', icon: <ContactMailIcon sx={{ fontSize: "18px" }} /> }
              ].map((nav) => (
                <Link 
                  key={nav.path} 
                  to={nav.path} 
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 rounded-sm
                    ${location.pathname === nav.path 
                      ? 'text-[#2874f0]' 
                      : 'text-gray-700 hover:text-[#2874f0]'
                    }`}
                >
                  <span className={location.pathname === nav.path ? 'text-[#2874f0]' : 'text-gray-500'}>
                    {nav.icon}
                  </span>
                  {nav.label}
                </Link>
              ))}
            </nav>

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-[#2874f0] transition-colors">
              <FavoriteBorderIcon sx={{ fontSize: "22px" }} />
            </Link>

            {/* Cart - Flipkart/Amazon Style */}
            <Link 
              to="/cart" 
              className="relative flex items-center gap-1 p-2 text-gray-700 hover:text-[#2874f0] transition-colors group"
            >
              <ShoppingCartIcon sx={{ fontSize: "22px" }} />
              <span className="text-sm font-medium">Cart</span>
              {cartItems.length > 0 && (
                <span className={`absolute -top-1 left-4 bg-[#fb641b] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border border-white shadow-sm ${cartPulse ? 'animate-pulse' : ''}`}>
                  {cartItems.length > 9 ? '9+' : cartItems.length}
                </span>
              )}
            </Link>

            {/* User Section - Flipkart/Amazon Style */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                  onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
                >
                  <div className="w-7 h-7 rounded-full bg-[#2874f0] flex items-center justify-center text-white text-sm font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-gray-800 text-xs font-medium">
                      {user?.name && user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {togglePrimaryDropDown ? 'Menu' : 'Account'}
                    </span>
                  </div>
                  {togglePrimaryDropDown ? (
                    <ExpandLessIcon sx={{ fontSize: 16, className: 'text-gray-600' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 16, className: 'text-gray-600' }} />
                  )}
                </div>
                
                {togglePrimaryDropDown && (
                  <div className="absolute top-[110%] right-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fadeIn">
                    <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login" 
                  className="px-5 py-1.5 text-sm font-medium text-[#2874f0] border border-[#2874f0] rounded-sm hover:bg-[#2874f0] hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-1.5 text-sm font-medium bg-[#fb641b] text-white rounded-sm hover:bg-[#f85a1a] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Header - Flipkart/Amazon Style */}
          <div className="flex items-center gap-2 lg:hidden">
            
            {/* Search Button (Mobile) */}
            <button className="p-2 text-gray-700">
              <SearchIcon sx={{ fontSize: "22px" }} />
            </button>
            
            {/* Cart (Mobile) */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700"
            >
              <ShoppingCartIcon sx={{ fontSize: "22px" }} />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#fb641b] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {cartItems.length > 9 ? '9+' : cartItems.length}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button - Flipkart Style */}
            <button 
              className="p-2 rounded-sm hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu - Flipkart/Amazon Style */}
      <div className={`lg:hidden fixed inset-0 bg-black/50 transition-all duration-300 z-50 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`} onClick={closeMobileMenu}>
        <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-xl transition-all duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`} onClick={e => e.stopPropagation()}>
          
          {/* Mobile Menu Header - Flipkart Style */}
          <div className="bg-[#2874f0] p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <img className="w-6 h-6 object-contain" src={quickByLogo} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-base">QuickBuy</h3>
                <p className="text-white/80 text-xs">Delivery in Hours</p>
              </div>
            </div>
            {!isAuthenticated && (
              <div className="mt-4 flex items-center gap-2">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex-1 py-2 bg-white text-[#2874f0] text-sm font-medium rounded-sm text-center hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex-1 py-2 bg-[#fb641b] text-white text-sm font-medium rounded-sm text-center hover:bg-[#f85a1a]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation - Flipkart Style */}
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Navigation
            </p>
            <ul className="space-y-0.5">
              {[
                { path: '/', label: 'Home', icon: <HomeIcon sx={{ fontSize: "20px" }} /> },
                { path: '/products', label: 'Products', icon: <CategoryIcon sx={{ fontSize: "20px" }} /> },
                { path: '/about', label: 'About', icon: <InfoIcon sx={{ fontSize: "20px" }} /> },
                { path: '/contact', label: 'Contact', icon: <ContactMailIcon sx={{ fontSize: "20px" }} /> }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-4 px-3 py-3 rounded-sm transition-all ${
                      location.pathname === item.path
                        ? 'bg-[#2874f0]/10 text-[#2874f0]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >

                    
                    <span className={location.pathname === item.path ? 'text-[#2874f0]' : 'text-gray-500'}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Account Section - Mobile */}
            {isAuthenticated && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                  Account
                </p>
                <div className="space-y-0.5">
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 px-3 py-3 rounded-sm text-gray-700 hover:bg-gray-50"
                  >
                    <PersonIcon sx={{ fontSize: "20px", className: 'text-gray-500' }} />
                    <span className="text-sm font-medium">My Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 px-3 py-3 rounded-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-sm font-medium">My Orders</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 px-3 py-3 rounded-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FavoriteBorderIcon sx={{ fontSize: "20px", className: 'text-gray-500' }} />
                    <span className="text-sm font-medium">Wishlist</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* No Scroll Progress Indicator - Removed for Flipkart/Amazon style */}

    </header>
  );
};

export default Header;
