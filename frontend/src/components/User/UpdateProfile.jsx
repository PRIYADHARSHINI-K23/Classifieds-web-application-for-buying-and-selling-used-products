import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const handleDocChange = (e, setDoc) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === 2) {
            setDoc(reader.result);
        }
    };
    if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
    }
}

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");  // Added phone state
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    // Professional Details State
    const [address, setAddress] = useState("");
    const [clinicname, setClinicname] = useState("");
    const [clinicid, setClinicid] = useState("");
    const [qualification, setQualification] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [medicalCouncil, setMedicalCouncil] = useState("");
    const [experience, setExperience] = useState("");

    const [registrationCertificate, setRegistrationCertificate] = useState("");
    const [doctorIdProof, setDoctorIdProof] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const updateProfileHandler = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            phone, // Added phone to payload
            gender,
            avatar, // Base64 string
            // Professional Details
            address,
            clinicname,
            clinicid,
            qualification,
            specialization,
            registrationNumber,
            medicalCouncilName: medicalCouncil, // Map state 'medicalCouncil' to backend 'medicalCouncilName'
            yearsOfExperience: experience,      // Map state 'experience' to backend 'yearsOfExperience'

            // Doctor Documents (Base64 strings)
            registrationCertificate,
            doctorIdProof,
            profilePhoto
        };

        dispatch(updateProfile(userData));
    }

    const handleUpdateDataChange = (e) => {
        const reader = new FileReader();
        const name = e.target.name;

        reader.onload = () => {
            if (reader.readyState === 2) {
                if (name === "avatar") {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                } else if (name === "registrationCertificate") {
                    setRegistrationCertificate(reader.result);
                } else if (name === "doctorIdProof") {
                    setDoctorIdProof(reader.result);
                } else if (name === "profilePhoto") { // In case we add this later or use it
                    setProfilePhoto(reader.result);
                }
            }
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || ""); // Initialize phone
            setGender(user.gender);
            setAvatarPreview(user.avatar?.url);

            // Sync Professional Details
            setAddress(user.address || "");
            setClinicname(user.clinicname || "");
            setClinicid(user.clinicid || "");
            setQualification(user.qualification || "");
            setSpecialization(user.specialization || "");
            setRegistrationNumber(user.registrationNumber || "");
            setMedicalCouncil(user.medicalCouncilName || "");
            setExperience(user.yearsOfExperience || "");
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, error, user, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Modify Clinical Profile | Quick Buy" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-slate-50 pt-32 pb-20 relative overflow-hidden">
                {/* Premium Medical Mesh Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute top-0 left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-float-1"></div>
                    <div className="absolute bottom-0 right-[-10%] w-[70%] h-[70%] bg-blue-400/10 blur-[180px] rounded-full animate-float-2"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-blue-100 overflow-hidden p-10 md:p-12 transition-all duration-700">
                        <div className="flex flex-col items-center mb-10 gap-3">
                            <div className="w-16 h-1.5 bg-blue-600 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 uppercase tracking-tight text-center leading-none">
                                Edit <span className="text-blue-600">Profile</span>
                            </h2>
                            <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest">Update your personal details</p>
                        </div>

                        <form onSubmit={updateProfileHandler} className="space-y-8">


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' },
                                        '& .MuiInputLabel-root': { fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '10px' }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Mobile Number"
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' }
                                    }}
                                />
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest ml-2">Gender</p>
                                <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)} className="flex gap-8 px-2">
                                    <FormControlLabel value="male" control={<Radio sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#0f52ba' } }} />} label={<span className="text-blue-950 font-bold uppercase text-[10px] tracking-wider">Male</span>} />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: 'rgba(15,82,186,0.2)', '&.Mui-checked': { color: '#0f52ba' } }} />} label={<span className="text-blue-950 font-bold uppercase text-[10px] tracking-wider">Female</span>} />
                                </RadioGroup>
                            </div>

                            {user.role && user.role.toLowerCase().includes("doctor") && (
                                <div className="pt-8 border-t border-blue-50 space-y-8 animate-fade-in-up">
                                    <h3 className="text-lg font-bold text-blue-950 uppercase tracking-tight flex items-center gap-3">
                                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                                        Professional Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-950">
                                        <TextField fullWidth label="Medical Council Name" value={medicalCouncil} onChange={(e) => setMedicalCouncil(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                        <TextField fullWidth label="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                        <TextField fullWidth label="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                        <TextField fullWidth label="Registration Number" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                        <TextField fullWidth label="Experience (Years)" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                        <TextField fullWidth label="Clinic Name" value={clinicname} onChange={(e) => setClinicname(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />
                                    </div>
                                    <TextField fullWidth multiline rows={2} label="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '1.2rem', bgcolor: 'rgba(240,247,255,0.5)', fontWeight: '600' } }} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest ml-2">Medical Certificate</label>
                                            <input
                                                type="file"
                                                name="registrationCertificate"
                                                accept="image/*,application/pdf"
                                                onChange={handleUpdateDataChange}
                                                className="block w-full text-xs text-slate-500
                                                file:mr-3 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-[10px] file:font-bold file:uppercase file:tracking-wider
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100 transition-all"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-bold text-blue-900/40 uppercase tracking-widest ml-2">ID Proof</label>
                                            <input
                                                type="file"
                                                name="doctorIdProof"
                                                accept="image/*,application/pdf"
                                                onChange={handleUpdateDataChange}
                                                className="block w-full text-xs text-slate-500
                                                file:mr-3 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-[10px] file:font-bold file:uppercase file:tracking-wider
                                                file:bg-teal-50 file:text-teal-700
                                                hover:file:bg-teal-100 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 pt-8">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-blue-600/20 hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-500 active:scale-95"
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                                <Link to="/account" className="flex-1 bg-white border border-blue-100 text-blue-900/60 text-center py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all duration-500">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdateProfile;