import { useEffect } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getSellerStats } from '../../actions/sellerAction';
import MetaData from '../Layouts/MetaData';
import Chart from 'chart.js/auto';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BackdropLoader from '../Layouts/BackdropLoader';

const SellerHome = () => {
    const dispatch = useDispatch();

    const { seller } = useSelector((state) => state.seller);
    const { stats, loading, error } = useSelector((state) => state.sellerStats);

    useEffect(() => {
        if (seller && seller._id) {
            dispatch(getSellerStats(seller._id));
        }
    }, [dispatch, seller]);

    const totalAmount = stats?.totalRevenue || 0;
    const totalOrders = stats?.totalOrders || 0;
    const totalProducts = stats?.totalProducts || 0;

    // Recent orders (last 5) from stats
    const recentOrders = stats?.recentOrders || [];

    // Chart Data from Stats API
    const revenueData = stats?.charts?.revenueTrend || { labels: [], data: [] };
    const orderStatusData = stats?.charts?.orderStatus || { labels: [], data: [] };
    const dailyOrdersData = stats?.charts?.dailyOrders || { labels: [], data: [] };
    const topProductsData = stats?.charts?.topProducts || { labels: [], data: [] };

    const revenueLineState = {
        labels: revenueData.labels,
        datasets: [
            {
                label: `Revenue (Monthly)`,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                data: revenueData.data,
            },
        ],
    };

    const orderStatusDoughnutState = {
        labels: orderStatusData.labels,
        datasets: [
            {
                data: orderStatusData.data,
                backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'],
                hoverBackgroundColor: ['#2563eb', '#d97706', '#059669', '#dc2626'],
            },
        ],
    };

    const dailyOrdersBarState = {
        labels: dailyOrdersData.labels,
        datasets: [
            {
                label: 'Orders (Last 7 Days)',
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: '#3b82f6',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
                data: dailyOrdersData.data,
            },
        ],
    };

    const topProductsBarState = {
        labels: topProductsData.labels,
        datasets: [
            {
                label: 'Revenue per Product',
                backgroundColor: 'rgba(245, 158, 11, 0.6)',
                borderColor: '#f59e0b',
                borderWidth: 1,
                data: topProductsData.data,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <MetaData title="Seller Dashboard | MedStore" />
            {loading && <BackdropLoader />}

            {/* Header Section */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                        Welcome back, {seller?.name}! Here's your store performance.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-white rounded-2xl border border-green-100 shadow-sm flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${seller?.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium text-slate-600">Status: {seller?.status?.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {/* Revenue Card */}
                <div className="bg-white rounded-3xl p-8 border border-green-50 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-0"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-green-100 text-green-600 shadow-sm">
                                <CurrencyRupeeIcon fontSize="large" />
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                            ₹{totalAmount.toLocaleString('en-IN')}
                        </h3>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white rounded-3xl p-8 border border-blue-50 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
                                <ShoppingBagIcon fontSize="large" />
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Orders</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                            {totalOrders}
                        </h3>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white rounded-3xl p-8 border border-amber-50 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 rounded-2xl bg-amber-100 text-amber-600 shadow-sm">
                                <Inventory2Icon fontSize="large" />
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Products</p>
                        <h3 className="text-3xl font-bold text-slate-800 mt-2">
                            {totalProducts}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* Revenue Trend Line Chart */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUpIcon className="text-green-500" />
                        <h3 className="text-lg font-bold text-slate-800">Monthly Revenue Trend</h3>
                    </div>
                    <Line data={revenueLineState} options={{ responsive: true, maintainAspectRatio: true }} />
                </div>

                {/* Order Status Doughnut Chart */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Order Status Distribution</h3>
                    <div className="max-w-[300px] mx-auto">
                        <Doughnut data={orderStatusDoughnutState} />
                    </div>
                </div>

                {/* Daily Orders Bar Chart */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Orders (Last 7 Days)</h3>
                    <Bar data={dailyOrdersBarState} />
                </div>

                {/* Top Products Bar Chart */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Top 5 Products by Revenue</h3>
                    <Bar data={topProductsBarState} options={{ indexAxis: 'y' }} />
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 mb-10">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">Order ID</th>
                                <th className="p-4 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                                <th className="p-4 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                                <th className="p-4 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                <th className="p-4 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders && recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-slate-700">#{order._id.substring(0, 8)}</td>
                                        <td className="p-4 text-sm font-medium text-slate-700">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                                        <td className="p-4 text-sm font-medium text-green-600">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                    order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No orders yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
