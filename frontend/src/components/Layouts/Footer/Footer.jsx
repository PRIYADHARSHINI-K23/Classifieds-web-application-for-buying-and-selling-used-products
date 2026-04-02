import { useEffect, useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';
import quickByLogo from '../../../assets/images/quickbuy_logo.png';

const footerLinks = [
  {
    title: "ABOUT",
    links: [
      { name: "About Us", redirect: "/about" },
      { name: "Careers", redirect: "#" },
      { name: "Contact", redirect: "/contact" }
    ]
  },
  {
    title: "HELP",
    links: [
      { name: "Payments", redirect: "#" },
      { name: "Shipping", redirect: "#" },
      { name: "Returns", redirect: "#" }
    ]
  },
  {
    title: "POLICY",
    links: [
      { name: "Terms", redirect: "#" },
      { name: "Privacy", redirect: "#" },
      { name: "Security", redirect: "#" }
    ]
  },
  {
    title: "SOCIAL",
    links: [
      { name: "Facebook", redirect: "#", icon: <FacebookIcon sx={{ fontSize: 16, className: 'text-gray-400 hover:text-amber-500' }} /> },
      { name: "Instagram", redirect: "#", icon: <InstagramIcon sx={{ fontSize: 16, className: 'text-gray-400 hover:text-amber-500' }} /> }
    ]
  }
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <footer className="w-full bg-[#0a1a2e] mt-10 relative no-print">

          {/* Main Footer - Navy Blue Section */}
          <div className="bg-[#0a1a2e] pt-6 pb-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

              {/* Footer Links Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

                {/* Brand Column */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <img src={quickByLogo} alt="QuickBuy" className="w-6 h-6 object-contain brightness-0 invert" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Quick<span className="text-amber-500">Buy</span>
                      </h2>
                      <div className="flex items-center gap-1 mt-0.5">
                        <FlashOnIcon sx={{ fontSize: 12, className: 'text-white' }} />
                        <p className="text-xs text-[#fb641b]">Delivery in Hours</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3 max-w-xs">
                    India's fastest e-commerce delivery network.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <VerifiedIcon sx={{ fontSize: 14, className: 'text-gray-400' }} />
                      ISO 27001
                    </span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <SecurityIcon sx={{ fontSize: 14, className: 'text-gray-400' }} />
                      PCI DSS
                    </span>
                  </div>
                </div>

                {/* Footer Links */}
                {footerLinks.map((section) => (
                  <div key={section.title} className="lg:col-span-1">
                    <h3 className="text-xs font-semibold text-[#fb641b] uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.redirect}
                            className="text-xs text-gray-500 hover:text-[#fb641b]"
                          >
                            {link.icon}
                            <span className="text-gray-400 hover:text-[#fb641b]">{link.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Contact Information - Only changed black/gray to orange */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-t border-b border-gray-800">
                <div className="flex items-start gap-3">
                  <LocationOnIcon sx={{ fontSize: 16, className: 'text-[#fb641b]' }} />
                  <div>
                    <h4 className="text-xs font-semibold text-[#fb641b] uppercase mb-1">Registered Office</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      QuickBuy Towers, MG Road, Bengaluru - 560001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon sx={{ fontSize: 16, className: 'text-[#fb641b]' }} />
                  <div>
                    <h4 className="text-xs font-semibold text-[#fb641b] uppercase mb-1">24/7 Customer Care</h4>
                    <p className="text-xs text-gray-400">
                      <a href="tel:1800123QUICK" className="text-gray-400 hover:text-amber-500">1800-123-QUICK</a> (Toll Free)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      <a href="mailto:care@quickbuy.in" className="text-gray-400 hover:text-amber-500">care@quickbuy.in</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Trust - Only changed black/gray to orange */}
              {/* <div className="flex flex-col lg:flex-row justify-between items-center gap-4 py-6">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-xs text-amber-500 uppercase tracking-wider">Payment Methods:</span>
                  <img src={paymentMethods} alt="Payment Methods" className="h-6 brightness-0 invert opacity-70" />
                  <span className="text-xs text-gray-400">UPI | Cards | EMI | NetBanking | COD</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <StarIcon sx={{ fontSize: 14, className: 'text-gray-400' }} />
                    4.8★ (2M+ reviews)
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <LocalShippingIcon sx={{ fontSize: 14, className: 'text-gray-400' }} />
                    Free above ₹499
                  </span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Bottom Bar - Only changed black/gray to orange */}
          <div className="bg-[#05101f] py-3">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-xs text-gray-500">
                  © 2026 QuickBuy. All rights reserved.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-xs text-gray-500 hover:text-amber-500">Terms</a>
                  <span className="text-gray-700">|</span>
                  <a href="#" className="text-xs text-gray-500 hover:text-amber-500">Privacy</a>
                  <span className="text-gray-700">|</span>
                  <a href="#" className="text-xs text-gray-500 hover:text-amber-500">Sitemap</a>
                </div>
              </div>
            </div>
          </div>

          {/* App Banner - Keep as is (white text) */}
          {/* <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">⚡</span>
                  <span className="text-white text-xs font-medium">Download QuickBuy App for fast delivery</span>
                </div>
                <div className="flex items-center gap-3 mt-1 sm:mt-0">
                  <a href="#" className="text-white text-xs hover:underline">Google Play</a>
                  <span className="text-white/50">|</span>
                  <a href="#" className="text-white text-xs hover:underline">App Store</a>
                </div>
              </div>
            </div>
          </div> */}

        </footer>
      )}
    </>
  )
};

export default Footer;
