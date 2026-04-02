import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Chip,
  Box,
  Typography,
  CircularProgress
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../actions/userAction";
import { registerSeller, clearErrors as clearSellerErrors } from "../../actions/sellerAction";
import { getAllRoles } from "../../actions/rolesActions";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Swal from "sweetalert2";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading: userLoading, isAuthenticated: userAuth, error: userError, user: currentUser } = useSelector(
    (state) => state.user
  );

  // State for account type selection
  const [accountType, setAccountType] = useState('user'); // 'user' or 'seller'

  const { loading: sellerLoading, isAuthenticated: sellerAuth, error: sellerError, seller: currentSeller } = useSelector(
    (state) => state.seller
  );

  const loading = accountType === 'seller' ? sellerLoading : userLoading;
  const isAuthenticated = accountType === 'seller' ? sellerAuth : userAuth;
  const error = accountType === 'seller' ? sellerError : userError;

  // Get all roles from database - exactly as shown in user roles
  const { roles = [], loading: roleLoading } = useSelector(
    (state) => state.roles || {}
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    password: "",
    cpassword: "",

    // Seller-specific fields
    companyName: "",
    gstNumber: "",
    businessType: "",
    website: "",
    panNumber: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
    businessCountry: "India",
    businessLicense: null,
    panCardDocument: null,
    cancelledCheque: null,
    profilePhoto: null
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  // File upload states
  const [businessLicense, setBusinessLicense] = useState("");
  const [panDocument, setPanDocument] = useState("");
  const [chequeDocument, setChequeDocument] = useState("");

  // Validation function - same as user roles validation
  const validate = (fieldName, value) => {
    const newErrors = { ...errors };

    // Common validations (same as user roles)
    switch (fieldName) {
      case 'name':
        if (!value?.trim()) newErrors.name = "Full Name is required";
        else delete newErrors.name;
        break;
      case 'email':
        if (!value?.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
        else delete newErrors.email;
        break;
      case 'phone':
        if (!value?.trim()) newErrors.phone = "Phone Number is required";
        else if (!/^\d{10}$/.test(value)) newErrors.phone = "Phone Number must be 10 digits";
        else delete newErrors.phone;
        break;
      case 'gender':
        if (!value) newErrors.gender = "Gender is required";
        else delete newErrors.gender;
        break;
      case 'address':
        if (!value?.trim()) newErrors.address = "Address is required";
        else delete newErrors.address;
        break;
      case 'role':
        if (!value) newErrors.role = "Role is required";
        else delete newErrors.role;
        break;
      case 'password':
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8) newErrors.password = "Password must be at least 8 characters";
        else delete newErrors.password;
        if (user.cpassword && value !== user.cpassword) newErrors.cpassword = "Passwords do not match";
        else if (user.cpassword && value === user.cpassword) delete newErrors.cpassword;
        break;
      case 'cpassword':
        if (!value) newErrors.cpassword = "Confirm Password is required";
        else if (value !== user.password) newErrors.cpassword = "Passwords do not match";
        else delete newErrors.cpassword;
        break;
    }

    // Seller fields validation
    if (accountType === 'seller') {
      switch (fieldName) {
        case 'companyName':
          if (!value?.trim()) newErrors.companyName = "Company Name is required";
          else delete newErrors.companyName;
          break;
        case 'businessType':
          if (!value) newErrors.businessType = "Business Type is required";
          else delete newErrors.businessType;
          break;
        case 'gstNumber':
          if (value && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
            newErrors.gstNumber = "Invalid GST Number format";
          } else delete newErrors.gstNumber;
          break;
        case 'panNumber':
          if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
            newErrors.panNumber = "Invalid PAN Number format";
          } else delete newErrors.panNumber;
          break;
        case 'bankAccountNumber':
          if (!value?.trim()) newErrors.bankAccountNumber = "Bank Account Number is required";
          else delete newErrors.bankAccountNumber;
          break;
        case 'ifscCode':
          if (!value?.trim()) newErrors.ifscCode = "IFSC Code is required";
          else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) newErrors.ifscCode = "Invalid IFSC Code";
          else delete newErrors.ifscCode;
          break;
        case 'businessAddress':
          if (!value?.trim()) newErrors.businessAddress = "Business Address is required";
          else delete newErrors.businessAddress;
          break;
        case 'businessCity':
          if (!value?.trim()) newErrors.businessCity = "City is required";
          else delete newErrors.businessCity;
          break;
        case 'businessState':
          if (!value?.trim()) newErrors.businessState = "State is required";
          else delete newErrors.businessState;
          break;
        case 'businessPincode':
          if (!value?.trim()) newErrors.businessPincode = "Pincode is required";
          else if (!/^\d{6}$/.test(value)) newErrors.businessPincode = "Pincode must be 6 digits";
          else delete newErrors.businessPincode;
          break;
      }
    }

    return newErrors;
  };

  // Validate entire form on submit
  const validateForm = () => {
    const newErrors = {};

    // Common validations (same as user roles)
    if (!user.name?.trim()) newErrors.name = "Full Name is required";
    if (!user.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email is invalid";
    if (!user.phone?.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\d{10}$/.test(user.phone)) newErrors.phone = "Phone Number must be 10 digits";
    if (!user.gender) newErrors.gender = "Gender is required";
    if (!user.address?.trim()) newErrors.address = "Address is required";
    if (!user.role) newErrors.role = "Role is required";
    if (!user.password) newErrors.password = "Password is required";
    else if (user.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!user.cpassword) newErrors.cpassword = "Confirm Password is required";
    else if (user.password !== user.cpassword) newErrors.cpassword = "Passwords do not match";

    // Seller-specific validations
    if (accountType === 'seller') {
      if (!user.companyName?.trim()) newErrors.companyName = "Company Name is required";
      if (!user.businessType) newErrors.businessType = "Business Type is required";
      if (user.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(user.gstNumber)) {
        newErrors.gstNumber = "Invalid GST Number format";
      }
      if (user.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(user.panNumber)) {
        newErrors.panNumber = "Invalid PAN Number format";
      }
      if (!user.bankAccountNumber?.trim()) newErrors.bankAccountNumber = "Bank Account Number is required";
      if (!user.ifscCode?.trim()) newErrors.ifscCode = "IFSC Code is required";
      if (!user.businessAddress?.trim()) newErrors.businessAddress = "Business Address is required";
      if (!user.businessCity?.trim()) newErrors.businessCity = "City is required";
      if (!user.businessState?.trim()) newErrors.businessState = "State is required";
      if (!user.businessPincode?.trim()) newErrors.businessPincode = "Pincode is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }



  const handleDataChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file uploads
    if (files) {
      if (name === "profilePhoto") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setUser({ ...user, profilePhoto: files[0] });
          }
        };
        reader.readAsDataURL(files[0]);
      } else if (name === "businessLicense") {
        setUser({ ...user, businessLicense: files[0] });
        setBusinessLicense(files[0].name);
      } else if (name === "panCardDocument") {
        setUser({ ...user, panCardDocument: files[0] });
        setPanDocument(files[0].name);
      } else if (name === "cancelledCheque") {
        setUser({ ...user, cancelledCheque: files[0] });
        setChequeDocument(files[0].name);
      }
    } else {
      setUser({ ...user, [name]: value });
      const updatedErrors = validate(name, value);
      setErrors(updatedErrors);
    }
  };

  const handleAccountTypeChange = (event, newType) => {
    if (newType !== null) {
      setAccountType(newType);
      // Reset role when account type changes
      setUser(prev => ({ ...prev, role: "" }));
    }
  };

  // Fetch all roles from database - exactly as in user roles
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  // Display all roles exactly as they are from database - no filtering
  // This is the key change - showing ALL roles from database
  const displayRoles = roles && roles.length > 0 ? roles : [];

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      enqueueSnackbar("Please fix the errors in the form", { variant: "error" });
      return;
    }

    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      role: user.role, // This comes directly from the database roles
      password: user.password,
      cpassword: user.cpassword,
      accountType: accountType
    }

    // Convert files to Base64
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    if (accountType === 'seller') {
      payload.companyName = user.companyName;
      payload.gstNumber = user.gstNumber;
      payload.businessType = user.businessType;
      payload.website = user.website;
      payload.panNumber = user.panNumber;
      payload.bankAccountNumber = user.bankAccountNumber;
      payload.bankName = user.bankName;
      payload.ifscCode = user.ifscCode;
      payload.businessAddress = user.businessAddress;
      payload.businessCity = user.businessCity;
      payload.businessState = user.businessState;
      payload.businessPincode = user.businessPincode;
      payload.businessCountry = user.businessCountry;
      payload.businessLicense = await convertFileToBase64(user.businessLicense);
      payload.panCardDocument = await convertFileToBase64(user.panCardDocument);
      payload.cancelledCheque = await convertFileToBase64(user.cancelledCheque);
      payload.profilePhoto = await convertFileToBase64(user.profilePhoto);

      dispatch(registerSeller(payload));
    } else {
      dispatch(registerUser(payload));
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      if (accountType === 'seller') dispatch(clearSellerErrors());
      else dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      if (currentUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (accountType === 'seller') {
        navigate("/seller/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, enqueueSnackbar, currentUser, accountType]);







  return (
    <>
      <MetaData title="Create Account | MedStore" />
      {loading && <BackdropLoader />}

      <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white rounded-[30px] shadow-xl overflow-hidden flex flex-col md:flex-row mt-20">

          {/* Sidebar / Left Panel */}
          <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons-blue.png')]"></div>

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <PersonAddIcon fontSize="large" />
                <span className="text-2xl font-bold tracking-wide">MedStore</span>
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-4">Join Us Today</h2>
              <p className="text-blue-100 text-lg">Create your account to access our premium medical services and products.</p>
            </div>

            {/* Account Type Selection */}
            <div className="relative z-10 my-8">
              <Typography variant="subtitle2" className="text-blue-200 mb-3">
                Select Account Type:
              </Typography>
              <ToggleButtonGroup
                value={accountType}
                exclusive
                onChange={handleAccountTypeChange}
                orientation="vertical"
                sx={{
                  width: '100%',
                  '& .MuiToggleButton-root': {
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.3)',
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      borderColor: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  },
                }}
              >
                <ToggleButton value="user">
                  <PersonAddIcon sx={{ mr: 1 }} /> Regular User
                </ToggleButton>
                <ToggleButton value="seller">
                  <StorefrontIcon sx={{ mr: 1 }} /> Seller
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            {/* Center Visual */}
            <div className="relative z-10 flex-grow flex flex-col justify-center items-center my-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="w-36 h-36 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-2xl">
                  {accountType === 'seller' && (
                    <StorefrontIcon sx={{ fontSize: 80, color: 'white' }} />
                  )}
                  {accountType === 'user' && (
                    <PersonAddIcon sx={{ fontSize: 80, color: 'white' }} />
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-auto">
              <p className="text-sm text-blue-200">Already have an account?</p>
              <Link to="/login" className="mt-2 inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 transform">
                Login Here
              </Link>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="md:w-2/3 p-8 md:p-12 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {accountType === 'seller' ? 'Seller Registration' : 'User Registration'}
              </h1>
              <p className="text-gray-500 mt-2">Please fill in your details below.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              {/* Personal Information - Common for all */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={user.phone}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={user.gender}
                      onChange={handleDataChange}
                      label="Gender"
                      sx={{ borderRadius: '12px' }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </div>
                <TextField
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={handleDataChange}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  className="mt-4"
                  InputProps={{ style: { borderRadius: '12px' } }}
                  sx={{ mt: 2 }}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </div>

              {/* Role Selection - Dynamically from Database - EXACTLY like user roles */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {accountType === 'seller' ? 'Select Seller Role' : 'Select User Role'}
                </h3>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>Select Role</InputLabel>
                  <Select
                    name="role"
                    value={user.role}
                    onChange={handleDataChange}
                    label="Select Role"
                    sx={{ borderRadius: '12px' }}
                  >
                    {roleLoading ? (
                      <MenuItem disabled>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={20} /> Loading roles...
                        </Box>
                      </MenuItem>
                    ) : displayRoles.length > 0 ? (
                      displayRoles.map((role) => (
                        <MenuItem key={role._id} value={role.name}>
                          {role.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No roles available</MenuItem>
                    )}
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                  {!roleLoading && displayRoles.length === 0 && (
                    <FormHelperText error>
                      No roles found in database. Please contact administrator.
                    </FormHelperText>
                  )}
                </FormControl>
              </div>

              {/* Seller-specific Fields */}
              {accountType === 'seller' && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-green-100 shadow-sm animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                    <StorefrontIcon sx={{ mr: 1 }} /> Business Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="companyName"
                      value={user.companyName}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.companyName}
                      helperText={errors.companyName}
                    />

                    <FormControl fullWidth error={!!errors.businessType}>
                      <InputLabel>Business Type</InputLabel>
                      <Select
                        name="businessType"
                        value={user.businessType}
                        onChange={handleDataChange}
                        label="Business Type"
                        sx={{ borderRadius: '12px' }}
                      >
                        <MenuItem value="retailer">Retailer</MenuItem>
                        <MenuItem value="wholesaler">Wholesaler</MenuItem>
                        <MenuItem value="manufacturer">Manufacturer</MenuItem>
                        <MenuItem value="distributor">Distributor</MenuItem>
                        <MenuItem value="pharmacy">Pharmacy</MenuItem>
                        <MenuItem value="clinic">Clinic</MenuItem>
                        <MenuItem value="hospital">Hospital</MenuItem>
                      </Select>
                      {errors.businessType && <FormHelperText>{errors.businessType}</FormHelperText>}
                    </FormControl>

                    <TextField
                      fullWidth
                      label="GST Number (Optional)"
                      name="gstNumber"
                      value={user.gstNumber}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.gstNumber}
                      helperText={errors.gstNumber}
                    />

                    <TextField
                      fullWidth
                      label="PAN Number (Optional)"
                      name="panNumber"
                      value={user.panNumber}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.panNumber}
                      helperText={errors.panNumber}
                    />

                    <TextField
                      fullWidth
                      label="Website (Optional)"
                      name="website"
                      value={user.website}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                    />
                  </div>

                  <Divider className="my-6">
                    <Chip label="Bank Details" size="small" />
                  </Divider>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                      fullWidth
                      label="Bank Account Number"
                      name="bankAccountNumber"
                      value={user.bankAccountNumber}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.bankAccountNumber}
                      helperText={errors.bankAccountNumber}
                    />

                    <TextField
                      fullWidth
                      label="Bank Name"
                      name="bankName"
                      value={user.bankName}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.bankName}
                      helperText={errors.bankName}
                    />

                    <TextField
                      fullWidth
                      label="IFSC Code"
                      name="ifscCode"
                      value={user.ifscCode}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.ifscCode}
                      helperText={errors.ifscCode}
                    />
                  </div>

                  <Divider className="my-6">
                    <Chip label="Business Address" size="small" icon={<LocationOnIcon />} />
                  </Divider>

                  <TextField
                    fullWidth
                    label="Business Address"
                    name="businessAddress"
                    value={user.businessAddress}
                    onChange={handleDataChange}
                    multiline
                    rows={2}
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    className="mb-4"
                    error={!!errors.businessAddress}
                    helperText={errors.businessAddress}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <TextField
                      fullWidth
                      label="City"
                      name="businessCity"
                      value={user.businessCity}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.businessCity}
                      helperText={errors.businessCity}
                    />

                    <TextField
                      fullWidth
                      label="State"
                      name="businessState"
                      value={user.businessState}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.businessState}
                      helperText={errors.businessState}
                    />

                    <TextField
                      fullWidth
                      label="Pincode"
                      name="businessPincode"
                      value={user.businessPincode}
                      onChange={handleDataChange}
                      variant="outlined"
                      InputProps={{ style: { borderRadius: '12px' } }}
                      error={!!errors.businessPincode}
                      helperText={errors.businessPincode}
                    />
                  </div>

                  <TextField
                    fullWidth
                    label="Country"
                    name="businessCountry"
                    value={user.businessCountry}
                    onChange={handleDataChange}
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    className="mt-4"
                    disabled
                  />

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Upload Business Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '10px', textTransform: 'none', height: '50px' }}
                      >
                        {businessLicense ? "License Selected" : "Business License"}
                        <input type="file" name="businessLicense" hidden onChange={handleDataChange} />
                      </Button>

                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '10px', textTransform: 'none', height: '50px' }}
                      >
                        {panDocument ? "PAN Selected" : "PAN Card"}
                        <input type="file" name="panCardDocument" hidden onChange={handleDataChange} />
                      </Button>

                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '10px', textTransform: 'none', height: '50px' }}
                      >
                        {chequeDocument ? "Cheque Selected" : "Cancelled Cheque"}
                        <input type="file" name="cancelledCheque" hidden onChange={handleDataChange} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden border">
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        sx={{ borderRadius: '10px', textTransform: 'none' }}
                      >
                        Profile Photo
                        <input type="file" name="profilePhoto" hidden onChange={handleDataChange} />
                      </Button>
                    </div>
                    <Typography variant="caption" color="textSecondary">
                      Upload your business profile photo
                    </Typography>
                  </div>
                </div>
              )}

              {/* Password Section */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    label="Confirm Password"
                    name="cpassword"
                    type="password"
                    value={user.cpassword}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.cpassword}
                    helperText={errors.cpassword}
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
                  background: accountType === 'seller'
                    ? 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)'
                    : 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  textTransform: 'none',
                  marginTop: '20px'
                }}
              >
                {accountType === 'seller' ? 'Register as Seller' : 'Register'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;