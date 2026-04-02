import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const DoctorRegister = () => {
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
        role: "Doctor",
        password: "",
        cpassword: "",
        qualification: "",
        specialization: "",
        registrationNumber: "",
        medicalCouncil: "",
        experience: "",
    });

    const { name, email, phone, address, gender, password, cpassword, qualification, specialization, registrationNumber, medicalCouncil, experience } = user;

    const [avatar, setAvatar] = useState("/profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");
    const [resume, setResume] = useState("");
    const [idProof, setIdProof] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar("Password length must be at least 8 characters", { variant: "warning" });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Passwords do not match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phone", phone);
        formData.set("address", address);
        formData.set("gender", gender);
        formData.set("role", "Doctor");
        formData.set("password", password);
        formData.set("qualification", qualification);
        formData.set("specialization", specialization);
        formData.set("registrationNumber", registrationNumber);
        formData.set("medicalCouncil", medicalCouncil);
        formData.set("experience", experience);
        formData.set("avatar", avatar);
        formData.set("resume", resume); // Treating resume as Medical Certificate
        formData.set("idProof", idProof);

        dispatch(registerUser(formData));
    };

    const handleDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else if (e.target.name === "resume") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setResume(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else if (e.target.name === "idProof") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setIdProof(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register as Doctor | MedStore" />

            {loading && <BackdropLoader />}
            <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl w-full space-y-8 bg-white rounded-[30px] shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Sidebar / Left Panel */}
                    <div className="md:w-1/3 bg-blue-600 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons-blue.png')]"></div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-8">
                                <LocalHospitalIcon fontSize="large" />
                                <span className="text-2xl font-bold tracking-wide">MedStore</span>
                            </div>
                            <h2 className="text-4xl font-extrabold leading-tight mb-4">Welcome, Doctor!</h2>
                            <p className="text-blue-100 text-lg">Join our network of top-tier medical professionals. Manage your practice and reach more patients effortlessly.</p>
                        </div>
                        <div className="relative z-10 mt-10">
                            <p className="text-sm text-blue-200">Already have an account?</p>
                            <Link to="/login" className="mt-2 inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-50 transition duration-300">
                                Login Here
                            </Link>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="md:w-2/3 p-10 md:p-14">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-800">Doctor Registration</h1>
                            <p className="text-gray-500 mt-2">Please fill in your details to create your account.</p>
                        </div>

                        <form onSubmit={handleRegister} encType="multipart/form-data" className="space-y-8">

                            {/* Section 1: Personal Details */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                                    <PersonIcon className="mr-2 text-blue-500" /> Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                    <TextField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                    <TextField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-600 font-medium">Gender:</span>
                                        <RadioGroup row name="gender" value={gender} onChange={handleDataChange} className="ml-2">
                                            <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                    <TextField
                                        label="Address"
                                        name="address"
                                        value={address}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        className="md:col-span-2"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                </div>
                            </div>

                            {/* Section 2: Professional Details */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                                    <AssignmentIndIcon className="mr-2 text-blue-500" /> Professional Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextField
                                        select
                                        label="Qualification"
                                        name="qualification"
                                        value={qualification}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    >
                                        <option value="">Select Qualification</option>
                                        <option value="MBBS">MBBS</option>
                                        <option value="MD">MD</option>
                                        <option value="MS">MS</option>
                                        <option value="BDS">BDS</option>
                                        <option value="MDS">MDS</option>
                                        <option value="BAMS">BAMS</option>
                                        <option value="BHMS">BHMS</option>
                                    </TextField>

                                    <TextField
                                        select
                                        label="Specialization"
                                        name="specialization"
                                        value={specialization}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    >
                                        <option value="">Select Specialization</option>
                                        <option value="Cardiologist">Cardiologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Orthopedic">Orthopedic</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="General Physician">General Physician</option>
                                    </TextField>

                                    <TextField
                                        label="Registration Number"
                                        name="registrationNumber"
                                        value={registrationNumber}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />

                                    <TextField
                                        select
                                        label="Medical Council"
                                        name="medicalCouncil"
                                        value={medicalCouncil}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    >
                                        <option value="">Select Medical Council</option>
                                        <option value="Tamil Nadu Medical Council">Tamil Nadu Medical Council</option>
                                        <option value="Karnataka Medical Council">Karnataka Medical Council</option>
                                        <option value="Kerala Medical Council">Kerala Medical Council</option>
                                        <option value="Andhra Pradesh Medical Council">Andhra Pradesh Medical Council</option>
                                        <option value="Medical Council of India">Medical Council of India</option>
                                    </TextField>

                                    <TextField
                                        label="Years of Experience"
                                        name="experience"
                                        type="number"
                                        value={experience}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Upload Documents */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                                    <CloudUploadIcon className="mr-2 text-blue-500" /> Upload Documents
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {/* Profile Photo */}
                                    <div className="flex flex-col items-center">
                                        <span className="mb-2 text-sm font-medium text-gray-600">Profile Photo</span>
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors">
                                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={handleDataChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Tap to upload</p>
                                    </div>

                                    {/* Medical Registration Certificate */}
                                    <div className="flex flex-col justify-center">
                                        <span className="mb-2 text-sm font-medium text-gray-600">Medical Reg. Certificate</span>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ borderRadius: '10px', textTransform: 'none' }}
                                        >
                                            {resume ? "File Selected" : "Upload File"}
                                            <input
                                                type="file"
                                                name="resume"
                                                hidden
                                                accept="application/pdf, image/*"
                                                onChange={handleDataChange}
                                                required
                                            />
                                        </Button>
                                    </div>

                                    {/* Doctor ID Proof */}
                                    <div className="flex flex-col justify-center">
                                        <span className="mb-2 text-sm font-medium text-gray-600">Government ID Proof</span>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            startIcon={<CloudUploadIcon />}
                                            sx={{ borderRadius: '10px', textTransform: 'none' }}
                                        >
                                            {idProof ? "File Selected" : "Upload File"}
                                            <input
                                                type="file"
                                                name="idProof"
                                                hidden
                                                accept="image/*, application/pdf"
                                                onChange={handleDataChange}
                                                required
                                            />
                                        </Button>
                                    </div>
                                </div>
                            </div>


                            {/* Section 4: Password */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="text-xl font-semibold text-gray-700 mb-4">Set Password</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <TextField
                                        label="Create Password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                    <TextField
                                        label="Confirm Password"
                                        name="cpassword"
                                        type="password"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{ style: { borderRadius: '12px' } }}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: '15px',
                                    padding: '14px',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                    textTransform: 'none'
                                }}
                            >
                                Register Now
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorRegister;