import { Link } from 'react-router-dom';

const Product = ({ image, name, offer, tag }) => {
    const BASE_URL = "http://localhost:4000/";
    return (
        <Link to="/products" className="glass-card rounded-[2.5rem] flex flex-col items-center gap-4 p-8 cursor-pointer border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]">
            <div className="w-28 h-28 rounded-2xl bg-white/5 flex items-center justify-center p-5 transform group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                <img draggable="false" className="w-full h-full object-contain mix-blend-lighten relative z-10" src={
                    image
                        ? (image.startsWith('http') || image.startsWith('https') ? image : `${BASE_URL}${image}`)
                        : "/default.png"
                } alt={name} />
            </div>

            <div className="text-center space-y-2">
                <h2 className="font-black text-white uppercase tracking-tighter text-[10px] group-hover:text-blue-400 transition-colors">{name}</h2>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">{offer}</span>
                    <span className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">{tag}</span>
                </div>
            </div>
        </Link>
    );
};

export default Product;
