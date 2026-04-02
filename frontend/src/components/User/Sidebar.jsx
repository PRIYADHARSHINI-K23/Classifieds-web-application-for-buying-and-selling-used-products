import { useDispatch, useSelector } from 'react-redux';
import FolderIcon from '@mui/icons-material/Folder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../actions/userAction';

const Sidebar = ({ activeTab }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        enqueueSnackbar("Logout Successfully", { variant: "success" });
        navigate("/login");
    }

    return (
        <div className="w-full lg:w-1/4">
            <div className="sticky top-20 space-y-6">
                {/* Profile Card */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-blue-500 rounded-2xl shadow-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full ring-4 ring-white/30 shadow-xl overflow-hidden">
                            <img draggable="false" className="h-full w-full object-cover" src={user?.avatar?.url || "/default-avatar.png"} alt={user?.name || "Avatar"} />
                        </div>
                        <div className="flex-1">
                            <p className="text-white/80 text-sm font-medium">Welcome back,</p>
                            <h2 className="text-white font-bold text-lg truncate">{user?.name || "Guest"}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                                <span className="text-white/80 text-xs font-medium">Online Now</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    
                    {/* My Orders */}
                    <div className="group hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <Link to="/orders" className="flex items-center gap-4 p-4 border-b border-gray-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <FolderIcon className="text-green-600" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">My Orders</h3>
                                <p className="text-xs text-gray-500">Track your purchases</p>
                            </div>
                            <ChevronRightIcon className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" sx={{ fontSize: 18 }} />
                        </Link>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                                <PersonIcon className="text-green-600" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">Account Settings</h3>
                                <p className="text-xs text-gray-500">Manage your profile</p>
                            </div>
                        </div>
                        <div className="bg-white">
                            <Link to="/account" className={`flex items-center gap-3 p-3 pl-6 border-b border-gray-100 transition-all duration-300 ${
                                activeTab === "profile" 
                                    ? "bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border-r-4 border-green-500" 
                                    : "hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    activeTab === "profile" ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                <span className="text-sm font-medium">Profile Information</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">Manage Addresses</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">PAN Card Information</span>
                            </Link>
                        </div>
                    </div>

                    {/* Payments */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                                <AccountBalanceWalletIcon className="text-green-600" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">Payments</h3>
                                <p className="text-xs text-gray-500">Cards & wallet</p>
                            </div>
                        </div>
                        <div className="bg-white">
                            <Link to="/" className="flex items-center justify-between p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm font-medium">Gift Cards</span>
                                </div>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">₹0</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">Saved UPI</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">Saved Cards</span>
                            </Link>
                        </div>
                    </div>

                    {/* My Chats */}
                    <div className="group hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-300">
                        <Link to="/" className="flex items-center gap-4 p-4 border-b border-gray-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ChatIcon className="text-green-600" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">My Chats</h3>
                                <p className="text-xs text-gray-500">Customer support</p>
                            </div>
                            <ChevronRightIcon className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" sx={{ fontSize: 18 }} />
                        </Link>
                    </div>

                    {/* My Stuff */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                                <FolderSharedIcon className="text-green-600" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">My Stuff</h3>
                                <p className="text-xs text-gray-500">Coupons & reviews</p>
                            </div>
                        </div>
                        <div className="bg-white">
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">My Coupons</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">Reviews & Ratings</span>
                            </Link>
                            <Link to="/" className="flex items-center gap-3 p-3 pl-6 border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                <span className="text-sm font-medium">Notifications</span>
                            </Link>
                            <Link to="/wishlist" className={`flex items-center gap-3 p-3 pl-6 transition-all duration-300 ${
                                activeTab === "wishlist" 
                                    ? "bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border-r-4 border-green-500" 
                                    : "hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600"
                            }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    activeTab === "wishlist" ? "bg-green-500" : "bg-gray-300"
                                }`}></div>
                                <span className="text-sm font-medium">My Wishlist</span>
                            </Link>
                        </div>
                    </div>

                    {/* Logout */}
                    <div className="group hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300 cursor-pointer" onClick={handleLogout}>
                        <div className="flex items-center gap-4 p-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <PowerSettingsNewIcon className="text-red-500" sx={{ fontSize: 20 }} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 group-hover:text-red-500 transition-colors duration-300">Logout</h3>
                                <p className="text-xs text-gray-500">Sign out securely</p>
                            </div>
                            <ChevronRightIcon className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" sx={{ fontSize: 18 }} />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">⚡</span>
                        </div>
                        <h3 className="font-bold text-gray-800">Quick Actions</h3>
                    </div>
                    <div className="space-y-3">
                        <Link to="/password/update" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group">
                            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-600">Change Password</span>
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group">
                            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Track Orders</span>
                        </Link>
                        <Link to="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 group">
                            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600">Help Center</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
