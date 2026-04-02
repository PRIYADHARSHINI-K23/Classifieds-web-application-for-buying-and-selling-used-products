import Sidebar from './Sidebar';
import { Link, Navigate } from 'react-router-dom';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../Layouts/Loader';

const Account = () => {
    const { user: userState, loading: userLoading } = useSelector((state) => state.user);
    const { seller, loading: sellerLoading } = useSelector((state) => state.seller);

    const loading = userLoading || sellerLoading;

    if (loading) {
        return <Loader />;
    }

    // Redirect sellers to their own dashboard
    if (seller && seller._id) {
        return <Navigate to="/seller/account" replace />;
    }

    const user = userState;

    if (!user) {
        return null;
    }

    return (
        <>
            <MetaData title="My Profile" />

            <main className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 mt-12">
                    <div className="space-y-12">

                        {/* Profile Header Card - Premium Clinical */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-blue-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>

                            <div className="relative flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[2rem] bg-blue-600 p-1 group-hover:rotate-6 transition-all duration-700 shadow-2xl shadow-blue-600/20">
                                        <div className="w-full h-full rounded-[1.9rem] bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                                            <span className="text-4xl font-extrabold text-blue-600 uppercase tracking-tighter">
                                                {user?.name?.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-xl border-4 border-white flex items-center justify-center shadow-lg">
                                        <span className="text-white text-[8px] font-bold">QR</span>
                                    </div>
                                </div>

                                <div className="text-center md:text-left flex-1">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider border border-blue-100">Verified User</span>
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight uppercase leading-none mb-2">{user?.name}</h1>
                                    <p className="text-blue-900/40 font-bold tracking-widest uppercase text-[10px] mb-6">{user?.email}</p>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <div className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20">
                                            Role: {user?.role || 'User'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Sections Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                            {/* Identity Spec Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-blue-100 group">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700">
                                            <span className="text-xl">🧬</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-blue-950 uppercase leading-none">Personal Details</h2>
                                            <p className="text-[10px] font-medium text-blue-900/40 uppercase tracking-widest mt-1">Basic Information</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: 'Full Name', value: user?.name },
                                        { label: 'Role', value: user?.role || 'User' },
                                        { label: 'Gender', value: user?.gender || 'N/A' },
                                        { label: 'Joined On', value: user?.createdAt ? String(user.createdAt).substring(0, 10).split('-').reverse().join('-') : '24-OCT-2023' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-50 hover:bg-white hover:border-blue-100 transition-all duration-500">
                                            <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-wide mb-1">{item.label}</p>
                                            <span className="text-blue-950 font-bold text-sm uppercase">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Connectivity Spec Card */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-blue-900/5 border border-blue-100 group">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 group-hover:bg-teal-500 group-hover:text-white transition-all duration-700">
                                            <span className="text-xl">📞</span>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-blue-950 uppercase leading-none">Contact Details</h2>
                                            <p className="text-[10px] font-medium text-blue-900/40 uppercase tracking-widest mt-1">Communication Info</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-50 hover:bg-white hover:border-blue-100 transition-all duration-500">
                                        <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-wide mb-1">Email Address</p>
                                        <span className="text-blue-950 font-bold text-sm uppercase">{user?.email}</span>
                                    </div>
                                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-50 hover:bg-white hover:border-blue-100 transition-all duration-500">
                                        <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-wide mb-1">Mobile Number</p>
                                        <span className="text-blue-950 font-bold text-sm uppercase">{user?.phone || '+91 - Not Added'}</span>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <Link to="/account/update" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider text-center shadow-lg shadow-blue-600/20 hover:bg-blue-800 transition-all">
                                            Edit Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Professional Details - Conditional Render */}
                        {user?.role === 'doctor' && (
                            <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-blue-900/5 border border-blue-100">
                                <h2 className="text-3xl font-black text-blue-950 tracking-tighter uppercase leading-none mb-10 flex items-center gap-4">
                                    <span className="w-12 h-1.5 bg-blue-600 rounded-full"></span>
                                    Professional Registry
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest mb-2">Primary Unit</p>
                                        <span className="text-blue-950 font-black text-lg uppercase">{user?.clinicname || 'N/A'}</span>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">{user?.address}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest mb-2">Qualification</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-950 font-black text-lg uppercase">{user?.qualification || 'N/A'}</span>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[9px] font-bold uppercase">{user?.specialization}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest mb-2">Registration ID</p>
                                        <span className="text-blue-950 font-black text-lg uppercase">{user?.registrationNumber || 'N/A'}</span>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">{user?.medicalCouncilName}</p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 md:col-span-2 lg:col-span-3">
                                        <p className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest mb-4">Credentials & Verification</p>
                                        <div className="flex flex-wrap gap-4">
                                            {user?.registrationCertificate?.url && (
                                                <a href={user?.registrationCertificate?.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 transition-all group">
                                                    <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                                                    <div>
                                                        <span className="block text-[10px] font-black uppercase text-blue-900/40 tracking-wider">Document</span>
                                                        <span className="block text-sm font-bold text-blue-950">Medical Certificate</span>
                                                    </div>
                                                </a>
                                            )}
                                            {user?.doctorIdProof?.url && (
                                                <a href={user?.doctorIdProof?.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 transition-all group">
                                                    <span className="text-2xl group-hover:scale-110 transition-transform">🪪</span>
                                                    <div>
                                                        <span className="block text-[10px] font-black uppercase text-blue-900/40 tracking-wider">Identity</span>
                                                        <span className="block text-sm font-bold text-blue-950">Govt. ID Proof</span>
                                                    </div>
                                                </a>
                                            )}
                                            {!user?.registrationCertificate?.url && !user?.doctorIdProof?.url && (
                                                <span className="text-slate-400 text-sm font-medium italic">No digital credentials synced.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </main>
        </>
    );
};

export default Account;
