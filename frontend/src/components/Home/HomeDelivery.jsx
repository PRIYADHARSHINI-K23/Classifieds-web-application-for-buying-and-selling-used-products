import deliveryImg from '../../assets/images/Home/delivery.svg';
import fastDeliveryImg from '../../assets/images/Home/fast-delivery.jpg'; // Add these
import packageImg from '../../assets/images/Home/package.avif'; // Add these
import trackingImg from '../../assets/images/Home/tracking.png'; // Add these

const HomeDelivery = () => {
    const steps = [
        { 
            title: 'Order Placed', 
            desc: 'Your order is confirmed and will be processed within minutes.', 
            time: '2 min',
            icon: deliveryImg 
        },
        { 
            title: 'Order Packed', 
            desc: 'Items carefully packed with premium quality materials.', 
            time: '30 min',
            icon: packageImg 
        },
        { 
            title: 'Shipped', 
            desc: 'Dispatched via express courier. Tracking ID generated.', 
            time: '2-4 hrs',
            icon: fastDeliveryImg 
        },
        { 
            title: 'Out for Delivery', 
            desc: 'Our delivery partner is on the way to your location.', 
            time: 'Today',
            icon: trackingImg 
        },
        { 
            title: 'Delivered', 
            desc: 'Package handed over. Thank you for shopping with us!', 
            time: 'Same Day',
            icon: deliveryImg 
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-gradient-to-br from-white to-gray-50/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section - Premium E-commerce Style */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-[0.2em]">
                                Express Delivery
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                            Delivered in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                                Hours
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500 max-w-2xl">
                            From checkout to doorstep — experience India's fastest e-commerce delivery network.
                        </p>
                    </div>
                    
                    {/* Live Stats - Real E-commerce Vibe */}
                    <div className="flex items-center gap-6 bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">15K+</div>
                            <div className="text-xs text-gray-500">Orders Today</div>
                        </div>
                        <div className="w-px h-10 bg-gray-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                            </div>
                            <span className="text-xs font-medium text-gray-700">Live Tracking</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Timeline - Modern E-commerce Style */}
                <div className="relative mb-16">
                    {/* Progress Bar Background */}
                    <div className="absolute top-24 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* Desktop Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gray-200">
                                        <div className="h-full w-0 group-hover:w-full bg-blue-500 transition-all duration-700"></div>
                                    </div>
                                )}

                                {/* Step Card */}
                                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                    
                                    {/* Step Number Badge */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                                            Step {index + 1}/{steps.length}
                                        </span>
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                                            {step.time}
                                        </span>
                                    </div>

                                    {/* Icon Container */}
                                    <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center group-hover:scale-110 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                                        <img 
                                            src={step.icon} 
                                            alt={step.title} 
                                            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300" 
                                        />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {step.desc}
                                    </p>

                                    {/* Status Indicator */}
                                    {index === 2 && (
                                        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                            Tracking ID: QB{Math.floor(Math.random() * 100000)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Features Grid - E-commerce Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    {[
                        { label: 'Free Delivery', value: 'Orders above ₹499', icon: '🚚' },
                        { label: 'Express Shipping', value: '12 Cities', icon: '⚡' },
                        { label: 'Easy Returns', value: '15 Days', icon: '🔄' },
                        { label: 'COD Available', value: 'Pay at Doorstep', icon: '💵' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3 hover:border-blue-200 hover:shadow-md transition-all">
                            <span className="text-2xl">{feature.icon}</span>
                            <div>
                                <div className="text-sm font-bold text-gray-900">{feature.label}</div>
                                <div className="text-xs text-gray-500">{feature.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Live Delivery Map Simulation */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-1">Track Your Order</h4>
                                <p className="text-sm text-blue-100">Real-time GPS tracking available on app</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex-1 md:w-64">
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="Enter Tracking ID" 
                                        className="w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                        Track
                                    </button>
                                </div>
                            </div>
                            <div className="flex -space-x-2">
                                {[1,2,3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-xs font-bold">
                                        {i}
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full bg-white text-blue-600 border-2 border-white flex items-center justify-center text-xs font-bold">
                                    +12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-200">
                    {['Google Reviews 4.8★', '100% Genuine Products', 'Secure Payments', 'ISO Certified'].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            {badge}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeDelivery;