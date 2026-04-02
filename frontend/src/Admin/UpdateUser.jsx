import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Box,
    Grid,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MetaData from '../Layouts/MetaData';
import Swal from 'sweetalert2'




const UpdateUser = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    const [userForm, setUserForm] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        gender: 'male',
        role: 'user',
        phone: '+91 9876543210',
        address: '123 Main Street, City, State - 12345'
    });

    const roles = ["user", "admin"];

    // -----------------------------------------
    // Handle Submit
    // -----------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!userForm.name.trim()) {
            enqueueSnackbar("User name is required", { variant: "error" });
            return;
        }

        if (!userForm.email.trim()) {
            enqueueSnackbar("Email is required", { variant: "error" });
            return;
        }

        // Simulate API call
        // enqueueSnackbar("User profile updated successfully!", { variant: "success" });

        Swal.fire({
            title: "Success!",
            text: "User updated successfully!",
            icon: "success",
            timer: 2000,
        });
        navigate("/admin/users");
    };

    const handleCancel = () => {
        navigate('/admin/users');
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <MetaData title="Identity Sync | Admin" />

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        color: '#94a3b8',
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': { color: '#f8fafc', background: 'rgba(255,255,255,0.05)' }
                    }}
                >
                    Return
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5, letterSpacing: '0.5px' }}>
                        Biometric Modulation
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                        Adjust core identity parameters for node {id}
                    </Typography>
                </Box>
            </Box>

            <Card sx={{
                maxWidth: '900px',
                mx: 'auto',
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(16px)',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Identity Name</Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    value={userForm.name}
                                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
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
                                    value={userForm.email}
                                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
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
                                    variant="outlined"
                                    size="small"
                                    value={userForm.phone}
                                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
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
                                    value={userForm.role}
                                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
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
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role.toUpperCase()}_PROTOCOL
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Biometric Type (Gender)</Typography>
                                <RadioGroup
                                    row
                                    value={userForm.gender}
                                    onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
                                    sx={{ color: '#f8fafc' }}
                                >
                                    <FormControlLabel value="male" control={<Radio sx={{ color: '#64748b', '&.Mui-checked': { color: '#3b82f6' } }} />} label="MALE_BIOTYPE" />
                                    <FormControlLabel value="female" control={<Radio sx={{ color: '#64748b', '&.Mui-checked': { color: '#3b82f6' } }} />} label="FEMALE_BIOTYPE" />
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#94a3b8', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Landing Coordinates (Address)</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    size="small"
                                    value={userForm.address}
                                    onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
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
                        </Grid>

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
                                Execute Profile Sync
                            </Button>
                            <Button
                                onClick={handleCancel}
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
                                Terminate Process
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateUser;
