import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';

const Product = ({ _id, id, name, images, ratings, numOfReviews, price, cuttedPrice, stock, subCategoryType }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const productId = _id || id;

    // Check if item is already in cart
    const itemInCart = cartItems.find((i) => String(i.product) === String(productId));
    const itemInWishlist = wishlistItems.some((i) => String(i._id || i.product) === String(productId));

    // Upload State
    const [openUpload, setOpenUpload] = useState(false);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const increaseQty = () => {
        if (stock <= itemInCart.quantity) return;
        dispatch(addItemsToCart(productId, itemInCart.quantity + 1, {
            _id, id, name, price, cuttedPrice, images, stock, subCategoryType,
            prescriptionUrl: itemInCart.prescriptionUrl
        }));
    }

    const decreaseQty = () => {
        if (itemInCart.quantity <= 1) {
            dispatch(removeItemsFromCart(productId));
            return;
        }
        dispatch(addItemsToCart(productId, itemInCart.quantity - 1, {
            _id, id, name, price, cuttedPrice, images, stock, subCategoryType,
            prescriptionUrl: itemInCart.prescriptionUrl
        }));
    }

    const handlePrescriptionUpload = async () => {
        if (!prescriptionFile) {
            enqueueSnackbar("Please select a file", { variant: "warning" });
            return;
        }

        const formData = new FormData();
        formData.append('prescription', prescriptionFile);

        setUploading(true);
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
            const { data } = await axios.post('/api/v1/order/prescription', formData, config);

            if (data.success) {
                // Add to cart with prescription URL
                dispatch(addItemsToCart(productId, 1, {
                    _id, id, name, price, cuttedPrice, images, stock, subCategoryType,
                    prescriptionUrl: data.url
                }));
                enqueueSnackbar("Prescription Uploaded & Item Added", { variant: "success" });
                setOpenUpload(false);
                setPrescriptionFile(null);
            }
        } catch (error) {
            enqueueSnackbar("Upload Failed", { variant: "error" });
        } finally {
            setUploading(false);
        }
    };

    const addToCartHandler = async () => {
        if (stock < 1) {
            Swal.fire({
                title: "Unavailable",
                text: "This item is currently out of stock.",
                icon: "warning",
                confirmButtonColor: "#10b981"
            });
            return;
        }

        // Logic Check: If Prescription -> Show Modal
        if (subCategoryType === "Prescription") {
            setOpenUpload(true);
            return;
        }

        dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock, subCategoryType }));
        enqueueSnackbar("Item added to cart", { variant: "success" });
    }

    const buyNowHandler = () => {
        if (stock < 1) {
            enqueueSnackbar("Item Unavailable", { variant: "error" });
            return;
        }
        if (!itemInCart) {
            dispatch(addItemsToCart(productId, 1, { _id, id, name, price, cuttedPrice, images, stock }));
        }
        navigate('/cart');
    }

    const BASE_URL = "http://localhost:4000/";

    return (
        <>
            <div className="group relative bg-white rounded-[1.2rem] p-4 transition-all duration-500 hover:shadow-xl border border-blue-50 flex flex-col items-center text-center overflow-hidden">

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (itemInWishlist) {
                            dispatch(removeFromWishlist(productId));
                            enqueueSnackbar("Removed from Wishlist", { variant: "info" });
                        } else {
                            dispatch(addToWishlist(productId, { _id, id, name, price, cuttedPrice, images, ratings, numOfReviews }));
                            enqueueSnackbar("Added to Wishlist", { variant: "success" });
                        }
                    }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-blue-50 hover:scale-110 active:scale-95 transition-all group/wish"
                >
                    <FavoriteIcon
                        sx={{
                            fontSize: 18,
                            color: itemInWishlist ? '#ef4444' : '#cbd5e1',
                            transition: 'color 0.3s'
                        }}
                    />
                </button>

                {/* Image Container */}
                <Link to={`/product/${productId}`} className="contents">
                    <div className="relative w-full aspect-square mb-6 bg-[#f8fafc] rounded-2xl p-4 flex items-center justify-center overflow-hidden group/img cursor-pointer">
                        <img
                            draggable="false"
                            className="w-full h-full object-contain transform transition-all duration-700 group-hover:scale-105"
                            src={
                                images && images.length > 0 && images[0].url
                                    ? (images[0].url.startsWith('http') || images[0].url.startsWith('https')
                                        ? images[0].url
                                        : `${BASE_URL}admin/product/${images[0].url}`)
                                    : "/default.png"
                            }
                            alt={name}
                        />
                    </div>
                </Link>

                {/* Content Info */}
                <div className="flex flex-col gap-1 w-full relative z-10 flex-1">
                    <div>
                        <h2 className="text-[#1a202c] font-black text-xs uppercase tracking-tight leading-tight px-1 line-clamp-2">
                            {name}
                        </h2>
                        {/* Ratings Badge */}
                        <div className="flex items-center justify-center gap-1.5 mt-1">
                            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500 rounded text-white font-bold flex items-center gap-0.5">
                                {ratings?.toFixed(1) || 0} <StarIcon sx={{ fontSize: "10px" }} />
                            </span>
                            <span className="text-[9px] text-gray-400 font-bold">
                                ({numOfReviews || 0})
                            </span>
                        </div>
                    </div>

                    {/* Price Display - Below Name */}
                    <div className="flex flex-col items-center gap-1 mt-2">
                        <span className="text-xl font-black text-blue-600 tracking-tighter leading-none">₹{price.toLocaleString()}</span>

                        {/* Highlighted Stock Qty */}
                        <div className="mt-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-1.5 shadow-sm">
                            <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="text-[8px] font-black text-blue-900 uppercase tracking-widest leading-none">
                                Stock: {stock}
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4">
                        {itemInCart ? (
                            <div className="flex items-center justify-between w-full h-10 bg-[#f0f4f8] rounded-full px-1 border border-blue-50 shadow-inner">
                                <button
                                    onClick={decreaseQty}
                                    className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg font-black shadow-sm"
                                >
                                    -
                                </button>
                                <span className="text-xs font-black text-[#1a202c]">
                                    {itemInCart.quantity}
                                </span>
                                <button
                                    onClick={increaseQty}
                                    className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center text-lg font-black shadow-sm"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={addToCartHandler}
                                disabled={stock < 1}
                                className="w-full h-10 rounded-lg border border-blue-600 bg-white text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <ShoppingCartIcon sx={{ fontSize: 14 }} />
                                ADD
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Prescription Upload Modal */}
            <Modal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                aria-labelledby="upload-prescription-modal"
                aria-describedby="upload-prescription-modal-description"
            >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-[2rem] p-6 shadow-2xl outline-none border border-blue-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black text-blue-950 uppercase tracking-tighter">Required Upload</h3>
                        <button onClick={() => setOpenUpload(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-relaxed">
                            Government regulations require a valid prescription for <span className="text-blue-600">{name}</span>.
                        </p>

                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group">
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => setPrescriptionFile(e.target.files[0])}
                            />
                            {prescriptionFile ? (
                                <div className="text-center px-4">
                                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest truncate max-w-[200px]">{prescriptionFile.name}</p>
                                    <p className="text-[9px] text-emerald-400 mt-1 font-bold">Ready to Upload</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <CloudUploadIcon className="text-blue-300 group-hover:text-blue-500 transition-colors mb-2" sx={{ fontSize: 32 }} />
                                    <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Tap to Upload</p>
                                </div>
                            )}
                        </label>

                        <button
                            onClick={handlePrescriptionUpload}
                            disabled={!prescriptionFile || uploading}
                            className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg transition-all ${!prescriptionFile || uploading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95'}`}
                        >
                            {uploading ? 'Verifying...' : 'Verify & Add to Cart'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Product;
