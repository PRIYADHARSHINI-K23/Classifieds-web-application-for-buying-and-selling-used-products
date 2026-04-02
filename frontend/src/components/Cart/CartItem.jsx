import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';

import { Link } from 'react-router-dom';

const CartItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity, inCart }) => {

    const productId = product || product?._id || product?.id;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (quantity >= stock) {
            enqueueSnackbar("Portfolio Maximum Reached", { variant: "warning" });
            return;
        };
        dispatch(addItemsToCart(id, newQty));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) return;
        dispatch(addItemsToCart(id, newQty));
    }

    const removeCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
        enqueueSnackbar("Asset De-listed from Session", { variant: "info" });
    }

    const BASE_URL = "http://localhost:4000/";

    return (
        <div className="p-6 hover:bg-blue-50/50 transition-all duration-700 animate-fade-in group" key={product}>
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Product Visualization */}
                <div className="w-full lg:w-32 aspect-square flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="h-full w-full bg-white border border-blue-50 rounded-2xl p-4 relative z-10 shadow-lg shadow-blue-900/5 group-hover:-translate-y-1 transition-transform duration-700">
                        <img
                            draggable="false"
                            className="h-full w-full object-contain"
                            src={image?.startsWith('http') 
                                ? image 
                                : (image?.startsWith('uploads') 
                                    ? `${BASE_URL}admin/product/${image}` 
                                    : `${BASE_URL}admin/product/uploads/${image}`)}
                            alt={name}
                        />
                    </div>
                </div>

                {/* Specification Details */}
                <div className="flex-1 space-y-6 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="space-y-2">
                            {productId ? (
                                <Link to={`/product/${productId}`} className="block">
                                    <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter hover:text-blue-600 transition-colors leading-none">
                                        {name}
                                    </h3>
                                </Link>
                            ) : (
                                <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter leading-none">{name}</h3>
                            )}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-900/40 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                    {seller}
                                </span>
                                {stock < 10 && (
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-red-500 bg-red-50 px-3 py-1 rounded-lg border border-red-100 animate-pulse">
                                        CRITICAL SUPPLY: {stock} UNITS
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Financial Analysis */}
                        <div className="text-right flex flex-col items-end">
                            <span className="text-[8px] font-black text-blue-900/30 uppercase tracking-widest mb-1">Item Total</span>
                            <div className="flex items-center gap-2 mb-1">
                                {cuttedPrice > price && (
                                    <span className="text-xs font-medium text-slate-400 line-through">
                                        ₹{(cuttedPrice * quantity).toLocaleString()}
                                    </span>
                                )}
                                <div className="text-xl font-black text-blue-950 tracking-tighter leading-none">
                                    ₹{(price * quantity).toLocaleString()}
                                </div>
                            </div>
                            <div className="text-[9px] font-black text-blue-900/30 uppercase tracking-[0.25em] bg-blue-50/50 px-3 py-1 rounded-lg border border-blue-50/50">
                                UNIT: ₹{price.toLocaleString()} × {quantity}
                            </div>
                        </div>
                    </div>

                    {/* Operational Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-blue-50">

                        {/* Quantity Modulation */}
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.3em]">QUANTITY</span>
                            <div className="flex items-center p-1.5 bg-blue-50/50 rounded-xl border border-blue-100 shadow-inner">
                                <button
                                    onClick={() => decreaseQuantity(product, quantity)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-blue-900 hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95 font-black text-lg"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-black text-blue-950 text-lg tracking-tighter">{quantity}</span>
                                <button
                                    onClick={() => increaseQuantity(product, quantity, stock)}
                                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-blue-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 font-black text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Resource De-listing */}
                        {inCart && (
                            <button
                                onClick={() => removeCartItem(product)}
                                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-700 active:scale-95 shadow-lg shadow-red-900/5 font-black text-[9px] uppercase tracking-[0.3em]"
                            >
                                Remove Item
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
