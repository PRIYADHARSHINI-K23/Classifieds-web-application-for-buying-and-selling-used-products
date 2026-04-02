import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import successfull from '../../assets/images/Transaction/success.png';
import failed from '../../assets/images/Transaction/failed.png';

const OrderSuccess = ({ success }) => {

    const navigate = useNavigate();
    const [time, setTime] = useState(3);

    useEffect(() => {
        if (time === 0) {
            if (success) {
                navigate("/orders")
            } else {
                navigate("/cart")
            }
            return;
        };
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line
    }, [time]);

    return (
        <>
            <MetaData title={`Protocol ${success ? "Finalized" : "Aborted"} | Quick Buy`} />

            <main className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden flex items-center justify-center px-4">
                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
                    <div className="bg-white/80 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-16 border border-blue-100 shadow-[0_40px_100px_rgba(15,82,186,0.1)] flex flex-col items-center text-center">

                        <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl ${success ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
                            <i className="material-icons text-white text-5xl">{success ? '✅' : '❌'}</i>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-blue-950 uppercase tracking-tighter leading-none mb-6">
                            Transaction <span className={success ? 'text-emerald-500' : 'text-red-500'}>{success ? 'Authorized' : 'Aborted'}</span>
                        </h1>

                        <div className="flex items-center gap-2 mb-10">
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${success ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">
                                {success ? 'System Registry Updated' : 'Signal Interference Detected'}
                            </p>
                        </div>

                        <p className="text-xl font-bold italic text-blue-950/60 mb-12">
                            Redirecting to institutional {success ? "archive" : "requisition"} in <span className="text-blue-600">{time}</span> seconds...
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 w-full">
                            <Link
                                to={success ? "/orders" : "/cart"}
                                className={`flex-1 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 shadow-2xl active:scale-95 ${success ? 'bg-blue-600 text-white hover:bg-blue-800 shadow-blue-600/30' : 'bg-red-600 text-white hover:bg-red-800 shadow-red-600/30'}`}
                            >
                                Manual Override: {success ? "Archive" : "Requisition"}
                            </Link>
                        </div>

                        <div className="mt-16 pt-8 border-t border-blue-50 w-full flex justify-center items-center gap-8 opacity-40">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-blue-900">End-to-End SSL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-blue-900">Registry Syncing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderSuccess;
