import { useEffect } from 'react';
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { getAdminProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';
import { getAdminSubCategories } from '../../actions/subCategoryAction';
import MetaData from '../Layouts/MetaData';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TimelineIcon from '@mui/icons-material/Timeline';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MainData = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.users);
    const { subCategories } = useSelector((state) => state.subCategories);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
        dispatch(getAdminSubCategories());
    }, [dispatch]);

    const outOfStock = products?.filter(item => item.stock === 0).length || 0;
    const totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0) || 0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = new Date();

    const lineState = {
        labels: months,
        datasets: [
            {
                label: `${date.getFullYear()}`,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 10,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#ff6b6b',
                pointBorderWidth: 3,
                borderWidth: 4,
                data: months.map((m, i) => orders?.filter((od) => new Date(od.createdAt).getMonth() === i && new Date(od.createdAt).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const barState = {
        labels: subCategories?.map(s => s.name).slice(0, 6) || [],
        datasets: [
            {
                label: "Inventory Level",
                backgroundColor: [
                    '#ff6b6b', // Coral Red
                    '#4ecdc4', // Turquoise
                    '#45b7d1', // Sky Blue
                    '#96ceb4', // Sage Green
                    '#ffeead', // Soft Yellow
                    '#ffcc5c'  // Golden
                ],
                hoverBackgroundColor: [
                    '#ff5252',
                    '#3dbeb4',
                    '#3aa5c1',
                    '#86bea4',
                    '#ffdd7e',
                    '#ffb347'
                ],
                borderRadius: 16,
                barThickness: 30,
                data: subCategories?.slice(0, 6).map((cat) => products?.filter((item) => item.category === cat.name).length) || [],
            },
        ],
    };

    // Enhanced chart options with Indian theme
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#f1f5f9',
                bodyColor: '#cbd5e1',
                padding: 16,
                cornerRadius: 16,
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                grid: { 
                    color: 'rgba(226, 232, 240, 0.1)',
                    drawBorder: false,
                    lineWidth: 1
                },
                ticks: { 
                    color: '#64748b', 
                    font: { 
                        size: 11, 
                        weight: '500',
                        family: "'Inter', sans-serif"
                    },
                    callback: function(value) {
                        return '₹' + value.toLocaleString('en-IN');
                    }
                }
            },
            x: {
                grid: { display: false },
                ticks: { 
                    color: '#64748b', 
                    font: { 
                        size: 11, 
                        weight: '500',
                        family: "'Inter', sans-serif"
                    }
                }
            }
        }
    };

    // Enhanced Stat Card Component with Indian Theme
    const StatCard = ({ title, value, icon, trend, trendValue, bgColor, iconColor }) => {
        const isPositive = trend === 'up';
        
        return (
            <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-amber-100/30 rounded-bl-full -z-5"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/20 to-indigo-100/20 rounded-tr-full"></div>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-slate-300 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-slate-300 rounded-full animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${bgColor} shadow-lg`}>
                            {icon}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-semibold text-slate-600 tracking-wider">LIVE</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                        
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                                {title.includes('Revenue') ? '₹' : ''}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
                            </h3>
                            
                            {trend && (
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                                    isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                    {isPositive ? (
                                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                                    ) : (
                                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                                    )}
                                    <span className="text-xs font-semibold">{trendValue}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-6 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-gradient-to-r ${bgColor} rounded-full transition-all duration-700 group-hover:w-full`}
                            style={{ width: '75%' }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <MetaData title="Dashboard | Quick Buy" />

            {/* Header Section */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                        Welcome back! Here's what's happening with your store today.
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-medium text-slate-600">Last updated: {new Date().toLocaleDateString('en-IN')}</span>
                    </div>
                    <button className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <MoreVertIcon sx={{ color: '#64748b' }} />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Revenue"
                    value={`${totalAmount.toLocaleString('en-IN')}`}
                    icon={<CurrencyRupeeIcon sx={{ fontSize: 28, color: '#877557' }} />}
                    bgColor="from-amber-500 to-orange-500"
                    trend="up"
                    trendValue="+12.5%"
                />
                
                <StatCard
                    title="Total Orders"
                    value={orders?.length || 0}
                    icon={<ShoppingBagIcon sx={{ fontSize: 24, color: 'white' }} />}
                    bgColor="from-blue-500 to-indigo-500"
                    trend="up"
                    trendValue="+8.2%"
                />
                
                <StatCard
                    title="Total Products"
                    value={products?.length || 0}
                    icon={<Inventory2Icon sx={{ fontSize: 28, color: 'white' }} />}
                    bgColor="from-emerald-500 to-teal-500"
                    trend="up"
                    trendValue="+5.3%"
                />
                
                <StatCard
                    title="Total Users"
                    value={users?.length || 0}
                    icon={<PeopleIcon sx={{ fontSize: 28, color: 'white' }} />}
                    bgColor="from-purple-500 to-pink-500"
                    trend="up"
                    trendValue="+3.1%"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Revenue Chart - 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-100 rounded-xl">
                                    <TimelineIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Revenue Analytics</h2>
                            </div>
                            <p className="text-sm text-slate-500 ml-12">Monthly revenue performance for {date.getFullYear()}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                                <option>This Year</option>
                                <option>Last Year</option>
                                <option>Last 6 Months</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="h-[350px]">
                        <Line data={lineState} options={options} />
                    </div>
                </div>

                {/* Inventory Distribution */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-100 rounded-xl">
                                    <CategoryIcon sx={{ color: '#10b981', fontSize: 20 }} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Inventory Overview</h2>
                            </div>
                            <p className="text-sm text-slate-500 ml-12">Stock by category</p>
                        </div>
                    </div>
                    
                    <div className="h-[250px] mb-8">
                        <Bar data={barState} options={{
                            ...options,
                            maintainAspectRatio: false,
                            plugins: {
                                ...options.plugins,
                                legend: { display: false }
                            }
                        }} />
                    </div>

                    {/* Stock Status */}
                    <div className="space-y-4 mt-8 pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100 group hover:bg-rose-100 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-100 rounded-xl group-hover:bg-rose-200 transition-all">
                                    <WarningAmberIcon sx={{ color: '#e11d48', fontSize: 18 }} />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Out of Stock Items</span>
                            </div>
                            <span className="px-4 py-1.5 bg-rose-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-rose-500/30">
                                {outOfStock}
                            </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group hover:bg-emerald-100 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-all">
                                    <CheckCircleIcon sx={{ color: '#059669', fontSize: 18 }} />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Active Categories</span>
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-500/30">
                                {subCategories?.length || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: <StorefrontIcon />, label: 'Add Product', color: 'amber' },
                            { icon: <ShoppingBagIcon />, label: 'New Order', color: 'blue' },
                            { icon: <PeopleIcon />, label: 'Add User', color: 'emerald' },
                        ].map((action, idx) => (
                            <button key={idx} className="p-6 bg-slate-50 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all group">
                                <div className={`p-3 bg-${action.color}-100 rounded-xl mb-3 group-hover:scale-110 transition-transform mx-auto w-fit`}>
                                    <div className={`text-${action.color}-600`}>
                                        {action.icon}
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-600">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">New order received</p>
                                    <p className="text-xs text-slate-500 mt-1">Order #ORD{Math.floor(Math.random() * 10000)}</p>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    ₹{Math.floor(Math.random() * 5000)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainData;