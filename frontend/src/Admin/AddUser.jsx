import {
    TextField,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup,
    Avatar,
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../utils/sweetAlert';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddUser = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        role: "user",
        password: "",
    });

    const { name, email, phone, address, gender, role, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("preview.png");

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
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            showAlert("Password length must be at least 8 characters", "warning");
            return;
        }

        if (!avatar) {
            Swal.fire({
                title: "Authentication Failed",
                text: "User profile image is required for authorization",
                icon: "error",
                background: '#0f172a',
                color: '#fff',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        Swal.fire({
            title: "Access Granted",
            text: "New user identity encrypted and stored successfully",
            icon: "success",
            background: '#0f172a',
            color: '#fff',
            confirmButtonColor: '#3b82f6',
            timer: 2000,
        });
        navigate("/admin/users");
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <MetaData title="Provision User | Admin" />

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5, letterSpacing: '0.5px' }}>
                    Identity Provisioning
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Register a new entity in the secure database
                </Typography>
            </Box>

            <Card sx={{
                maxWidth: '800px',
                mx: 'auto',
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(16px)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Full Name</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={handleDataChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Email Interface</Typography>
                                <TextField
                                    fullWidth
                                    type="email"
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={handleDataChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Phone Frequency</Typography>
                                <TextField
                                    fullWidth
                                    type="tel"
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="phone"
                                    value={phone}
                                    onChange={handleDataChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Access Layer (Role)</Typography>
                                <TextField
                                    fullWidth
                                    select
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="role"
                                    value={role}
                                    onChange={handleDataChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        },
                                        '& .MuiSvgIcon-root': { color: '#94a3b8' }
                                    }}
                                >
                                    <MenuItem value="user">USER_NODE</MenuItem>
                                    <MenuItem value="admin">ADMIN_PROTOCOL</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Geographical Coordinates (Address)</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="address"
                                    value={address}
                                    onChange={handleDataChange}
                                    multiline
                                    rows={3}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Biometric Sync (Gender)</Typography>
                                <RadioGroup
                                    row
                                    name="gender"
                                    value={gender}
                                    onChange={handleDataChange}
                                    sx={{ color: '#f8fafc' }}
                                >
                                    <FormControlLabel value="male" control={<Radio sx={{ color: '#64748b', '&.Mui-checked': { color: '#3b82f6' } }} required />} label="MALE_BIOTYPE" />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: '#64748b', '&.Mui-checked': { color: '#3b82f6' } }} required />} label="FEMALE_BIOTYPE" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Secure Passkey</Typography>
                                <TextField
                                    fullWidth
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={handleDataChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                            color: '#f8fafc',
                                            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.05)' },
                                            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                                            '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, p: 3, border: '1px dashed rgba(255, 255, 255, 0.1)', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.02)' }}>
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 64, height: 64, border: '2px solid rgba(59, 130, 246, 0.5)', background: 'rgba(0,0,0,0.4)' }}
                                    />
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            color: '#94a3b8',
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': { borderColor: '#3b82f6', color: '#f8fafc', background: 'rgba(59, 130, 246, 0.05)' }
                                        }}
                                    >
                                        Upload Identity Core (Avatar)
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                            hidden
                                        />
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontWeight: 800,
                                            fontSize: '15px',
                                            py: 1.8,
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                            boxShadow: '0 8px 25px -5px rgba(59, 130, 246, 0.5)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                                boxShadow: '0 12px 30px -5px rgba(59, 130, 246, 0.6)',
                                            }
                                        }}
                                    >
                                        Deploy Entity (Add User)
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/admin/users")}
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            py: 1.8,
                                            color: '#94a3b8',
                                            borderColor: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': {
                                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                                background: 'rgba(255, 255, 255, 0.03)'
                                            }
                                        }}
                                    >
                                        Abort Protocol (Cancel)
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddUser;