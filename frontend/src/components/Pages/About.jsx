import MetaData from '../Layouts/MetaData';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InventoryIcon from '@mui/icons-material/Inventory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StarIcon from '@mui/icons-material/Star';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TimelineIcon from '@mui/icons-material/Timeline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export const About = () => {
    const values = [
        {
            icon: <VerifiedIcon sx={{ fontSize: 36 }} />,
            title: "100% Genuine Products",
            description: "Every product is brand authorized with manufacturer warranty and bill",
            color: "blue"
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 36 }} />,
            title: "Express Delivery",
            description: "2-4 hour delivery in 12 cities. Free delivery above ₹499",
            color: "orange"
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 36 }} />,
            title: "Secure Payments",
            description: "100% encrypted transactions. UPI, Cards, EMI & COD available",
            color: "blue"
        },
        {
            icon: <InventoryIcon sx={{ fontSize: 36 }} />,
            title: "Easy Returns",
            description: "15-day hassle-free returns. Free doorstep pickup",
            color: "orange"
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 36 }} />,
            title: "24/7 Customer Care",
            description: "We're here 24x7. Reply within 60 seconds, every single time",
            color: "blue"
        },
        {
            icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />,
            title: "Best Price Promise",
            description: "Found it cheaper? We'll match the price within 7 days",
            color: "orange"
        }
    ];

    const milestones = [
        { year: "2020", event: "QuickBuy Founded", desc: "Started with a mission to deliver in hours" },
        { year: "2021", event: "1 Million Orders", desc: "Crossed 10 lakh happy customers" },
        { year: "2022", event: "Express Network", desc: "Launched same-day delivery in 12 cities" },
        { year: "2023", event: "QuickBuy Plus", desc: "Premium loyalty program launched" },
        { year: "2024", event: "5M+ Customers", desc: "Serving 20,000+ pin codes across India" }
    ];

    const leadershipTeam = [
        { name: "Pandikani", role: "Co-Founder & CEO", exp: "E-commerce Strategy", years: "10 yrs", color: "orange", initial: "P" },
        { name: "Janani", role: "Co-Founder & CPO", exp: "Product Leadership", years: "9 yrs", color: "blue", initial: "J" },
        { name: "Muthukumar", role: "Chief Technology Officer", exp: "Tech Architect", years: "12 yrs", color: "orange", initial: "M" },
        { name: "Muthu Lakshmi", role: "Chief Operations Officer", exp: "Operations Excellence", years: "11 yrs", color: "blue", initial: "ML" },
        { name: "Saravana", role: "Head of Supply Chain", exp: "Logistics & Supply", years: "13 yrs", color: "orange", initial: "S" },
        { name: "Kumarann", role: "Head of Marketing", exp: "Brand Growth", years: "10 yrs", color: "blue", initial: "K" }
    ];

    const partners = [
        { name: "Samsung", category: "Electronics", logo: "📱" },
        { name: "Nike", category: "Fashion", logo: "👟" },
        { name: "Apple", category: "Electronics", logo: "🍎" },
        { name: "Puma", category: "Fashion", logo: "🐆" },
        { name: "Sony", category: "Electronics", logo: "🎮" },
        { name: "Adidas", category: "Fashion", logo: "👕" }
    ];

    const awards = [
        { award: "Best E-commerce Startup 2022", org: "Indian Retail Forum", year: "2022", color: "orange" },
        { award: "Fastest Delivery Network 2023", org: "Logistics Today", year: "2023", color: "blue" },
        { award: "Customer Excellence Award", org: "Consumer Choice Awards", year: "2024", color: "orange" },
        { award: "Innovation in Logistics 2024", org: "Tech India Summit", year: "2024", color: "blue" }
    ];

    const testimonials = [
        { name: "Amit Singh", city: "Mumbai", rating: 5, comment: "Got my order in just 2 hours! Unbelievable service.", avatar: "A" },
        { name: "Sneha Reddy", city: "Bengaluru", rating: 5, comment: "100% genuine products with super fast delivery. Highly recommended!", avatar: "S" },
        { name: "Rohan Gupta", city: "Delhi", rating: 5, comment: "Best e-commerce experience ever. Customer support is amazing.", avatar: "R" }
    ];

    return (
        <main className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-white to-orange-50/30">
            <MetaData title="About QuickBuy | India's Fastest E-commerce Delivery" />

            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Hero Section - Orange & Blue Theme */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

                    <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-blue-50 px-4 py-2 rounded-full mb-6 border border-orange-200/50">
                        <FlashOnIcon sx={{ fontSize: 18, className: 'text-orange-500' }} />
                        <span className="text-xs font-semibold text-orange-600">INDIA'S FASTEST DELIVERY</span>
                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                        <span className="text-xs font-semibold text-blue-600">2-4 HOURS</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        About <span className="text-[#2874f0]">Quick</span><span className="text-[#fb641b]">Buy</span>
                    </h1>

                    <div className="flex items-center justify-center gap-3 mb-5">
                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded">4.8★</span>
                        <span className="text-sm text-gray-600">Rated by 2M+ customers</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-sm text-gray-600">ISO 27001 Certified</span>
                    </div>

                    <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
                        We started with one simple question: why should online orders take 5-7 days when you need them today?
                        Today, we deliver to over <span className="text-orange-600 font-semibold">20,000+ pin codes</span> with an average delivery time of under
                        <span className="text-blue-600 font-semibold"> 4 hours in metro cities</span>.
                    </p>
                </div>

                {/* Stats Bar - Orange & Blue Accents */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="relative group">
                            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">5M<span className="text-orange-500">+</span></p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Happy Customers</p>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 group-hover:w-10 h-0.5 bg-orange-400 transition-all duration-300"></div>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">20K<span className="text-blue-500">+</span></p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Pin Codes</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">4<span className="text-orange-500">Hrs</span></p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Avg. Delivery</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">12</p>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Express Cities</p>
                        </div>
                    </div>
                </div>

                {/* Our Story & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white rounded-xl border-l-4 border-orange-500 border-t border-r border-b border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-600 text-xl">📖</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Our Story</h2>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            QuickBuy was founded in 2020 by <span className="text-orange-600 font-medium">Rahul Sharma</span> and <span className="text-blue-600 font-medium">Priya Patel</span>, both e-commerce veterans from Amazon and Flipkart.
                            Their frustration with slow delivery times led to the idea of building India's first express e-commerce platform.
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            What started as a small warehouse in Bengaluru now serves <span className="font-semibold text-gray-800">5 million+ customers</span> across
                            <span className="font-semibold text-gray-800"> 20,000+ pin codes</span>. We've partnered with 500+ brands to ensure every product is 100% genuine.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                                        {i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">50,000+ orders delivered daily</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border-l-4 border-orange-500 border-t border-r border-b border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                <span className="text-orange-600 text-xl">🚀</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Our Achievements</h2>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            QuickBuy was born in 2020 from a simple yet powerful idea by <span className="text-orange-600 font-medium">Rahul Sharma</span> and <span className="text-blue-600 font-medium">Priya Patel</span> — two friends who were tired of waiting days for their online orders.
                            They asked themselves: "Why can't shopping online be as fast as walking to a local store?"
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Today, that question has transformed into India's fastest e-commerce network. From a single warehouse in Bengaluru to <span className="font-semibold text-gray-800">25+ fulfillment centers</span> across the country,
                            we've made instant shopping a reality for <span className="font-semibold text-gray-800">5 million+ customers</span>.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {['R', 'P', 'Q'].map((letter, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white flex items-center justify-center text-xs font-medium border-2 border-white">
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">Trusted by 5M+ happy shoppers</span>
                        </div>
                    </div>

                    {/* <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-20 -mb-20"></div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <RocketLaunchIcon sx={{ fontSize: 24, className: 'text-white' }} />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Our Mission</h2>
                            </div>
                            <p className="text-white/90 text-sm leading-relaxed mb-6">
                                "To make online shopping <span className="font-bold">instant, reliable, and completely hassle-free</span>. 
                                We believe waiting for deliveries should be a thing of the past."
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-white text-sm font-bold mb-1">10 min</p>
                                    <p className="text-white/70 text-[10px] uppercase tracking-wider">Order Processing</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                                    <p className="text-white text-sm font-bold mb-1">2-4 hrs</p>
                                    <p className="text-white/70 text-[10px] uppercase tracking-wider">Metro Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Journey Timeline */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <TimelineIcon sx={{ fontSize: 16, className: 'text-orange-600' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Our Journey</h2>
                    </div>

                    <div className="relative">
                        {/* Timeline Line - Desktop */}
                        <div className="absolute top-5 left-0 w-full h-0.5 bg-gradient-to-r from-orange-200 via-blue-200 to-orange-200 hidden md:block"></div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[
                                { year: "2023", event: "QuickBuy Plus Launch", desc: "Premium loyalty program launched with exclusive benefits", icon: "⭐" },
                                { year: "2024", event: "5M+ Customers", desc: "Serving 20,000+ pin codes across India", icon: "🎯" },
                                { year: "2025", event: "AI-Powered Logistics", desc: "Launched AI-driven delivery optimization system", icon: "🤖" },
                                { year: "2026", event: "Global Expansion", desc: "Expanding to international markets", icon: "🌏" },
                                { year: "2027", event: "QuickBuy Vision", desc: "Aiming for 1-hour delivery across India", icon: "🚀" }
                            ].map((item, index) => (
                                <div key={index} className="relative group">
                                    <div className="flex md:block items-center gap-4">
                                        {/* Year Circle with Icon */}
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 md:mb-4 relative z-10 shadow-lg transition-transform group-hover:scale-110
                            ${index % 2 === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-blue-600 to-blue-700'}`}>
                                            <span className="text-lg">{item.icon}</span>
                                        </div>
                                        <div>
                                            {/* Year Badge */}
                                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2
                                ${index % 2 === 0 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {item.year}
                                            </div>
                                            <h3 className="text-base font-semibold text-gray-800 mb-1">{item.event}</h3>
                                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>

                                    {/* Connector Line for Mobile */}
                                    {index < 4 && (
                                        <div className="absolute left-7 top-14 w-0.5 h-8 bg-gradient-to-b from-orange-300 to-blue-300 md:hidden"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Journey Stats */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-3">
                                <p className="text-xl font-bold text-orange-600">2023</p>
                                <p className="text-xs text-gray-600">QuickBuy Plus Launch</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-3">
                                <p className="text-xl font-bold text-blue-600">2024</p>
                                <p className="text-xs text-gray-600">5M+ Customers</p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-3">
                                <p className="text-xl font-bold text-orange-600">2025</p>
                                <p className="text-xs text-gray-600">AI-Powered Logistics</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-3">
                                <p className="text-xl font-bold text-blue-600">2026</p>
                                <p className="text-xs text-gray-600">Global Expansion</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-16">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-blue-100 px-4 py-2 rounded-full mb-4">
                            <StarIcon sx={{ fontSize: 16, className: 'text-orange-500' }} />
                            <span className="text-xs font-semibold text-gray-700">WHY 5M+ CUSTOMERS TRUST US</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            We Don't Just Sell. We <span className="text-orange-500">Deliver</span> <span className="text-blue-600">Trust.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl border-l-4 p-6 hover:shadow-lg transition-all hover:-translate-y-1
                                    ${value.color === 'orange' ? 'border-l-orange-500 hover:shadow-orange-200/30' : 'border-l-blue-500 hover:shadow-blue-200/30'}`}
                            >
                                <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center
                                    ${value.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-base font-semibold text-gray-800 mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leadership Team - With Full Names & Initials */}
                {/* <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <PeopleIcon sx={{ fontSize: 16, className: 'text-blue-600' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Leadership Team</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        Meet our core leadership team: Pandikani, Janani, Muthukumar, Muthu Lakshmi, Saravana and Kumarann. They drive QuickBuy vision with hands-on execution across search, products, logistics, marketing and customer success.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Pandikani", role: "Chief Technology Officer", exp: "Ex-Delhivery", years: "15 yrs", color: "orange", initial: "P" },
                            { name: "Janani", role: "Co-Founder & CEO", exp: "Ex-Amazon", years: "12 yrs", color: "orange", initial: "J" },
                            { name: "Muthukumar", role: "Chief Operations Officer", exp: "Ex-Myntra", years: "8 yrs", color: "blue", initial: "M" },
                            { name: "Muthu Lakshmi", role: "Co-Founder & CPO", exp: "Ex-Flipkart", years: "10 yrs", color: "blue", initial: "M" },
                            { name: "Saravana", role: "Head of Marketing", exp: "Ex-Nykaa", years: "9 yrs", color: "orange", initial: "S" },
                            { name: "Kumarann", role: "Head of Customer Success", exp: "Ex-Zomato", years: "7 yrs", color: "blue", initial: "K" }
                        ].map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold shadow-md transition-transform group-hover:scale-110
                    ${member.color === 'orange' ? 'from-orange-500 to-orange-600' : 'from-blue-600 to-blue-700'}`}>
                                    {member.initial}
                                </div>
                                <h4 className="font-semibold text-gray-800 text-sm">{member.name}</h4>
                                <p className={`text-xs font-medium mt-1 ${member.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`}>
                                    {member.role}
                                </p>
                                <p className="text-[10px] text-gray-500 mt-1">{member.exp} • {member.years}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
                        
                
                {/* <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <PeopleIcon sx={{ fontSize: 16 }} className="text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Leadership Team</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        Meet our core leadership team: Pandikani, Janani, Muthukumar, Muthu Lakshmi, Saravana and Kumarann. They drive QuickBuy vision with hands-on execution across search, products, logistics, marketing and customer success.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {[
                            { name: "Pandikani", role: "CTO", exp: "Ex-Delhivery", years: "15 yrs", color: "orange", initial: "P" },
                            { name: "Janani", role: "CEO", exp: "Ex-Amazon", years: "12 yrs", color: "orange", initial: "J" },
                            { name: "Muthukumar", role: "COO", exp: "Ex-Myntra", years: "8 yrs", color: "blue", initial: "M" },
                            { name: "Muthu Lakshmi", role: "CPO", exp: "Ex-Flipkart", years: "10 yrs", color: "blue", initial: "M" },
                            { name: "Saravana", role: "Head of Marketing", exp: "Ex-Nykaa", years: "9 yrs", color: "orange", initial: "S" },
                            { name: "Kumarann", role: "Customer Success", exp: "Ex-Zomato", years: "7 yrs", color: "blue", initial: "K" }
                        ].map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className={`w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-2xl font-bold shadow-md transition-transform group-hover:scale-110
                    ${member.color === 'orange' ? 'from-orange-500 to-orange-600' : 'from-blue-600 to-blue-700'}`}>
                                    {member.initial}
                                </div>
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{member.name}</h4>
                                <p className={`text-xs font-medium mb-1 ${member.color === 'orange' ? 'text-orange-600' : 'text-blue-600'}`}>
                                    {member.role}
                                </p>
                                <p className="text-[11px] text-gray-500">{member.exp} • {member.years}</p>
                            </div>
                        ))}
                    </div>
                </div> */}
                {/* Brand Partners Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <StorefrontIcon sx={{ fontSize: 16, className: 'text-orange-600' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Our Brand Partners</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {partners.map((partner, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-100">
                                <div className="text-3xl mb-2">{partner.logo}</div>
                                <p className="text-sm font-semibold text-gray-800">{partner.name}</p>
                                <p className="text-xs text-gray-500">{partner.category}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-6">
                        +500 more trusted brands across categories
                    </p>
                </div>

                {/* Customer Testimonials */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <StarIcon sx={{ fontSize: 16, className: 'text-orange-600' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">What Our Customers Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl p-6 border border-orange-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white flex items-center justify-center font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                                        <p className="text-xs text-gray-500">{testimonial.city}</p>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <StarIcon key={j} sx={{ fontSize: 14, className: 'text-orange-500' }} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 italic">"{testimonial.comment}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Awards & Recognition */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-md p-8 mb-16">
                    <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-orange-100 to-blue-100 flex items-center justify-center">
                            <WorkspacePremiumIcon sx={{ fontSize: 16, className: 'text-orange-600' }} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Awards & Recognition</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {awards.map((item, i) => (
                            <div key={i} className={`flex items-start gap-3 p-5 rounded-xl border-l-4
                                ${item.color === 'orange' ? 'border-l-orange-500 bg-orange-50/30' : 'border-l-blue-500 bg-blue-50/30'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                                    ${item.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <EmojiEventsIcon sx={{ fontSize: 20 }} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">{item.award}</p>
                                    <p className="text-xs text-gray-500">{item.org} • {item.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                {/* <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 rounded-xl p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mb-32 -mr-32"></div>
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-32 -ml-32"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Shop with India's Fastest Delivery
                        </h2>
                        <p className="text-white/90 text-base mb-6 max-w-2xl mx-auto">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-2">⚡ 2-4 hour delivery</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm mr-2">🚚 Free above ₹499</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">🔄 15-day returns</span>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-3.5 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl">
                                Shop Now
                            </button>
                            <button className="px-8 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                                Track Order
                            </button>
                        </div>
                    </div>
                </div> */}

                {/* Trust Badges Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                        {[
                            '100% Genuine Products',
                            'Manufacturer Warranty',
                            'Free Delivery ₹499+',
                            '15-Day Returns',
                            'Secure Payments',
                            '24/7 Customer Care'
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-orange-500' : 'bg-blue-600'}`}></span>
                                {badge}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-6">
                        © 2026 QuickBuy. All Rights Reserved. India's Fastest E-commerce Delivery Network.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default About;


