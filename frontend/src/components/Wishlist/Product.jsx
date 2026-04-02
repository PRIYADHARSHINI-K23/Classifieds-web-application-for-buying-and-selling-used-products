import { Link, useNavigate } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { removeFromWishlist } from '../../actions/wishlistAction';
import { addItemsToCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Product = (props) => {

    // Handle both local-format and API-populated product data
    const productId = props._id || props.product;
    const name = props.name || "";
    const price = props.price || 0;
    const cuttedPrice = props.cuttedPrice || 0;
    const ratings = props.ratings || 0;
    const numOfReviews = props.numOfReviews || props.reviews || 0;
    const stock = props.stock || 0;

    // Handle image: API returns images[] array, local format has image string
    const getImageSrc = () => {
        const BASE_URL = "http://localhost:4000/";

        // API populated product has images array
        if (props.images && props.images.length > 0) {
            const url = props.images[0].url;
            if (url.startsWith('http')) return url;
            return `${BASE_URL}admin/product/${url}`;
        }

        // Local format: single image string
        const image = props.image;
        if (!image) return "/default.png";
        if (image.startsWith('http')) return image;
        if (image.startsWith('uploads')) return `${BASE_URL}admin/product/${image}`;
        return `${BASE_URL}admin/product/uploads/${image}`;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const deleteHandler = () => {
        dispatch(removeFromWishlist(productId));
        enqueueSnackbar("Removed from Wishlist", { variant: "info" });
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId, 1, {
            _id: productId,
            name,
            price,
            cuttedPrice,
            images: props.images || [{ url: props.image || "" }],
            stock: stock || 10
        }));
        enqueueSnackbar("Item added to cart", { variant: "success" });
        navigate('/cart');
    }

    return (
        <div className="flex gap-4 border-b p-4 sm:pb-8 w-full group overflow-hidden">
            <div className="w-1/6 h-28 flex-shrink-0">
                <img draggable="false" className="h-full w-full object-contain" src={getImageSrc()} alt={name} />
            </div>

            {/* <!-- description --> */}
            <div className="flex flex-col gap-5 w-full p-1">
                {/* <!-- product title --> */}
                <div className="flex justify-between items-start sm:pr-5">
                    <Link to={`/product/${productId}`} className="flex flex-col gap-0.5">
                        <p className="group-hover:text-primary-blue w-56 sm:w-full truncate">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</p>
                        {/* <!-- rating badge --> */}
                        <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{ratings} <StarIcon sx={{ fontSize: "14px" }} /></span>
                            <span>({numOfReviews.toLocaleString()})</span>
                        </span>
                        {/* <!-- rating badge --> */}
                    </Link>
                    <button onClick={deleteHandler} className="text-gray-400 hover:text-red-500"><span><DeleteIcon /></span></button>
                </div>
                {/* <!-- product title --> */}

                {/* <!-- price desc --> */}
                <div className="flex items-center gap-2 text-2xl font-medium">
                    <span>₹{price.toLocaleString()}</span>
                    {cuttedPrice > 0 && (
                        <>
                            <span className="text-sm text-gray-500 line-through font-normal mt-1">₹{cuttedPrice.toLocaleString()}</span>
                            <span className="text-sm text-primary-green mt-1">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                        </>
                    )}
                </div>
                {/* <!-- price desc --> */}

                <div className="flex gap-4 mt-2">
                    <button 
                        onClick={addToCartHandler}
                        disabled={stock < 1}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-sm font-medium hover:shadow-lg transition-all ${stock < 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-blue text-white'}`}
                    >
                        <ShoppingBagIcon sx={{ fontSize: "16px" }} />
                        {stock < 1 ? 'OUT OF STOCK' : 'ORDER NOW'}
                    </button>
                </div>

            </div>
            {/* <!-- description --> */}
        </div>
    );
};

export default Product;
