import { Link, useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSeller } from '../../actions/sellerAction';
import Swal from 'sweetalert2';
import '../Admin/Sidebar/Sidebar.css'; // Reusing existing Sidebar CSS

const sections = [
    {
        title: "MAIN",
        items: [
            {
                icon: <DashboardIcon />,
                label: "Dashboard",
                ref: "/seller/dashboard",
                activeTab: 0
            }
        ]
    },
    {
        title: "PRODUCTS",
        items: [
            {
                icon: <InventoryIcon />,
                label: "All Products",
                ref: "/seller/products",
                activeTab: 1
            },
            {
                icon: <PostAddIcon />,
                label: "New Product",
                ref: "/seller/product/new",
                activeTab: 2
            }
        ]
    },
    {
        title: "ORDERS",
        items: [
            {
                icon: <ShoppingBagIcon />,
                label: "Orders",
                ref: "/seller/orders",
                activeTab: 3
            }
        ]
    }
];

const SellerSidebar = ({ activeTab, setToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Use seller state
    const { seller } = useSelector((state) => state.seller);

    const isActive = (ref, itemActiveTab) => {
        return location.pathname === ref || (activeTab !== undefined && activeTab === itemActiveTab);
    };

    const handleLogout = () => {
        dispatch(logoutSeller());
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

            {/* Logo Section */}
            <div className="h-16 flex items-center px-4 border-b border-gray-200">
                <Link to="/seller/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                        <StorefrontIcon className="text-white" fontSize="small" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800">
                            Seller<span className="text-green-600">Panel</span>
                        </h1>
                        <p className="text-[10px] text-gray-500 -mt-0.5">MedStore Seller</p>
                    </div>
                </Link>
            </div>

            {/* Seller Profile Card */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={seller?.profileImage}
                        sx={{
                            width: 44,
                            height: 44,
                            bgcolor: '#166534',
                            fontSize: '18px',
                            fontWeight: 600
                        }}
                    >
                        {seller?.name?.charAt(0) || 'S'}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                            {seller?.name || 'Seller'}
                        </h4>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${seller?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {seller?.status || 'Active'}
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
                                const { icon, label, ref, activeTab: itemActiveTab } = item;
                                const active = isActive(ref, itemActiveTab);

                                return (
                                    <div key={iIndex} className="px-2">
                                        <Link
                                            to={ref}
                                            onClick={() => setToggleSidebar && setToggleSidebar(false)}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all ${active
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <span className={active ? 'text-green-700' : 'text-gray-500'}>
                                                {icon}
                                            </span>
                                            <span className="text-xs font-medium">{label}</span>

                                            {/* Active Indicator */}
                                            {active && (
                                                <span className="ml-auto w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                                            )}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

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
                    MedStore Seller Panel v1.0
                </p>
            </div>
        </aside>
    );
};

export default SellerSidebar;
