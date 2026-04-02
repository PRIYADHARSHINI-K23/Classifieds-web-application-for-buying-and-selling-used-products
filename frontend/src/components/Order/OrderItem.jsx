import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { cancelOrder, myOrders, clearErrors } from '../../actions/orderAction';
import { CANCEL_ORDER_RESET } from '../../constants/orderConstants';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';

const OrderItem = (props) => {

    const { orderId, name, image, price, quantity, createdAt, deliveredAt, orderStatus } = props;

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { isCancelled, error: cancelError } = useSelector((state) => state.order);

    useEffect(() => {
        if (cancelError) {
            enqueueSnackbar(cancelError, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isCancelled) {
            Swal.fire({
                title: 'Cancelled!',
                text: 'Your order has been cancelled. Your payment has been refunded.',
                icon: 'success',
                confirmButtonColor: '#2563eb',
            });
            dispatch({ type: CANCEL_ORDER_RESET });
            dispatch(myOrders());
        }
    }, [isCancelled, cancelError, dispatch, enqueueSnackbar]);

    const BASE_URL = "http://localhost:4000/";

    // Construct proper image URL
    const getImageUrl = () => {
        if (!image) return "/default.png";

        const imageUrl = typeof image === 'object' && image ? (image.url || "") : image;

        // If it's already a full URL (starts with http/https), use it as is
        if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
            return imageUrl;
        }

        // Handle local uploads path - Standardized with Product.jsx logic
        if (typeof imageUrl === 'string' && imageUrl.startsWith('uploads')) {
            return `${BASE_URL}admin/product/${imageUrl}`;
        }

        // Otherwise, construct the full URL with BASE_URL and admin/product/uploads prefix
        return `${BASE_URL}admin/product/uploads/${imageUrl}`;
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        Swal.fire({
            title: 'Cancel Order?',
            text: "Are you sure you want to cancel this order? Your amount will be refunded.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cancelOrder(orderId));
            }
        });
    };

    return (
        <div className="group flex flex-col md:flex-row p-8 items-center bg-white/80 backdrop-blur-3xl border border-blue-50 rounded-[2.5rem] gap-8 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:bg-blue-100 transition-colors duration-700"></div>


            {/* Status Badge - Top Right Corner */}
            <div className="absolute top-6 right-6 z-10 flex flex-col items-end">
                <div className={`px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg ${orderStatus === 'Delivered'
                    ? 'bg-emerald-500'
                    : orderStatus === 'Shipped'
                        ? 'bg-blue-500'
                        : orderStatus === 'Cancelled'
                            ? 'bg-red-500'
                            : 'bg-orange-500'
                    }`}>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">
                        {orderStatus}
                    </span>
                </div>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tight mt-1">
                    {orderStatus === "Delivered" ? "SUCCESSFULLY DELIVERED" : orderStatus === "Shipped" ? "IN TRANSIT" : orderStatus === "Cancelled" ? "ORDER TERMINATED" : "ORDER PROCESSING"}
                </p>

                {orderStatus === 'Processing' && (
                    <button
                        onClick={cancelHandler}
                        className="mt-4 px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                        Cancel
                    </button>
                )}
            </div>



            {/* Image Section */}
            <Link to={`/order_details/${orderId}`} className="w-32 h-32 rounded-3xl bg-white p-4 border border-blue-50 shadow-inner group-hover:rotate-6 transition-all duration-700 flex-shrink-0 z-10">
                <img draggable="false" className="h-full w-full object-contain" src={getImageUrl()} alt={name} />
            </Link>

            {/* Description Section */}
            <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-8 z-10">
                <Link to={`/order_details/${orderId}`} className="flex flex-col gap-2 max-w-md">
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-2 hover:text-blue-600 transition-colors">{name}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Qty: {quantity}</span>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Order ID: {orderId.substring(0, 10)}...</span>
                    </div>
                </Link>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:w-1/2">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">Price</span>
                        <span className="text-lg font-black text-gray-900">₹{price.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;
