import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ activeTab, children }) => {

    const [onMobile, setOnMobile] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setOnMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, [])

    return (
        <>
            <main className="flex min-h-screen min-w-full relative bg-slate-50">

                {!onMobile && <Sidebar activeTab={activeTab} />}
                {toggleSidebar && (
                    <>
                        <div
                            className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[1001] md:hidden"
                            onClick={() => setToggleSidebar(false)}
                        />
                        <div className="fixed inset-y-0 left-0 z-[1002] md:hidden animate-fade-in-left">
                            <Sidebar activeTab={activeTab} setToggleSidebar={setToggleSidebar} />
                        </div>
                    </>
                )}

                <div className="flex-1 md:ml-[280px] min-h-screen relative overflow-hidden">
                    {/* Dynamic Tech Mesh Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-600/5 blur-[150px] rounded-full"></div>
                        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-teal-500/5 blur-[150px] rounded-full"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-10 space-y-10 pb-20">
                        <header className="flex items-center justify-between">
                            <button
                                onClick={() => setToggleSidebar(true)}
                                className="md:hidden bg-white border border-blue-100 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-blue-600 active:scale-95 transition-all"
                            >
                                <MenuIcon />
                            </button>

                            <div className="hidden md:flex flex-col">
                                <span className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">Admin Panel</span>
                                <h1 className="text-xl font-black text-blue-950 uppercase tracking-tighter">Dashboard</h1>
                            </div>

                            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-blue-50 shadow-sm">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[9px] font-black text-blue-950 uppercase tracking-widest">System Status: Online</span>
                            </div>
                        </header>

                        <div className="animate-fade-in-up">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;

