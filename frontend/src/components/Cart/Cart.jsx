import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';
import { fetchCart } from '../../actions/cartAction';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [isAuthenticated, dispatch]);

    const placeOrderHandler = () => {
        navigate('/shipping');
    };


    const continueShoppingHandler = () => {
        navigate('/products');
    };

    return (
        <>
            <MetaData title="Shopping Cart | Quick Buy" />
            <main className="min-h-screen pt-32 pb-20 bg-slate-50 relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>

                    {/* Clinical Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="w-full sm:w-11/12 px-4 sm:px-12 m-auto relative z-10 mt-8">

                    {/* Header Block */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 animate-fade-in">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-blue-950 uppercase tracking-tighter mb-2 leading-none">
                                My <span className="text-blue-600">Cart</span>
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-1 bg-blue-600 rounded-full"></span>
                                <p className="text-blue-800/60 font-black uppercase tracking-widest text-[8px]">Items you have selected</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Left Column - Reserves Mapping */}
                        <div className="flex-1 w-full space-y-12">

                            {/* Primary Cart Registry */}
                            <div className="bg-white rounded-[2rem] border border-blue-100 overflow-hidden shadow-2xl shadow-blue-900/5 animate-fade-in-left">
                                <div className="bg-blue-50/50 px-8 py-6 border-b border-blue-100 flex justify-between items-center">
                                    <h2 className="text-[10px] font-black text-blue-950 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse shadow-glow-blue"></span>
                                        Cart Items ({cartItems.length})
                                    </h2>
                                    {cartItems.length > 0 && (
                                        <span className="text-[8px] font-black text-blue-600 bg-white px-4 py-1.5 rounded-xl border border-blue-100 uppercase tracking-widest shadow-sm">
                                            Verified Quality
                                        </span>
                                    )}
                                </div>

                                <div className="divide-y divide-blue-50 min-h-[400px]">
                                    {cartItems.length === 0 ? (
                                        <EmptyCart />
                                    ) : (
                                        cartItems.map((item) => (
                                            <CartItem {...item} inCart={true} key={item.product} />
                                        ))
                                    )}
                                </div>

                                {/* Registry Actions */}
                                {cartItems.length > 0 && (
                                    <div className="p-8 bg-blue-50/30 border-t border-blue-50">
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <button
                                                onClick={placeOrderHandler}
                                                className="flex-1 bg-blue-600 hover:bg-blue-800 text-white py-4 px-8 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] shadow-xl shadow-blue-600/20 transition-all active:scale-95"
                                            >
                                                Place Order
                                            </button>
                                            <button
                                                onClick={continueShoppingHandler}
                                                className="flex-1 bg-white border border-blue-100 hover:bg-blue-50 text-blue-900 py-4 px-8 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] transition-all active:scale-95 shadow-md shadow-blue-900/5"
                                            >
                                                Add More Products
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Secondary Portfolio (Saved For Later) */}
                            {saveForLaterItems.length > 0 && (
                                <div className="bg-white rounded-[3rem] border border-blue-100 overflow-hidden shadow-2xl shadow-blue-900/5 animate-fade-in-up">
                                    <div className="bg-blue-50 px-12 py-10 border-b border-blue-100">
                                        <h2 className="text-[11px] font-black text-blue-950 uppercase tracking-[0.25em]">
                                            Saved For Later ({saveForLaterItems.length} Products)
                                        </h2>
                                    </div>

                                    <div className="divide-y divide-blue-50">
                                        {saveForLaterItems.map((item) => (
                                            <SaveForLaterItem {...item} key={item.product} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Financial Sidebar */}
                        {cartItems.length > 0 && (
                            <div className="lg:w-[450px] w-full sticky top-32">
                                <PriceSidebar cartItems={cartItems} />
                            </div>
                        )}
                    </div>

                    {/* Fallback Action */}
                    {cartItems.length === 0 && (
                        <div className="text-center mt-12 animate-fade-in-up">
                            <button
                                onClick={continueShoppingHandler}
                                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
                            >
                                Re-initialize Protocol
                            </button>
                        </div>
                    )}
                </div>
            </main >
        </>
    );
};

export default Cart;
