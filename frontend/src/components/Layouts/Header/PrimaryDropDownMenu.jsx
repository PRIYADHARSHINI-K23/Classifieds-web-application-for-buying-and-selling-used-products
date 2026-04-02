import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logoutUser } from '../../../actions/userAction';
import Swal from 'sweetalert2'

const PrimaryDropDownMenu = ({ setTogglePrimaryDropDown, user }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleLogout = () => {
        setTogglePrimaryDropDown(false);

        Swal.fire({
            title: "Success!",
            text: "Logout Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            dispatch(logoutUser());
            navigate("/login");
        });
    }

    const navs = [
        // {
        //     title: "Supercoin Zone",
        //     icon: <OfflineBoltIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/",
        // },
        // {
        //     title: "Flipkart Plus Zone",
        //     icon: <AddCircleIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/",
        // },
        {
            title: "Orders",
            icon: <ShoppingBagIcon sx={{ fontSize: "18px" }} />,
            redirect: "/orders",
        },
        // {
        //     title: "Wishlist",
        //     icon: <FavoriteIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/wishlist",
        // },
        // {
        //     title: "My Chats",
        //     icon: <ChatIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/",
        // },
        // {
        //     title: "Coupons",
        //     icon: <ConfirmationNumberIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/",
        // },
        // {
        //     title: "Gift Cards",
        //     icon: <AccountBalanceWalletIcon sx={{ fontSize: "18px" }} />,
        //     redirect: "/",
        // },
        {
            title: "Notifications",
            icon: <NotificationsIcon sx={{ fontSize: "18px" }} />,
            redirect: "/",
        },
    ]

    return (
        <div className="bg-white/95 backdrop-blur-3xl shadow-[0_40px_100px_rgba(15,82,186,0.1)] rounded-[2.5rem] border border-blue-50/50 flex flex-col p-4 overflow-hidden">

            <div className="px-5 py-4 mb-2 bg-blue-50/50 rounded-[1.8rem] border border-blue-100/50">
                <p className="text-[9px] font-black text-blue-900/30 uppercase tracking-[0.2em] mb-1">Authenticated Asset</p>
                <p className="text-[13px] font-black text-blue-950 uppercase truncate">{user?.name}</p>
            </div>

            <div className="flex flex-col gap-1">
                {user?.role === "admin" &&
                    <Link className="px-5 py-3.5 flex gap-4 items-center hover:bg-blue-600 hover:text-white rounded-[1.5rem] transition-all duration-300 group" to="/admin/dashboard" onClick={() => setTogglePrimaryDropDown(false)}>
                        <DashboardIcon sx={{ fontSize: "18px" }} className="text-blue-600 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Administrator</span>
                    </Link>
                }

                <Link className="px-5 py-3.5 flex gap-4 items-center hover:bg-blue-600 hover:text-white rounded-[1.5rem] transition-all duration-300 group" to="/account" onClick={() => setTogglePrimaryDropDown(false)}>
                    <AccountCircleIcon sx={{ fontSize: "18px" }} className="text-blue-600 group-hover:text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">My Account</span>
                </Link>

                <Link className="px-5 py-3.5 flex gap-4 items-center hover:bg-blue-600 hover:text-white rounded-[1.5rem] transition-all duration-300 group" to="/orders" onClick={() => setTogglePrimaryDropDown(false)}>
                    <ShoppingBagIcon sx={{ fontSize: "18px" }} className="text-blue-600 group-hover:text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Order Registry</span>
                </Link>

                <div className="h-px bg-blue-50 my-2 mx-4"></div>

                <div className="px-5 py-3.5 flex gap-4 items-center hover:bg-red-500 hover:text-white rounded-[1.5rem] transition-all duration-300 group cursor-pointer" onClick={handleLogout} >
                    <PowerSettingsNewIcon sx={{ fontSize: "18px" }} className="text-red-500 group-hover:text-white" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Disconnect</span>
                </div>
            </div>
        </div>
    );
};

export default PrimaryDropDownMenu;
