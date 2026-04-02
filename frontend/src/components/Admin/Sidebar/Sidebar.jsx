import { Link, useNavigate, useLocation } from 'react-router-dom';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { logoutUser } from '../../../actions/userAction';
import Swal from 'sweetalert2';
import { useState } from 'react';
import quickByLogo from '../../../assets/images/quickbuy_logo.png';




const sections = [
    {
        title: "MAIN",
        items: [
            {
                icon: <DashboardIcon />,
                label: "Dashboard",
                ref: "/admin/dashboard",
                activeTab: 0
            }
        ]
    },
    {
        title: "CATALOG",
        items: [
            {
                icon: <CategoryIcon />,
                label: "Categories",
                activeTab: 1,
                isDropdown: true,
                subItems: [
                    { label: "All Categories", ref: "/admin/categories" },
                    { label: "Sub Categories", ref: "/admin/subcategories" }
                ]
            },
            {
                icon: <InventoryIcon />,
                label: "Products",
                ref: "/admin/products",
                activeTab: 3
            }
        ]
    },
    {
        title: "SALES",
        items: [
            {
                icon: <ShoppingBagIcon />,
                label: "Orders",
                ref: "/admin/orders",
                activeTab: 2
            },
            // {
            //     icon: <LocalShippingIcon />,
            //     label: "Shipments",
            //     ref: "/admin/shipments",
            //     activeTab: 4
            // },
            // {
            //     icon: <PaymentIcon />,
            //     label: "Payments",
            //     ref: "/admin/payments",
            //     activeTab: 7
            // }
        ]
    },
    {
        title: "USERS",
        items: [
            {
                icon: <GroupIcon />,
                label: "Customers",
                ref: "/admin/users",
                activeTab: 5
            },
            {
                icon: <BadgeIcon />,
                label: "Staff Roles",
                ref: "/admin/roles",
                activeTab: 6
            }
        ]
    },
    {
        title: "SUPPORT",
        items: [
            {
                icon: <ReviewsIcon />,
                label: "Contact Queries",
                ref: "/admin/contacts",
                activeTab: 8
            }
        ]
    }
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(
        location.pathname.includes('/admin/categories') || 
        location.pathname.includes('/admin/subcategories')
    );
    const { user } = useSelector((state) => state.user);

    const isActive = (ref, itemActiveTab) => {
        return location.pathname === ref || (activeTab !== undefined && activeTab === itemActiveTab);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        Swal.fire({
            title: "Logged Out",
            text: "You have been successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            background: '#ffffff',
            confirmButtonColor: '#2874f0'
        });
        navigate("/login");
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
            
            {/* Logo Section - Flipkart/Amazon Style */}
            <div className="h-16 flex items-center px-4 border-b border-gray-200">
                <Link to="/admin/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#2874f0] rounded-md flex items-center justify-center">
                        <img src={quickByLogo} alt="QuickBuy" className="w-5 h-5 object-contain brightness-0 invert" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">
                            Quick<span className="text-[#fb641b]">Buy</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 -mt-0.5">Admin Panel</p>
                    </div>
                </Link>
            </div>

            {/* User Profile Card - Flipkart Style */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={user?.avatar?.url}
                        sx={{ 
                            width: 44, 
                            height: 44, 
                            bgcolor: '#2874f0',
                            fontSize: '18px',
                            fontWeight: 600
                        }}
                    >
                        {user?.name?.charAt(0) || 'A'}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                            {user?.name || 'Admin User'}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {user?.role === 'admin' ? 'Super Admin' : 'Staff'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
                {sections.map((section, sIndex) => (
                    <div key={sIndex} className="mb-6">
                        <div className="px-4 mb-2">
                            <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                {section.title}
                            </h3>
                        </div>
                        <div className="space-y-0.5">
                            {section.items.map((item, iIndex) => {
                                const { icon, label, ref, activeTab: itemActiveTab, isDropdown, subItems } = item;
                                const active = isActive(ref, itemActiveTab);

                                if (isDropdown) {
                                    return (
                                        <div key={iIndex} className="px-2">
                                            <button
                                                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
                                                    categoriesDropdownOpen 
                                                        ? 'bg-blue-50 text-[#2874f0]' 
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span className={`${categoriesDropdownOpen ? 'text-[#2874f0]' : 'text-gray-500'}`}>
                                                    {icon}
                                                </span>
                                                <span className="flex-1 text-left text-xs font-medium">{label}</span>
                                                <span className={`transition-transform duration-300 ${categoriesDropdownOpen ? 'rotate-180' : ''}`}>
                                                    <ExpandMoreIcon sx={{ fontSize: 18, color: categoriesDropdownOpen ? '#2874f0' : '#9ca3af' }} />
                                                </span>
                                            </button>
                                            
                                            {/* Submenu */}
                                            <div className={`overflow-hidden transition-all duration-300 ${categoriesDropdownOpen ? 'max-h-40 mt-1' : 'max-h-0'}`}>
                                                <div className="ml-7 pl-3 border-l-2 border-gray-200 space-y-0.5 py-1">
                                                    {subItems.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.ref}
                                                            onClick={() => setToggleSidebar && setToggleSidebar(false)}
                                                            className={`block px-3 py-1.5 rounded-md text-xs transition-colors ${
                                                                location.pathname === subItem.ref
                                                                    ? 'bg-blue-50 text-[#2874f0] font-medium'
                                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                            }`}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={iIndex} className="px-2">
                                        <Link
                                            to={ref}
                                            onClick={() => setToggleSidebar && setToggleSidebar(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
                                                active 
                                                    ? 'bg-blue-50 text-[#2874f0]' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <span className={active ? 'text-[#2874f0]' : 'text-gray-500'}>
                                                {icon}
                                            </span>
                                            <span className="text-xs font-medium">{label}</span>
                                            
                                            {/* Active Indicator */}
                                            {active && (
                                                <span className="ml-auto w-1.5 h-1.5 bg-[#2874f0] rounded-full"></span>
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Settings Section */}
                <div className="mb-6">
                    <div className="px-4 mb-2">
                        <h3 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                            SETTINGS
                        </h3>
                    </div>
                    <div className="px-2">
                        <Link
                            to="/admin/settings"
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${
                                location.pathname === '/admin/settings'
                                    ? 'bg-blue-50 text-[#2874f0]'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <span className={location.pathname === '/admin/settings' ? 'text-[#2874f0]' : 'text-gray-500'}>
                                <SettingsIcon sx={{ fontSize: 20 }} />
                            </span>
                            <span className="text-xs font-medium">Settings</span>
                        </Link>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="px-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all group"
                    >
                        <span className="text-gray-500 group-hover:text-red-500">
                            <LogoutIcon sx={{ fontSize: 20 }} />
                        </span>
                        <span className="text-xs font-medium">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Version Info */}
            <div className="p-4 border-t border-gray-200">
                <p className="text-[10px] text-gray-400 text-center">
                    QuickBuy Admin v2.0
                    <br />
                    <span className="text-[8px]">Delivery in Hours</span>
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;