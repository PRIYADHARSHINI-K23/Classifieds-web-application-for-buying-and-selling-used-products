import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
    Card,
    CardContent,
    TextField,
    MenuItem,
    Button,
    Box,
    Grid,
    Typography,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MetaData from '../Layouts/MetaData';
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';

const UpdateOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    const orderStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
    const paymentStatuses = ["Pending", "Succeeded", "Failed"];

    useEffect(() => {
        if (order && order._id === id) {
            setStatus(order.orderStatus);
            setPaymentStatus(order.paymentInfo?.status || "");
        } else {
            dispatch(getOrderDetails(id));
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Order Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_ORDER_RESET });
            navigate(window.location.pathname.includes('seller') ? "/seller/orders" : "/admin/orders");
        }
    }, [dispatch, error, id, isUpdated, updateError, order, navigate, enqueueSnackbar]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = {
            status: status,
            paymentStatus: paymentStatus
        };

        dispatch(updateOrder(id, myForm));
    };

    const handleCancel = () => {
        navigate('/admin/orders');
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <MetaData title="Order Logistics | Admin" />

            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        color: '#64748b',
                        textTransform: 'none',
                        fontWeight: 700,
                        '&:hover': { color: '#0f172a', background: 'rgba(15, 23, 42, 0.05)' }
                    }}
                >
                    Return
                </Button>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5, letterSpacing: '0.5px' }}>
                        Sequence Modulation
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Adjust logistics state for order {id}
                    </Typography>
                </Box>
            </Box>

            <Card sx={{
                maxWidth: '900px',
                mx: 'auto',
                borderRadius: '32px',
                boxShadow: '0 40px 100px rgba(15, 82, 186, 0.1)',
                border: '1px solid #f1f5f9',
                background: '#ffffff',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <CircularProgress sx={{ color: '#3b82f6' }} />
                        </div>
                    ) : (
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {/* Order Details (Read-Only) */}
                            <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                                <Typography variant="h6" sx={{ color: '#0f172a', mb: 2, fontWeight: 700 }}>Order Summary</Typography>
                                <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                    <strong>Items:</strong> {order && order.orderItems && order.orderItems.map(i => i.name).join(', ')}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                                    <strong>Amount:</strong> ₹{order && order.totalPrice}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#475569' }}>
                                    <strong>User:</strong> {order && order.user && order.user.name}
                                </Typography>
                            </Box>

                            {/* Prescription Verification Link */}
                            {order && order.orderItems && order.orderItems.some(item => item.prescriptionUrl) && (
                                <Box sx={{ p: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', borderRadius: 2, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                    <Typography variant="body2" sx={{ color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <span>Prescription Document Available:</span>
                                        {order.orderItems.map((item, index) => (
                                            item.prescriptionUrl && (
                                                <a
                                                    key={index}
                                                    href={`http://localhost:4000/admin/product/${item.prescriptionUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                                                >
                                                    View Document {index + 1}
                                                </a>
                                            )
                                        ))}
                                    </Typography>
                                </Box>
                            )}
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#64748b', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Logistics Phase (Status)</Typography>
                                    <TextField
                                        fullWidth
                                        select
                                        variant="outlined"
                                        size="small"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a',
                                                '& fieldset': { borderColor: '#e2e8f0' },
                                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                                '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                            },
                                            '& .MuiSvgIcon-root': { color: '#64748b' }
                                        }}
                                    >
                                        {status === "Delivered" ? (
                                            <MenuItem value="Delivered">DELIVERED</MenuItem>
                                        ) : orderStatuses.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s.toUpperCase()}_PROTOCOL
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#64748b', mb: 1, fontSize: '12px', textTransform: 'uppercase' }}>Payment Protocol (Status)</Typography>
                                    <TextField
                                        fullWidth
                                        select
                                        variant="outlined"
                                        size="small"
                                        value={paymentStatus}
                                        onChange={(e) => setPaymentStatus(e.target.value)}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                backgroundColor: '#f8fafc',
                                                color: '#0f172a',
                                                '& fieldset': { borderColor: '#e2e8f0' },
                                                '&:hover fieldset': { borderColor: '#cbd5e1' },
                                                '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                                            },
                                            '& .MuiSvgIcon-root': { color: '#64748b' }
                                        }}
                                    >
                                        {paymentStatuses.map((s) => (
                                            <MenuItem key={s} value={s}>
                                                {s.toUpperCase()}_STATUS
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={loading || status === ""}
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
                                    Execute Phase Update
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
                                        color: '#64748b',
                                        borderColor: '#e2e8f0',
                                        '&:hover': {
                                            borderColor: '#cbd5e1',
                                            background: '#f8fafc'
                                        }
                                    }}
                                >
                                    Terminate Process
                                </Button>
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateOrder;
