import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { loginSeller, clearErrors as clearSellerErrors } from '../../actions/sellerAction';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LockPersonIcon from '@mui/icons-material/LockPerson';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading: userLoading, isAuthenticated: userAuth, error: userError, user } = useSelector((state) => state.user);
    const { loading: sellerLoading, isAuthenticated: sellerAuth, error: sellerError, seller } = useSelector((state) => state.seller);

    const [loginType, setLoginType] = useState('user'); // 'user' or 'seller'

    const loading = loginType === 'seller' ? sellerLoading : userLoading;
    const isAuthenticated = loginType === 'seller' ? sellerAuth : userAuth;
    const error = loginType === 'seller' ? sellerError : userError;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [hasLoggedIn, setHasLoggedIn] = useState(false);

    const validate = (field, value) => {
        const newErrors = { ...errors };
        if (field === 'email') {
            if (!value.trim()) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
            else delete newErrors.email;
        } else if (field === 'password') {
            if (!value) newErrors.password = "Password is required";
            else delete newErrors.password;
        }
        return newErrors;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors(validate('email', e.target.value));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors(validate('password', e.target.value));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const formErrors = {};
        if (!email.trim()) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid";

        if (!password) formErrors.password = "Password is required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setHasLoggedIn(true);
        if (loginType === 'seller') {
            dispatch(loginSeller(email, password));
        } else {
            dispatch(loginUser(email, password));
        }
    };

    useEffect(() => {
        if (error) {
            // Only show popup for actual errors, not the initial "Please Login to Access"
            if (error !== "Please Login to Access") {
                Swal.fire({
                    title: "Error!",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
            if (loginType === 'seller') dispatch(clearSellerErrors());
            else dispatch(clearErrors());
        }

        if (isAuthenticated) {
            if (hasLoggedIn) {
                Swal.fire({
                    title: "Success!",
                    text: loginType === 'seller' ? "Seller Login Successfully!" : "User Login Successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }

            if (user?.role === "admin") {
                navigate("/admin/dashboard");
            } else if (seller) {
                navigate("/seller/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [dispatch, error, isAuthenticated, navigate, user, hasLoggedIn]);

    return (
        <>
            <MetaData title="Login | MedStore" />
            {loading && <BackdropLoader />}

            <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full space-y-8 bg-white rounded-[30px] shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Sidebar / Left Panel */}
                    <div className="md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons-blue.png')]"></div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="flex items-center space-x-3 mb-8">
                                <LockPersonIcon fontSize="large" />
                                <span className="text-2xl font-bold tracking-wide">MedStore</span>
                            </div>
                            <h2 className="text-4xl font-extrabold leading-tight mb-4">Welcome Back!</h2>
                            <p className="text-blue-100 text-lg mb-8">Login to manage your orders, appointments, and access exclusive medical resources.</p>
                            <div className="mt-4">
                                <p className="text-sm text-blue-200">Don't have an account?</p>
                                <Link to="/register" className="mt-2 inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-50 transition duration-300">
                                    Create Account
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                            <p className="text-gray-500 mt-2">Sign in to your account</p>
                        </div>

                        <div className="flex justify-center mb-6">
                            <ToggleButtonGroup
                                color="primary"
                                value={loginType}
                                exclusive
                                onChange={(e, newType) => { if (newType) setLoginType(newType); }}
                                aria-label="Login Type"
                            >
                                <ToggleButton value="user">
                                    <PersonIcon sx={{ mr: 1 }} /> User
                                </ToggleButton>
                                <ToggleButton value="seller">
                                    <StorefrontIcon sx={{ mr: 1 }} /> Seller
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">

                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{ style: { borderRadius: '12px' } }}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                variant="outlined"
                                InputProps={{ style: { borderRadius: '12px' } }}
                                error={!!errors.password}
                                helperText={errors.password}
                            />

                            <div className="text-right">
                                <Link
                                    to="/password/forgot"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                startIcon={<LoginIcon />}
                                sx={{
                                    borderRadius: '15px',
                                    padding: '14px',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                    textTransform: 'none',
                                }}
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
