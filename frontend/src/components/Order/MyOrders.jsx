import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';
import { useSnackbar } from 'notistack';
import OrderItem from './OrderItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../Layouts/MetaData';

const orderStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];
const dt = new Date();
const ordertime = [dt.getMonth(), dt.getFullYear() - 1, dt.getFullYear() - 2];

const MyOrders = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const [status, setStatus] = useState("");
    const [orderTime, setOrderTime] = useState(0);
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error, enqueueSnackbar]);

    useEffect(() => {
        if (orders) {
            setFilteredOrders(orders);
        }
    }, [orders]);


    useEffect(() => {
        setSearch("");
        // console.log(status);
        // console.log(typeof orderTime);
        // console.log(orderTime);

        if (!status && +orderTime === 0) {
            setFilteredOrders(orders);
            return;
        }

        if (status && orderTime) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) => order.orderStatus === status &&
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else if (!status) {
            if (+orderTime === dt.getMonth()) {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getMonth() === +orderTime
                );
                setFilteredOrders(filteredArr);
            } else {
                const filteredArr = orders.filter((order) =>
                    new Date(order.createdAt).getFullYear() === +orderTime
                );
                setFilteredOrders(filteredArr);
            }
        } else {
            const filteredArr = orders.filter((order) => order.orderStatus === status);
            setFilteredOrders(filteredArr);
        }
        // eslint-disable-next-line
    }, [status, orderTime]);

    // Real-time search filter - filters as user types
    useEffect(() => {
        if (!orders || orders.length === 0) {
            return;
        }

        if (!search.trim()) {
            // If search is empty, apply status/time filters
            if (!status && +orderTime === 0) {
                setFilteredOrders(orders);
            } else {
                // Reapply the status/time filters
                if (status && orderTime) {
                    if (+orderTime === dt.getMonth()) {
                        const filteredArr = orders.filter((order) => order.orderStatus === status &&
                            new Date(order.createdAt).getMonth() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    } else {
                        const filteredArr = orders.filter((order) => order.orderStatus === status &&
                            new Date(order.createdAt).getFullYear() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    }
                } else if (!status) {
                    if (+orderTime === dt.getMonth()) {
                        const filteredArr = orders.filter((order) =>
                            new Date(order.createdAt).getMonth() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    } else {
                        const filteredArr = orders.filter((order) =>
                            new Date(order.createdAt).getFullYear() === +orderTime
                        );
                        setFilteredOrders(filteredArr);
                    }
                } else {
                    const filteredArr = orders.filter((order) => order.orderStatus === status);
                    setFilteredOrders(filteredArr);
                }
            }
            return;
        }

        // Filter orders based on search term
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        })).filter(order => order.orderItems.length > 0);
        setFilteredOrders(arr);
        // eslint-disable-next-line
    }, [search, orders]);

    const searchOrders = (e) => {
        e.preventDefault();
        if (!search.trim()) {
            enqueueSnackbar("Empty Input", { variant: "warning" });
            return;
        }
        const arr = orders.map((el) => ({
            ...el,
            orderItems: el.orderItems.filter((order) =>
                order.name.toLowerCase().includes(search.toLowerCase()))
        })).filter(order => order.orderItems.length > 0); // Filter out orders with no matching items
        setFilteredOrders(arr);
    }

    const clearFilters = () => {
        setStatus("");
        setOrderTime(0);
    }

    return (
        <>
            <MetaData title="Deployment Archive | Quick Buy" />

            <main className="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 right-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 left-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="container-responsive relative z-10">
                    {loading ? <Loader /> : (
                        <div className="flex flex-col lg:flex-row gap-10 items-start">
                            {/* Filter sidebar content follows... */}

                            {/* Professional Filter Sidebar */}
                            <aside className="w-full lg:w-[320px] animate-fade-in-left mt-10 lg:mt-16">
                                <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
                                    <div className="p-8 bg-blue-600 flex justify-between items-center">
                                        <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                            My Orders
                                        </h2>
                                        <button onClick={clearFilters} className="text-[9px] font-black text-white/60 uppercase tracking-widest hover:text-white transition-colors">
                                            Reset Filters
                                        </button>
                                    </div>

                                    <div className="p-8 space-y-10">
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest">Order Status</p>
                                            <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)} className="space-y-3">
                                                {orderStatus.map((el, i) => (
                                                    <div key={i} className={`flex items-center px-4 py-3 rounded-2xl border transition-all duration-300 ${status === el ? 'bg-blue-50 border-blue-200' : 'bg-transparent border-transparent hover:bg-blue-50/50'}`}>
                                                        <FormControlLabel
                                                            value={el}
                                                            control={<Radio size="small" sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#0f52ba' } }} />}
                                                            label={<span className="text-[11px] font-black text-blue-950 uppercase tracking-tight ml-2">{el}</span>}
                                                            sx={{ margin: 0, width: '100%' }}
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* Orders Feed */}
                            <div className="flex-1 w-full space-y-8 animate-fade-in-right">
                                {/* Medical Search Bar */}
                                <form onSubmit={searchOrders} className="relative group mt-10 lg:mt-16">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="search"
                                        placeholder="Search Your Orders..."
                                        className="w-full bg-white/80 backdrop-blur-3xl border border-blue-100 rounded-full px-10 py-6 text-sm font-bold text-blue-950 placeholder:text-blue-900/30 outline-none transition-all duration-700 shadow-2xl shadow-blue-900/5 focus:border-blue-600 focus:bg-white"
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-full shadow-xl shadow-blue-600/30 hover:bg-blue-800 transition-all active:scale-95">
                                        <SearchIcon />
                                    </button>
                                </form>

                                <div className="space-y-6">
                                    {filteredOrders.length === 0 ? (
                                        <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-20 flex flex-col items-center text-center border border-blue-100 shadow-2xl shadow-blue-900/5">
                                            <div className="w-24 h-24 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-600 mb-8 border border-blue-100">
                                                <i className="material-icons text-5xl italic font-black">inventory</i>
                                            </div>
                                            <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tight mb-4">No Orders Found</h3>
                                            <p className="text-[11px] font-black text-blue-900/40 uppercase tracking-widest max-w-sm">You haven't placed any orders that match these filters yet.</p>
                                        </div>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const { _id, orderStatus, orderItems, createdAt, deliveredAt } = order;
                                            return (
                                                orderItems.map((item, index) => (
                                                    <OrderItem {...item} key={index} orderId={_id} orderStatus={orderStatus} createdAt={createdAt} deliveredAt={deliveredAt} />
                                                ))
                                            )
                                        }).reverse()
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default MyOrders;
