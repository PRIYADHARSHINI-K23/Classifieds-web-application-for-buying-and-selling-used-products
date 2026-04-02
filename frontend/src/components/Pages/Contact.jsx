import MetaData from '../Layouts/MetaData';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HeadsetIcon from '@mui/icons-material/Headset';
import ChatIcon from '@mui/icons-material/Chat';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { createContact } from '../../actions/contactusAction';
import { NEW_CONTACTUS_RESET } from '../../constants/contactusConstants';
import Swal from 'sweetalert2';

const Contact = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, success, message } = useSelector(
        (state) => state.newContactus || {}
    );

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        orderId: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email address is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(createContact(formData));

        setFormData({
            name: "",
            email: "",
            phone: "",
            orderId: "",
            message: "",
        });

        Swal.fire({
            title: "Success!",
            text: "Your data has been sent successfully",
            icon: "success",
            confirmButtonColor: "#2874f0",
            timer: 3000,
        });
    };

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: "Success!",
                text: "Your data has been sent successfully",
                icon: "success",
                confirmButtonColor: "#2874f0",
                timer: 3000,
            });

            const timer = setTimeout(() => {
                dispatch({ type: NEW_CONTACTUS_RESET });
            }, 100);

            return () => clearTimeout(timer);
        }

        if (error) {
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#2874f0",
                timer: 3000,
            });
        }
    }, [success, error, message, enqueueSnackbar, dispatch]);

    const contactInfo = [
        {
            icon: <EmailIcon sx={{ fontSize: 28 }} />,
            title: "Email Us",
            details: ["care@quickbuy.in", "orders@quickbuy.in"],
            response: "Reply in 24 hours",
            action: "care@quickbuy.in"
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 28 }} />,
            title: "Call Us",
            details: ["+91 98765 43210", "+91 99887 66550"],
            response: "Mon-Sat: 9AM-9PM",
            action: "+91 98765 43210"
        },
        {
            icon: <WhatsAppIcon sx={{ fontSize: 28 }} />,
            title: "WhatsApp",
            details: ["Chat with us", "+91 98765 43210"],
            response: "Reply in 1 hour",
            action: "Chat Now"
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
            title: "Customer Support",
            details: ["24/7 Live Assistance", "365 Days"],
            response: "Always Open",
            action: "Start Chat"
        }
    ];

    return (
        <main className="min-h-screen pt-28 pb-16 bg-white">
            <MetaData title="Contact Us | QuickBuy" />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Header - Flipkart/Amazon Style */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Contact <span className="text-[#2874f0]">Us</span>
                    </h1>
                    <p className="text-gray-600 text-base max-w-2xl mx-auto">
                        Have questions about your order, delivery, or products? We're here to help.
                    </p>
                </div>

                {/* Contact Info Cards - Flipkart Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-[#2874f0]">
                                    {info.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-base">
                                    {info.title}
                                </h3>
                            </div>
                            <div className="space-y-1 mb-3">
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">{info.response}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid - Flipkart/Amazon Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Form - Amazon Style */}
                    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                            Send Us a Message
                        </h2>

                        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors placeholder:text-gray-400`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors placeholder:text-gray-400`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className={`w-full px-4 py-2.5 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors placeholder:text-gray-400`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Order ID (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="orderId"
                                        value={formData.orderId}
                                        onChange={handleChange}
                                        placeholder="QB-123456789"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help you?"
                                    rows="4"
                                    className={`w-full px-4 py-2.5 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700 focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors placeholder:text-gray-400 resize-none`}
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2874f0] hover:bg-[#1e5cb3] text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SendIcon sx={{ fontSize: 18 }} />
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar - Flipkart/Amazon Style */}
                    <div className="space-y-6">

                        {/* Track Order Card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <InventoryIcon sx={{ fontSize: 24, className: 'text-[#2874f0]' }} />
                                <h3 className="font-semibold text-gray-800">Track Your Order</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">Enter your tracking ID to get real-time updates</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="e.g. QB123456789"
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0]"
                                />
                                <button className="px-5 py-2.5 bg-[#fb641b] text-white text-sm font-medium rounded-md hover:bg-[#f85a1a] transition-colors whitespace-nowrap">
                                    Track
                                </button>
                            </div>
                        </div>

                        {/* FAQ Card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <HelpOutlineIcon sx={{ fontSize: 24, className: 'text-[#2874f0]' }} />
                                <h3 className="font-semibold text-gray-800">FAQs</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Where is my order?",
                                    "How do I return a product?",
                                    "What are delivery charges?",
                                    "Is COD available?"
                                ].map((q, i) => (
                                    <li key={i} className="text-sm text-gray-600 hover:text-[#2874f0] cursor-pointer transition-colors flex items-center gap-2">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        {q}
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-5 text-sm text-[#2874f0] hover:underline font-medium">
                                View All FAQs →
                            </button>
                        </div>

                        {/* Customer Support Card */}
                        <div className="bg-gradient-to-r from-[#2874f0] to-[#1e5cb3] rounded-lg p-6 text-white">
                            <HeadsetIcon sx={{ fontSize: 32, className: 'mb-3 opacity-90' }} />
                            <h3 className="text-lg font-semibold mb-2">24/7 Customer Support</h3>
                            <p className="text-sm text-white/90 mb-4">For urgent order-related queries</p>
                            <a
                                href="tel:1800123QUICK"
                                className="inline-block w-full bg-white text-[#2874f0] font-medium text-center py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Call 1800-123-QUICK
                            </a>
                        </div>
                    </div>
                </div>

                {/* Our Presence Section - Amazon Style */}
                <div className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Our Presence</h2>
                            <p className="text-sm text-gray-600 mt-1">Serving 20,000+ pin codes across India</p>
                        </div>
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                            <span className="text-sm text-gray-600">Express Delivery in:</span>
                            <span className="text-sm font-medium text-[#2874f0]">12 Cities</span>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-lg h-56 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200')] bg-cover bg-center opacity-30"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                        <div className="relative h-full flex items-end p-6">
                            <div className="text-white">
                                <p className="text-lg font-semibold mb-1">QuickBuy Delivery Network</p>
                                <p className="text-sm text-white/90">Same-day delivery in Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, Jaipur, Lucknow, Nagpur, Bhopal</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges - Flipkart/Amazon Style */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {[
                            '100% Genuine Products',
                            'Easy 15 Day Returns',
                            'Secure Payments',
                            'Free Delivery*',
                            '24/7 Customer Care'
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-[#2874f0] rounded-full"></span>
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Chat - Flipkart Style */}
                <div className="fixed bottom-8 right-8 z-50">
                    <button className="bg-[#2874f0] hover:bg-[#1e5cb3] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors">
                        <ChatIcon sx={{ fontSize: 20 }} />
                        <span className="font-medium">Chat with us</span>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Contact;