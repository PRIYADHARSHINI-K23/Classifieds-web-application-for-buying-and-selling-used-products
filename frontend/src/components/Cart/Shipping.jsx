import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { useSnackbar } from 'notistack';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import states from '../../utils/states';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VerifiedIcon from '@mui/icons-material/Verified';

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState(shippingInfo.state || "");
    const [pincode, setPincode] = useState(shippingInfo.pincode || "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

    const [prescription, setPrescription] = useState(null);
    const [errors, setErrors] = useState({});

    const hasPrescriptionItem = cartItems.some(item => item.subCategoryType === "Prescription");

    // Real-time error clearance
    const handleInputChange = (setter, field, value) => {
        setter(value);
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!address.trim()) newErrors.address = "Delivery address is required";
        if (!pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        } else if (pincode.length !== 6) {
            newErrors.pincode = "Pincode must be 6 digits";
        }
        if (!phoneNo.trim()) {
            newErrors.phoneNo = "Phone number is required";
        } else if (phoneNo.length !== 10) {
            newErrors.phoneNo = "Phone number must be 10 digits";
        }
        if (!city.trim()) newErrors.city = "City name is required";
        if (!state) newErrors.state = "Please select your state";
        if (!state) newErrors.state = "Please select your state";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            dispatch(saveShippingInfo({ address, city, country, state, pincode, phoneNo }));
            enqueueSnackbar("Logistics saved successfully", { variant: "success" });
            navigate("/order/confirm");
        } else {
            enqueueSnackbar("Please correct the errors mentioned below", { variant: "error" });
        }
    }

    return (
        <>
            <MetaData title="Deployment Logistics | Quick Buy" />
            <main className="w-full mt-24 sm:mt-28 bg-slate-50 min-h-screen relative overflow-hidden">

                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-teal-500/10 blur-[180px] rounded-full animate-float-2"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.05]"></div>
                </div>

                <div className="container-responsive relative z-10 py-12 px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Main Logistics column */}
                        <div className="flex-1 w-full animate-fade-in-left">
                            <Stepper activeStep={1}>
                                <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-blue-100 shadow-2xl shadow-blue-900/5 mt-8">
                                    <div className="flex items-center gap-4 mb-12">
                                        <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tighter">Delivery <span className="text-blue-600">Address</span></h2>
                                    </div>

                                    <form onSubmit={shippingSubmit} autoComplete="off" className="space-y-10">

                                        <TextField
                                            value={address}
                                            onChange={(e) => handleInputChange(setAddress, 'address', e.target.value)}
                                            fullWidth
                                            label="Full Delivery Address"
                                            variant="outlined"
                                            required
                                            multiline
                                            rows={2}
                                            error={!!errors.address}
                                            helperText={errors.address}
                                            sx={{
                                                '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' },
                                                '& .MuiInputLabel-root': { fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }
                                            }}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <TextField
                                                value={pincode}
                                                onChange={(e) => handleInputChange(setPincode, 'pincode', e.target.value)}
                                                type="number"
                                                label="Pincode"
                                                fullWidth
                                                required
                                                error={!!errors.pincode}
                                                helperText={errors.pincode}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' }
                                                }}
                                            />
                                            <TextField
                                                value={phoneNo}
                                                onChange={(e) => handleInputChange(setPhoneNo, 'phoneNo', e.target.value)}
                                                type="number"
                                                label="Phone Number"
                                                fullWidth
                                                required
                                                error={!!errors.phoneNo}
                                                helperText={errors.phoneNo}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' }
                                                }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <TextField
                                                value={city}
                                                onChange={(e) => handleInputChange(setCity, 'city', e.target.value)}
                                                label="City"
                                                fullWidth
                                                required
                                                error={!!errors.city}
                                                helperText={errors.city}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' }
                                                }}
                                            />
                                            <TextField
                                                label="Landmark (Optional)"
                                                fullWidth
                                                sx={{
                                                    '& .MuiOutlinedInput-root': { borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '700' }
                                                }}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-8">
                                            <FormControl fullWidth error={!!errors.state}>
                                                <InputLabel id="state-select">State</InputLabel>
                                                <Select
                                                    labelId="state-select"
                                                    id="state-select"
                                                    value={state}
                                                    label="State"
                                                    onChange={(e) => handleInputChange(setState, 'state', e.target.value)}
                                                    required
                                                    sx={{ borderRadius: '1.5rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '900' }}
                                                >
                                                    {states.map((item) => (
                                                        <MenuItem key={item.code} value={item.code} className="text-[11px] font-black uppercase tracking-widest">{item.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                {errors.state && <p className="text-[10px] text-[#d32f2f] font-bold mt-2 ml-4 uppercase tracking-widest">{errors.state}</p>}
                                            </FormControl>
                                        </div>



                                        <button
                                            type="submit"
                                            className="w-full md:w-auto px-16 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-[2rem] hover:bg-blue-800 transition-all duration-700 shadow-2xl shadow-blue-600/30 hover:-translate-y-2 active:scale-95"
                                        >
                                            Continue to Payment
                                        </button>
                                    </form>
                                </div>
                            </Stepper>
                        </div>

                        {/* Price Breakdown Sidebar */}
                        <div className="w-full lg:w-[450px]">
                            <PriceSidebar cartItems={cartItems} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Shipping;
