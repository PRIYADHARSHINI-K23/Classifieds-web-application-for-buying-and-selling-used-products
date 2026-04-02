import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
// import {
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
//     useStripe,
//     useElements,
// } from '@stripe/react-stripe-js';
import { clearErrors, newOrder } from '../../actions/orderAction';
import { emptyCart } from '../../actions/cartAction';
import { useSnackbar } from 'notistack';
import { post } from '../../utils/paytmForm';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RazorpayModal from './RazorpayModal';

const Payment = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [payDisable, setPayDisable] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [razorpayKey, setRazorpayKey] = useState(null);
    const [showRazorpay, setShowRazorpay] = useState(false);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsPrice = totalPrice;
    const taxPrice = 0; // Default to 0 as in PriceSidebar
    const shippingPrice = 0; // Default to 0 as in PriceSidebar

    const paymentData = {
        amount: Math.round(totalPrice),
        email: user.email,
        phoneNo: shippingInfo.phoneNo,
    };

    const order = {
        shippingInfo,
        orderItems: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: typeof item.image === 'object' && item.image ? (item.image.url || '') : (item.image || ''),
            product: item.product,
            prescriptionUrl: item.prescriptionUrl
        })),
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }

    const onPaymentSuccess = async (razorpayResponse) => {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            const { data } = await axios.post('/api/v1/razorpay/verify', razorpayResponse, config);

            if (data.success) {
                order.paymentInfo = {
                    id: razorpayResponse.razorpay_payment_id,
                    status: "PAID"
                };

                dispatch(newOrder(order));
                dispatch(emptyCart());
                enqueueSnackbar("Order Placed Successfully via Razorpay", { variant: "success" });
                navigate("/order/success");
            }
        } catch (error) {
            enqueueSnackbar("Payment Verification Failed", { variant: "error" });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setPayDisable(true);

        if (paymentMethod === 'cod') {
            order.paymentInfo = {
                id: "COD-" + Math.floor(Math.random() * 1000000000),
                status: "COD_WAITING"
            };

            dispatch(newOrder(order));
            dispatch(emptyCart());
            enqueueSnackbar("Order Placed Successfully via COD", { variant: "success" });
            navigate("/orders/success");
            return;
        }

        if (paymentMethod === 'razorpay') {
            setPayDisable(false);
            setShowRazorpay(true);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                '/api/v1/payment/process',
                paymentData,
                config,
            );

            let info = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: data.paytmParams
            }

            post(info)

        } catch (error) {
            setPayDisable(false);
            enqueueSnackbar(error.response?.data?.message || "Payment Gateway Sync Failed", { variant: "error" });
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            enqueueSnackbar(error, { variant: "error" });
        }
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        // Fetch Razorpay key from backend
        const fetchRazorpayKey = async () => {
            try {
                const { data } = await axios.get('/api/v1/razorpay/key');
                if (data.success) {
                    setRazorpayKey(data.razorpayKey);
                }
            } catch (error) {
                console.error('Failed to fetch Razorpay key:', error);
                enqueueSnackbar('Failed to load payment gateway', { variant: 'error' });
            }
        };

        fetchRazorpayKey();
    }, [enqueueSnackbar]);


    const handleRazorpaySuccess = (razorpayResponse) => {
        setShowRazorpay(false);
        order.paymentInfo = {
            id: razorpayResponse.razorpay_payment_id,
            status: "PAID"
        };
        dispatch(newOrder(order));
        dispatch(emptyCart());
        enqueueSnackbar("Order Placed Successfully via Razorpay", { variant: "success" });
        navigate("/orders/success");
    };

    return (
        <>
            <MetaData title="Secure Transaction | Quick Buy" />
            {showRazorpay && (
                <RazorpayModal
                    amount={totalPrice}
                    userEmail={user?.email}
                    userName={user?.name}
                    onSuccess={handleRazorpaySuccess}
                    onClose={() => { setShowRazorpay(false); setPayDisable(false); }}
                />
            )}
            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">
                
                {/* Loading Razorpay script should ideally be in index.html, but let's ensure it's handled */}

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="container-responsive relative z-10 py-12 px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        <div className="flex-1 w-full animate-fade-in-left">
                            <Stepper activeStep={3}>
                                <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-blue-100 shadow-2xl shadow-blue-900/5 mt-8">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">Gateway <span className="text-blue-600">Authorization</span></h2>
                                    </div>

                                    <form onSubmit={submitHandler} autoComplete="off" className="space-y-10">
                                        <div className="p-8 rounded-[2.5rem] bg-blue-50/50 border border-blue-100">
                                            <FormControl component="fieldset" fullWidth>
                                                <RadioGroup
                                                    aria-labelledby="payment-radio-group"
                                                    value={paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    name="payment-radio-button"
                                                >
                                                    <div className="space-y-6">
                                                        {/* Cash On Delivery Option */}
                                                        <div className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 shadow-sm ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/30' : 'border-blue-100 bg-white group hover:border-blue-600'}`}>
                                                            <FormControlLabel
                                                                value="cod"
                                                                control={<Radio sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#0f52ba' } }} />}
                                                                label={
                                                                    <div className="flex items-center gap-6 ml-4">
                                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center p-2 border ${paymentMethod === 'cod' ? 'bg-blue-600 border-blue-600' : 'bg-blue-50 border-blue-50'}`}>
                                                                            <LocalShippingIcon sx={{ fontSize: 28, color: paymentMethod === 'cod' ? '#fff' : '#0f52ba' }} />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-black text-blue-950 uppercase tracking-tight">Cash on Delivery</span>
                                                                            <span className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest">Settle fulfillment at doorstep</span>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                sx={{ margin: 0, width: '100%' }}
                                                            />
                                                        </div>

                                                        {/* Online Payment Option */}
                                                        <div className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 shadow-sm ${paymentMethod === 'paytm' ? 'border-blue-600 bg-blue-50/30' : 'border-blue-100 bg-white group hover:border-blue-600'}`}>
                                                            <FormControlLabel
                                                                value="paytm"
                                                                control={<Radio sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#0f52ba' } }} />}
                                                                label={
                                                                    <div className="flex items-center gap-6 ml-4">
                                                                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center p-2 border border-blue-50">
                                                                            <AccountBalanceWalletIcon sx={{ fontSize: 28, color: '#0f52ba' }} />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-black text-blue-950 uppercase tracking-tight">Paytm Wallet / Net Banking</span>
                                                                            <span className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest">Encrypted Direct Settlement</span>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                sx={{ margin: 0, width: '100%' }}
                                                            />
                                                            <div className="hidden md:flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                                                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Instant Sync</span>
                                                            </div>
                                                        </div>

                                                        {/* Razorpay Dummy Option */}
                                                        <div className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 shadow-sm ${paymentMethod === 'razorpay' ? 'border-indigo-600 bg-indigo-50/30' : 'border-blue-100 bg-white group hover:border-indigo-600'}`}>
                                                            <FormControlLabel
                                                                value="razorpay"
                                                                control={<Radio sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#4f46e5' } }} />}
                                                                label={
                                                                    <div className="flex items-center gap-6 ml-4">
                                                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center p-2 border ${paymentMethod === 'razorpay' ? 'bg-indigo-600 border-indigo-600' : 'bg-indigo-50 border-indigo-50'}`}>
                                                                            <AccountBalanceWalletIcon sx={{ fontSize: 28, color: paymentMethod === 'razorpay' ? '#fff' : '#4f46e5' }} />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-black text-indigo-950 uppercase tracking-tight">Razorpay Online</span>
                                                                            <span className="text-[9px] font-black text-indigo-900/40 uppercase tracking-widest">UPI / Cards / Net Banking</span>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                sx={{ margin: 0, width: '100%' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-[10px] font-black italic shadow-lg shadow-emerald-500/20">i</div>
                                                <p className="text-[10px] font-black text-emerald-900/60 uppercase tracking-tighter leading-none">Transaction secured via 256-bit Institutional SSL protocols.</p>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={payDisable}
                                                className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 shadow-2xl ${payDisable ? 'bg-slate-100 text-slate-300 shadow-none cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-emerald-600 shadow-blue-600/30 hover:-translate-y-2 active:scale-95'}`}
                                            >
                                                {payDisable ? 'Authorized Processing...' : `Commit Payment: ₹${totalPrice.toLocaleString()}`}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Stepper>
                        </div>

                        <div className="w-full lg:w-[450px]">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Payment;