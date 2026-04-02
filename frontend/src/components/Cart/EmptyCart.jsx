import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-32 px-10 animate-fade-in text-center">
            <div className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center mb-10 border border-white/5 relative group">
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <ShoppingCartIcon sx={{ fontSize: 80, color: 'rgba(255,255,255,0.1)' }} className="group-hover:text-blue-500/50 transition-colors duration-500" />
            </div>
            <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tighter mb-4">Your Cart is Empty</h2>
            <p className="text-slate-500 max-w-sm font-bold italic tracking-wide uppercase text-[10px] leading-relaxed mb-10">You haven't added any products to your cart yet.</p>
            <Link
                to="/products"
                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
            >
                Start Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;
