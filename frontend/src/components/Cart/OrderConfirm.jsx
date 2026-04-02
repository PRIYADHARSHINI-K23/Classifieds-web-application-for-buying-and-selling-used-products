import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';

const OrderConfirm = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    return (
        <>
            <MetaData title="Deployment Finalization | Quick Buy" />
            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="container-responsive relative z-10 py-12 px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        <div className="flex-1 w-full animate-fade-in-left">
                            <Stepper activeStep={2}>
                                <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border border-blue-100 shadow-2xl shadow-blue-900/5 mt-8 overflow-hidden">
                                    <div className="p-10 border-b border-blue-50">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                                            <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">Inventory <span className="text-blue-600">Verification</span></h2>
                                        </div>
                                        <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest leading-relaxed">Please review the asset manifest before proceeding to transaction结算.</p>
                                    </div>

                                    <div className="divide-y divide-blue-50">
                                        {cartItems?.map((item, i) => (
                                            <CartItem {...item} inCart={false} key={i} />
                                        ))}
                                    </div>

                                    <div className="p-10 bg-blue-50/50 flex flex-col md:flex-row justify-between items-center gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                                <i className="material-icons text-xl">📧</i>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest">Protocol Receipt Dest.</span>
                                                <span className="text-sm font-black text-blue-950">{user.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { navigate('/process/payment') }}
                                            className="w-full md:w-auto px-16 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-[2rem] hover:bg-emerald-600 transition-all duration-700 shadow-2xl shadow-blue-600/30 hover:-translate-y-2 active:scale-95"
                                        >
                                            Secure Payment
                                        </button>
                                    </div>
                                </div>
                            </Stepper>
                        </div>

                        <div className="w-full lg:w-[450px]">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderConfirm;
