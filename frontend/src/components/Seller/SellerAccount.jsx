import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';

const SellerAccount = () => {
    const { seller, loading: sellerLoading } = useSelector((state) => state.seller);

    if (sellerLoading) {
        return <Loader />;
    }

    if (!seller) {
        return null;
    }

    return (
        <>
            <MetaData title="Store Profile" />

            <main className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-green-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 mt-12">
                    <div className="space-y-12">

                        {/* Store Header Card */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-green-900/5 border border-green-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:bg-green-100 transition-colors duration-700"></div>

                            <div className="relative flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[2rem] bg-green-600 p-1 group-hover:rotate-6 transition-all duration-700 shadow-2xl shadow-green-600/20">
                                        <div className="w-full h-full rounded-[1.9rem] bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                                            <span className="text-4xl font-extrabold text-green-600 uppercase tracking-tighter">
                                                {seller?.name?.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-600 rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                                        <span className="text-white text-[8px] font-bold">✓</span>
                                    </div>
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-lg bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-wider border border-green-100">Verified Seller</span>
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-black text-green-950 tracking-tight uppercase leading-none mb-2">{seller?.name}</h1>
                                    <p className="text-green-900/40 font-bold tracking-widest uppercase text-[10px] mb-6">{seller?.email}</p>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <div className="px-6 py-2 bg-green-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider shadow-lg shadow-green-600/20">
                                            Status: {seller?.status ? seller.status.toUpperCase() : 'PENDING'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Store Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                            {/* Store Information */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-green-900/5 border border-green-100 group">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-700">
                                            <span className="text-xl">🏪</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-green-950 uppercase leading-none">Store Details</h2>
                                            <p className="text-[10px] font-medium text-green-900/40 uppercase tracking-widest mt-1">Business Information</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Store Name', value: seller?.name },
                                        { label: 'Email', value: seller?.email },
                                        { label: 'Phone', value: seller?.phone || 'N/A' },
                                        { label: 'Address', value: seller?.address || 'N/A' },
                                        { label: 'Status', value: seller?.status ? seller.status.toUpperCase() : 'PENDING' },
                                        { label: 'Joined On', value: seller?.createdAt ? new Date(seller.createdAt).toLocaleDateString() : 'N/A' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 bg-green-50/50 rounded-2xl border border-green-50 hover:bg-white hover:border-green-100 transition-all duration-500">
                                            <p className="text-[10px] font-bold text-green-900/40 uppercase tracking-wide mb-1">{item.label}</p>
                                            <p className="text-sm font-semibold text-green-900">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-green-900/5 border border-green-100 group">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-700">
                                        <span className="text-xl">⚙️</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-green-950 uppercase leading-none">Quick Actions</h2>
                                        <p className="text-[10px] font-medium text-green-900/40 uppercase tracking-widest mt-1">Manage Your Store</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link to="/seller/dashboard" className="block p-4 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-100 transition-all duration-300 text-green-600 font-semibold text-sm">
                                        📊 View Dashboard
                                    </Link>
                                    <Link to="/seller/products" className="block p-4 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-100 transition-all duration-300 text-green-600 font-semibold text-sm">
                                        📦 View Products
                                    </Link>
                                    <Link to="/seller/product/new" className="block p-4 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-100 transition-all duration-300 text-green-600 font-semibold text-sm">
                                        ➕ Add Product
                                    </Link>
                                    <Link to="/seller/orders" className="block p-4 bg-green-50 hover:bg-green-100 rounded-2xl border border-green-100 transition-all duration-300 text-green-600 font-semibold text-sm">
                                        🛒 View Orders
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SellerAccount;
