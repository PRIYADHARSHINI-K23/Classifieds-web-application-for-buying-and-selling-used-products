import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const CustomerRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        role: "Customer",
        password: "",
        cpassword: "",
    });

    const { name, email, phone, address, gender, password, cpassword } = user;

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phone", phone);
        formData.set("address", address);
        formData.set("gender", gender);
        formData.set("role", "Customer");
        formData.set("password", password);

        dispatch(registerUser(formData));
    }

    const handleDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/')
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Customer Registration | MedStore" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12 px-4">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex">
                        <FormSidebar
                            title="Join as a Customer!"
                            tag="Create your account to start shopping"
                        />

                        <div className="flex-1 p-8 sm:p-12">
                            <div className="max-w-lg mx-auto">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Customer Registration</h2>
                                    <p className="text-gray-600">Fill in your details to create your account</p>
                                </div>

                                <form onSubmit={handleRegister} encType="multipart/form-data" className="space-y-4">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                            }
                                        }}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleDataChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            id="phone"
                                            label="Phone Number"
                                            type="tel"
                                            name="phone"
                                            value={phone}
                                            onChange={handleDataChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </div>

                                    <TextField
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        value={address}
                                        onChange={handleDataChange}
                                        multiline
                                        rows={2}
                                        required
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                            }
                                        }}
                                    />

                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium text-gray-700">Gender:</span>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={gender}
                                            onChange={handleDataChange}
                                        >
                                            <FormControlLabel value="male" control={<Radio required />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextField
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handleDataChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            id="confirm-password"
                                            label="Confirm Password"
                                            type="password"
                                            name="cpassword"
                                            value={cpassword}
                                            onChange={handleDataChange}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                    >
                                        Create Customer Account
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                                            Sign in
                                        </Link>
                                    </p>
                                    <p className="text-gray-600 mt-2">
                                        Want to register as a doctor?{' '}
                                        <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                                            Go back
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default CustomerRegister;