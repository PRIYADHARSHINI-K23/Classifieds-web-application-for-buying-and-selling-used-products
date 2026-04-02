
const PriceSidebar = ({ cartItems }) => {
    return (
        <div className="sticky top-32 animate-fade-in-right">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/10 shadow-2xl">
                <div className="bg-blue-600 px-8 py-6">
                    <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                        Price Details
                    </h2>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center group">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Price ({cartItems.length} items)</span>
                        <span className="font-black text-blue-950 text-xs">₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice || item.price || 0) * item.quantity), 0).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center group">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Discount</span>
                        <span className="font-black text-emerald-600 text-xs">- ₹{cartItems.reduce((sum, item) => sum + (((item.cuttedPrice || item.price || 0) * item.quantity) - ((item.price || 0) * item.quantity)), 0).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center group">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Delivery</span>
                        <span className="font-black text-blue-600 text-[8px] uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            FREE
                        </span>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                        <div className="flex justify-between items-center bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
                            <span className="text-[10px] font-black text-blue-950 uppercase tracking-[0.2em]">Total Price</span>
                            <span className="text-lg font-black text-blue-600 tracking-tighter">₹{cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
                        <p className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-relaxed">
                            Safe & Secure Payment
                        </p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 opacity-30">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">End-to-End Encryption Active</span>
                        </div>
                        <div className="flex items-center gap-3 opacity-30">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Medical Compliance Verified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceSidebar;
