import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FloatingCartBar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const location = useLocation();

    // Do not show on cart page or admin pages
    if (cartItems.length === 0 || location.pathname === '/cart' || location.pathname.startsWith('/admin')) {
        return null;
    }

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[100] animate-slideUp">
            <Link
                to="/cart"
                className="flex items-center justify-between bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all active:scale-95 group"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-xl">
                        <ShoppingCartIcon sx={{ fontSize: 20 }} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tight">
                            {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} added
                        </span>
                        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">
                            Ready for procurement
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest group-hover:mr-2 transition-all">View Cart</span>
                    <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                </div>
            </Link>
        </div>
    );
};

export default FloatingCartBar;
