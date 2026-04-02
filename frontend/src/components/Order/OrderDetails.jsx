import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, cancelOrder } from '../../actions/orderAction';
import { CANCEL_ORDER_RESET } from '../../constants/orderConstants';
import Swal from 'sweetalert2';
import Loader from '../Layouts/Loader';
import TrackStepper from './TrackStepper';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { isCancelled, error: cancelError } = useSelector((state) => state.order);

    const BASE_URL = "http://localhost:4000/";

    // Image URL-ku proper path construct pannura function
    const getImageUrl = (image) => {
        if (!image) return "/default.png";

        const imageUrl = image?.url || image;

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

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (cancelError) {
            enqueueSnackbar(cancelError, { variant: "error" });
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
            dispatch(getOrderDetails(params.id));
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, error, params.id, enqueueSnackbar, isCancelled, cancelError]);

    const cancelOrderHandler = () => {
        Swal.fire({
            title: 'Terminate Protocol?',
            text: "Are you sure you want to cancel this order? Your amount will be refunded.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#f43f5e',
            confirmButtonText: 'CONFIRM CANCELLATION',
            background: '#ffffff',
            customClass: {
                title: 'text-blue-950 uppercase font-black tracking-tighter',
                content: 'text-slate-500 font-medium',
                confirmButton: 'rounded-xl font-bold px-8 py-3 uppercase tracking-widest text-[10px]',
                cancelButton: 'rounded-xl font-bold px-8 py-3 uppercase tracking-widest text-[10px]'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cancelOrder(params.id));
            }
        });
    };

    return (
        <>
            <MetaData title="Deployment Specifications | Quick Buy" />

            <main className="min-h-screen bg-slate-50 pt-20 pb-20 relative overflow-hidden">
                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="container-responsive relative z-10">
                    {loading ? <Loader /> : (
                        <>
                            {order && order.user && order.shippingInfo && (
                                <div className="flex flex-col gap-10">

                                    {/* Header Section */}
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 animate-fade-in-up mt-16">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                                                <i className="material-icons text-3xl">📋</i>
                                            </div>
                                            <div>
                                                <h1 className="text-3xl font-black text-blue-950 uppercase tracking-tighter">Manifest <span className="text-blue-600">Details</span></h1>
                                                <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest">Protocol ID: {params.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="px-8 py-3 bg-white border border-blue-100 rounded-2xl flex items-center gap-4">
                                                <span className={`w-2 h-2 rounded-full animate-pulse ${order.orderStatus === 'Cancelled' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                                                <span className="text-[10px] font-black text-blue-950 uppercase tracking-widest italic">{order.orderStatus}</span>
                                            </div>
                                            {order.orderStatus === 'Processing' && (
                                                <button
                                                    onClick={cancelOrderHandler}
                                                    className="px-8 py-3 bg-red-50 text-red-500 border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-500 shadow-lg shadow-red-500/10 active:scale-95"
                                                >
                                                    Cancel Protocol
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Address & Logistics Block */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                        <div className="lg:col-span-1 bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 border border-blue-100 shadow-2xl shadow-blue-900/5 animate-fade-in-left">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                                                <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest">Delivery Station</h3>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-50">
                                                    <p className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest mb-1">Personnel</p>
                                                    <p className="text-sm font-black text-blue-950 uppercase">{order.user.name}</p>
                                                </div>
                                                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-50">
                                                    <p className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest mb-1">Coordinates</p>
                                                    <p className="text-sm font-black text-blue-950 uppercase leading-relaxed">{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}`}</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="flex-1 p-4 bg-white border border-blue-100 rounded-2xl text-center">
                                                        <p className="text-[8px] font-black text-blue-900/30 uppercase tracking-widest mb-1">Comm Channel</p>
                                                        <p className="text-[10px] font-black text-blue-950">{order.shippingInfo.phoneNo}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 border border-blue-100 shadow-2xl shadow-blue-900/5 animate-fade-in-right overflow-hidden flex flex-col">
                                            <div className="flex items-center gap-4 mb-12">
                                                <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                                                <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest">Logistics Timeline</h3>
                                            </div>
                                            <div className="flex-1 flex flex-center">
                                                <TrackStepper
                                                    orderOn={order.createdAt}
                                                    shippedAt={order.shippedAt}
                                                    deliveredAt={order.deliveredAt}
                                                    activeStep={
                                                        order.orderStatus === "Delivered" ? 2 : order.orderStatus === "Shipped" ? 1 : 0
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Asset List */}
                                    <div className="space-y-6 animate-fade-in-up">
                                        <div className="flex items-center gap-4 ml-4">
                                            <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                                            <h3 className="text-sm font-black text-blue-950 uppercase tracking-widest">Asset Inventory</h3>
                                        </div>
                                        {order.orderItems && order.orderItems.map((item) => {
                                            const { _id, image, name, price, quantity } = item;
                                            return (
                                                <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 border border-blue-100 shadow-xl shadow-blue-900/5 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700 hover:shadow-2xl" key={_id}>
                                                    <div className="w-32 h-32 rounded-3xl bg-white p-4 border border-blue-50 shadow-inner group-hover:rotate-6 transition-all duration-700">
                                                        <img draggable="false" className="h-full w-full object-contain" src={getImageUrl(image)} alt={name} />
                                                    </div>
                                                    <div className="flex-1 flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-8">
                                                        <div className="max-w-md">
                                                            <p className="text-lg font-black text-blue-950 uppercase tracking-tight mb-2">{name}</p>
                                                            <div className="flex gap-4">
                                                                <span className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest">Unit Cost: ₹{price.toLocaleString()}</span>
                                                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest font-black">X {quantity}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest leading-none mb-1">Total Allocated Cost</span>
                                                            <span className="text-2xl font-black text-blue-600">₹{(quantity * price).toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
};

export default OrderDetails;
