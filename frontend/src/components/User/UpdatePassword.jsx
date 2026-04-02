import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import FormSidebar from './FormSidebar';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password Doesn't Match", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);
        formData.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(formData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Password Updated Successfully", { variant: "success" });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Modify Security Token | Quantum Pharmacy" />

            {loading && <BackdropLoader />}
            <main className="min-h-screen bg-[#020617] flex items-center justify-center py-12 px-4 relative overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />

                <div className="w-full max-w-lg relative z-10">
                    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/5 overflow-hidden p-8 sm:p-12 transition-all duration-500 hover:border-blue-500/20">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-inner mb-6 group">
                                <span className="text-4xl group-hover:scale-110 transition-transform duration-500">🛡️</span>
                            </div>
                            <h1 className="text-3xl font-black text-slate-50 tracking-tight mb-3">Security Update</h1>
                            <p className="text-slate-400 font-medium">Rotate your access credentials</p>
                        </div>

                        <form onSubmit={updatePasswordSubmitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Legacy Token</label>
                                <TextField
                                    fullWidth
                                    type="password"
                                    placeholder="Enter current token..."
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">New Security Token</label>
                                <TextField
                                    fullWidth
                                    type="password"
                                    placeholder="Minimum 8 characters..."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' }
                                        }
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Confirm New Token</label>
                                <TextField
                                    fullWidth
                                    type="password"
                                    placeholder="Retype new token..."
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' }
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-4 pt-6">
                                <button type="submit" className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] transition-all duration-300 active:scale-[0.98]">
                                    {loading ? 'Processing...' : 'Verify & Rotate'}
                                </button>
                                <Link to="/account" className="w-full bg-white/5 hover:bg-white/10 text-slate-100 text-center py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/5 transition-all duration-300">
                                    Abort
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UpdatePassword