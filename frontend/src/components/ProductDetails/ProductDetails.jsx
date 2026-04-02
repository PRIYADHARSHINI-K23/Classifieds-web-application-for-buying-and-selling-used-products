import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Rating,
    TextField
} from '@mui/material';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productId = params.id;
    const itemInCart = cartItems.find((i) => i.product === productId);
    const itemInWishlist = wishlistItems.some((i) => String(i._id || i.product) === String(productId));

    const quantity = itemInCart ? itemInCart.quantity : 1;

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        dispatch(addItemsToCart(productId, quantity + 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock
        }));
    }

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            dispatch(removeItemsFromCart(productId));
            return;
        }
        dispatch(addItemsToCart(productId, quantity - 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock
        }));
    }

    const addToCartHandler = () => {
        if (product.stock < 1) return;
        dispatch(addItemsToCart(productId, 1, {
            _id: product._id,
            name: product.name,
            price: product.price,
            cuttedPrice: product.cuttedPrice,
            images: product.images,
            stock: product.stock
        }));
        enqueueSnackbar("Item Added to Reserves", { variant: "success" });
    }

    const buyNow = () => {
        if (product.stock < 1) return;
        if (!itemInCart) {
            dispatch(addItemsToCart(productId, 1, {
                _id: product._id,
                name: product.name,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                images: product.images,
                stock: product.stock
            }));
        }
        navigate('/cart');
    }

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Removed from Wishlist", { variant: "info" });
        } else {
            dispatch(addToWishlist(productId, {
                _id: product._id,
                id: product._id,
                name: product.name,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                images: product.images,
                ratings: product.ratings,
                numOfReviews: product.numOfReviews
            }));
            enqueueSnackbar("Added to Wishlist", { variant: "success" });
        }
    }

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        dotsClass: "slick-dots premium-dots",
    };

    const BASE_URL = "http://localhost:4000/";

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, enqueueSnackbar, reviewError, success]);

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const reviewData = {
            rating: Number(rating),
            comment: comment,
            productId: productId
        };

        dispatch(newReview(reviewData));
        setOpen(false);
    };

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarProducts(product.category));
        }
    }, [dispatch, product?._id, product?.category]);

    return (
        <main className="min-h-screen pt-24 pb-12 bg-slate-50 relative overflow-hidden">
            <MetaData title={`${product.name} | Quick Buy Specs`} />

            {/* Premium Mesh Background for Polish */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-400/10 blur-[120px] rounded-full"></div>
            </div>

            {loading ? <Loader /> : (
                <section className="max-w-7xl mx-auto relative z-10 px-6 mt-12">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left: Image Showcase - More space for premium feel */}
                        <div className="lg:col-span-3 w-full sticky top-12 -mt-24">
                            <div className="bg-white rounded-[2rem] p-6 border border-blue-50 relative shadow-xl shadow-blue-900/5 overflow-hidden group">
                                {/* Subtle internal glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <Slider {...settings} className="product-details-slider relative z-10">
                                    {product.images?.map((item, i) => (
                                        <div key={i} className="aspect-square flex items-center justify-center">
                                            <img
                                                draggable="false"
                                                className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-105"
                                                src={item.url.startsWith('http') ? item.url : `${BASE_URL}admin/product/${item.url}`}
                                                alt={product.name}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>

                            {/* Consolidate Action - Premium Button */}
                            {/* Consolidate Action - Premium Button */}
                            {/* Consolidate Action - Premium Button */}
                            <div className="mt-6 flex flex-col gap-3">
                                <button
                                    onClick={buyNow}
                                    disabled={product.stock < 1}
                                    className="w-full group relative py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold uppercase text-[10px] tracking-[0.2em] overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <ShoppingBagIcon sx={{ fontSize: 16 }} />
                                    <span className="relative z-10">Buy Now</span>
                                </button>
                                
                                <button
                                    onClick={addToWishlistHandler}
                                    className={`w-full py-3 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 ${itemInWishlist ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                                >
                                    <FavoriteIcon sx={{ fontSize: 16 }} />
                                    <span>{itemInWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Right: Technical Specifications */}
                        <div className="lg:col-span-9 space-y-5">

                            {/* Main Info Card */}
                            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[8px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20">
                                        Verified Product
                                    </span>
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/50 cursor-pointer" onClick={submitReviewToggle}>
                                        <StarIcon sx={{ fontSize: 12, color: '#2563eb' }} />
                                        <span className="text-[9px] font-bold text-blue-900 tracking-tight uppercase opacity-50">({product.numOfReviews} Reviews) - Write a Review</span>
                                    </div>
                                </div>

                                {/* Prominent Ratings Display */}
                                <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100/50">
                                    <div className="flex items-center gap-1">
                                        <span className="text-2xl font-black text-amber-600">{product.ratings?.toFixed(1) || '0.0'}</span>
                                        <StarIcon sx={{ fontSize: 24, color: '#d97706' }} />
                                    </div>
                                    <div className="h-8 w-px bg-amber-200"></div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <StarIcon
                                                    key={star}
                                                    sx={{
                                                        fontSize: 16,
                                                        color: star <= Math.round(product.ratings || 0) ? '#d97706' : '#e5e7eb'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-amber-700 mt-0.5">
                                            {product.numOfReviews || 0} {product.numOfReviews === 1 ? 'Rating' : 'Ratings'} & {product.numOfReviews || 0} {product.numOfReviews === 1 ? 'Review' : 'Reviews'}
                                        </span>
                                    </div>
                                </div>

                                <h1 className="text-2xl md:text-3xl font-black text-[#1a202c] uppercase tracking-tighter leading-tight mb-3 drop-shadow-sm">
                                    {product.name}
                                </h1>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-3xl font-black text-blue-600 tracking-tightest leading-none drop-shadow-sm">₹{product.price?.toLocaleString()}</span>
                                    <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest opacity-60">Inclusive of all taxes</span>
                                </div>

                                <div className="space-y-5 pt-6 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Quantity</span>
                                        </div>
                                        {itemInCart ? (
                                            <div className="flex items-center bg-[#f8fafc] rounded-full p-1 border border-blue-50 shadow-inner">
                                                <button
                                                    onClick={decreaseQuantity}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold shadow-md hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center font-bold text-[#1a202c] text-sm px-2 antialiased">{quantity}</span>
                                                <button
                                                    onClick={increaseQuantity}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600 font-bold shadow-md hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={addToCartHandler}
                                                disabled={product.stock < 1}
                                                className="px-8 py-2.5 bg-blue-600 text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all"
                                            >
                                                ADD
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50/30 border border-blue-100/50 flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                                            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping opacity-20"></div>
                                        </div>
                                        <span className="text-[9px] font-bold text-blue-900 uppercase tracking-widest antialiased">
                                            Status: <span className="text-blue-600 underline underline-offset-4 decoration-2">In Stock</span> ({product.stock} units)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description Card */}
                            <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-lg shadow-blue-900/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-10 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mt-8 ml-6 rounded-full"></div>
                                <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3 pt-4">Product Description</h3>
                                <p className="text-[#1a202c] leading-relaxed text-sm font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                                    "{product.description}"
                                </p>
                            </div>

                            {/* Seller Information Card */}
                            {product.seller && (
                                <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-lg shadow-blue-900/5 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-10 h-1 bg-gradient-to-r from-green-500 to-blue-500 mt-8 ml-6 rounded-full"></div>
                                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-3 pt-4">Seller Information</h3>
                                    <div className="flex flex-col md:flex-row md:items-center gap-6 mt-4">
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Shop Name</p>
                                            <p className="text-lg font-black text-slate-800 uppercase tracking-tight">{product.seller.companyName}</p>
                                        </div>
                                        <div className="w-px h-10 bg-slate-200 hidden md:block"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Contact Number</p>
                                            <p className="text-lg font-black text-blue-600 tracking-tighter">+91 {product.seller.phone}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Verified Seller on QuickBuy</span>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Section */}
                            {product.reviews && product.reviews.length > 0 && (
                                <div className="bg-white/60 backdrop-blur-md rounded-[2rem] p-6 border border-white shadow-lg shadow-blue-900/5 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-10 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mt-8 ml-6 rounded-full"></div>
                                    <h3 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-4 pt-4">Customer Reviews ({product.reviews.length})</h3>
                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                        {product.reviews.map((rev, index) => (
                                            <div key={index} className="p-4 rounded-xl bg-white/80 border border-slate-100 hover:shadow-md transition-shadow">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                                            {rev.name?.charAt(0).toUpperCase() || 'U'}
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-800">{rev.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <StarIcon
                                                                key={star}
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: star <= rev.rating ? '#d97706' : '#e5e7eb'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {rev.comment && (
                                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{rev.comment}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Similar Products */}
                    <div className="mt-20">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-black text-[#1a202c] uppercase tracking-tighter">Similar <span className="text-blue-600">Products</span></h2>
                        </div>
                        <ProductSlider title="" tagline="" productId={product._id} />
                    </div>

                    {/* Review Dialog */}
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle sx={{ fontWeight: 'black', textTransform: 'uppercase', letterSpacing: '-0.025em', color: '#172554' }}>Submit Review</DialogTitle>
                        <DialogContent className="flex flex-col gap-4">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <TextField
                                label="Comment"
                                multiline
                                rows={4}
                                fullWidth
                                variant="outlined"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary" sx={{ fontWeight: 'bold' }}>Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color="primary" variant="contained" sx={{ fontWeight: 'bold', borderRadius: '12px' }}>Submit</Button>
                        </DialogActions>
                    </Dialog>

                </section>
            )}
        </main>
    );
};

export default ProductDetails;
