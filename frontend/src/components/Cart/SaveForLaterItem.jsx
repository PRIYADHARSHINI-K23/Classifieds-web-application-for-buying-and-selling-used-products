import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import { removeFromSaveForLater } from '../../actions/saveForLaterAction';
import { getDiscount } from '../../utils/functions';

const SaveForLaterItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const removeFromSaveForLaterHandler = (id) => {
        dispatch(removeFromSaveForLater(id));
        enqueueSnackbar("Asset purged from deferred registry", { variant: "info" });
    }

    const moveToCartHandler = (id, quantity) => {
        dispatch(addItemsToCart(id, quantity));
        removeFromSaveForLaterHandler(id);
        enqueueSnackbar("Asset re-instated to primary session", { variant: "success" });
    }

    return (
        <div className="p-8 hover:bg-white/5 transition-all duration-300 opacity-60 hover:opacity-100" key={product}>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">

                {/* Product Visualization */}
                <div className="w-32 h-32 flex-shrink-0 glass-card border-white/5 rounded-2xl p-4 grayscale group-hover:grayscale-0 transition-all">
                    <img draggable="false" className="h-full w-full object-contain mix-blend-lighten" src={image} alt={name} />
                </div>

                {/* Specification Details */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                    <div className="space-y-1">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                            {name}
                        </h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Deferred Source: {seller}
                        </span>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-4 text-xl font-black text-white tracking-tighter">
                        <span>₹{(price * quantity).toLocaleString()}</span>
                        <span className="text-[10px] text-slate-500 line-through font-bold">₹{(cuttedPrice * quantity).toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-400/10 px-2 py-1 rounded">
                            {getDiscount(price, cuttedPrice)}% Benefit
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
                        <button
                            onClick={() => moveToCartHandler(product, quantity)}
                            className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors"
                        >
                            Re-activate Record
                        </button>
                        <div className="w-1 h-1 rounded-full bg-white/10"></div>
                        <button
                            onClick={() => removeFromSaveForLaterHandler(product)}
                            className="text-[10px] font-black uppercase tracking-widest text-red-500/70 hover:text-red-500 transition-colors"
                        >
                            Purge Entry
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveForLaterItem;
