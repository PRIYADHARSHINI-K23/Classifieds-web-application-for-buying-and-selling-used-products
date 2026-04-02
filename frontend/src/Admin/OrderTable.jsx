import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Card,
    CardContent,
    Typography,
    TablePagination,
    Box,
    CircularProgress,
    Chip,
    Avatar,
    Paper,
    Fade,
    alpha,
    Tooltip
} from '@mui/material';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Swal from 'sweetalert2';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, clearErrors, deleteOrder } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';

// Status color mapping
const getStatusColor = (status) => {
    switch(status) {
        case 'Delivered':
            return { bg: alpha('#10b981', 0.1), color: '#10b981', border: alpha('#10b981', 0.2) };
        case 'Shipped':
            return { bg: alpha('#f59e0b', 0.1), color: '#f59e0b', border: alpha('#f59e0b', 0.2) };
        case 'Processing':
            return { bg: alpha('#3a5a9c', 0.1), color: '#3a5a9c', border: alpha('#3a5a9c', 0.2) };
        case 'Cancelled':
            return { bg: alpha('#ef4444', 0.1), color: '#ef4444', border: alpha('#ef4444', 0.2) };
        default:
            return { bg: alpha('#64748b', 0.1), color: '#64748b', border: alpha('#64748b', 0.2) };
    }
};

const OrderTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, orders, loading } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('table');

    const filteredOrders = (orders || []).filter((order) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return (
            String(order._id || '').toLowerCase().includes(term) ||
            String(order.orderItems?.map(item => item.name).join(' ') || '').toLowerCase().includes(term) ||
            String(order.orderStatus || '').toLowerCase().includes(term) ||
            String(order.totalPrice || '').includes(term)
        );
    });

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Order Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const handleEdit = (order) => {
        navigate(`/admin/order/${order._id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#94a3b8",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOrder(id));
            }
        });
    };

    // Format order ID for display
    const formatOrderId = (id) => {
        return `#${id.slice(-8).toUpperCase()}`;
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: '#fafbff',
            p: 4
        }}>
            <MetaData title="Orders | Admin Panel" />

            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4
            }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '14px',
                            background: alpha('#3a5a9c', 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ReceiptIcon sx={{ color: '#3a5a9c', fontSize: 28 }} />
                        </Box>
                        <Box>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 800, 
                                    color: '#1a1a2b',
                                    letterSpacing: '-0.5px',
                                    fontSize: '32px'
                                }}
                            >
                                Orders
                            </Typography>
                            <Typography sx={{ color: '#64748b', fontSize: '15px', fontWeight: 500, mt: 0.5 }}>
                                Manage and track all customer orders
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Search and Filter Bar */}
            <Box sx={{ 
                mb: 4,
                display: 'flex',
                gap: 2,
                alignItems: 'center'
            }}>
                <Box sx={{ 
                    flex: 1,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    background: 'white',
                    p: 0.5,
                    borderRadius: '14px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 0.5,
                        p: 0.5,
                        background: '#f1f5f9',
                        borderRadius: '10px'
                    }}>
                        <IconButton 
                            onClick={() => setViewMode('table')}
                            size="small"
                            sx={{ 
                                background: viewMode === 'table' ? 'white' : 'transparent',
                                boxShadow: viewMode === 'table' ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                                borderRadius: '8px',
                                width: 38,
                                height: 38
                            }}
                        >
                            <ViewListIcon sx={{ 
                                fontSize: 22, 
                                color: viewMode === 'table' ? '#3a5a9c' : '#94a3b8' 
                            }} />
                        </IconButton>
                        <IconButton 
                            onClick={() => setViewMode('grid')}
                            size="small"
                            sx={{ 
                                background: viewMode === 'grid' ? 'white' : 'transparent',
                                boxShadow: viewMode === 'grid' ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                                borderRadius: '8px',
                                width: 38,
                                height: 38
                            }}
                        >
                            <GridViewIcon sx={{ 
                                fontSize: 22, 
                                color: viewMode === 'grid' ? '#3a5a9c' : '#94a3b8' 
                            }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ 
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1
                    }}>
                        <SearchIcon sx={{ color: '#94a3b8', fontSize: 22 }} />
                        <input
                            type="text"
                            placeholder="Search orders by ID, items or status..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                            style={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                fontSize: '15px',
                                padding: '10px 0',
                                background: 'transparent'
                            }}
                        />
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        borderColor: '#e2e8f0',
                        color: '#64748b',
                        px: 3,
                        py: 1.2,
                        fontSize: '15px',
                        background: 'white',
                        '&:hover': {
                            borderColor: '#3a5a9c',
                            color: '#3a5a9c',
                            background: 'white'
                        }
                    }}
                >
                    Filter
                </Button>
            </Box>

            {/* Content Area */}
            <Card sx={{
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                border: '1px solid #f0f0f5',
                overflow: 'hidden'
            }}>
                {viewMode === 'table' ? (
                    // Table View
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#f8fafd' }}>
                                        {['Order ID', 'Items', 'Qty', 'Amount', 'Docs', 'Status', 'Actions'].map((head, i) => (
                                            <TableCell
                                                key={i}
                                                align={i === 0 || i > 2 ? "center" : "left"}
                                                sx={{
                                                    fontWeight: 700,
                                                    color: '#64748b',
                                                    fontSize: '14px',
                                                    py: 3,
                                                    borderBottom: '1px solid #edf2f7'
                                                }}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                                <Fade in={loading}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                        <Box sx={{ 
                                                            width: 40, 
                                                            height: 40, 
                                                            borderRadius: '10px',
                                                            border: '3px solid #f1f5f9',
                                                            borderTopColor: '#3a5a9c',
                                                            animation: 'spin 1s linear infinite'
                                                        }} />
                                                        <Typography sx={{ color: '#94a3b8', fontSize: '15px' }}>Loading orders...</Typography>
                                                    </Box>
                                                </Fade>
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredOrders?.length > 0 ? (
                                        filteredOrders
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((order, index) => {
                                                const statusColors = getStatusColor(order.orderStatus);
                                                const totalQty = order.orderItems.reduce((total, item) => total + item.quantity, 0);
                                                
                                                return (
                                                    <TableRow
                                                        key={order._id}
                                                        sx={{
                                                            '&:hover': { 
                                                                background: '#fafbff',
                                                                '& .action-icons': {
                                                                    opacity: 1
                                                                }
                                                            },
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <TableCell align="center">
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '14px', fontFamily: 'monospace' }}>
                                                                    {formatOrderId(order._id)}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '11px', color: '#94a3b8', mt: 0.5 }}>
                                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                                                        day: '2-digit', 
                                                                        month: 'short',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            <Box sx={{ maxWidth: 300 }}>
                                                                {order.orderItems.slice(0, 2).map((item, idx) => (
                                                                    <Typography key={idx} sx={{ 
                                                                        fontSize: '14px', 
                                                                        color: '#1e293b',
                                                                        fontWeight: 500,
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}>
                                                                        • {item.name} x{item.quantity}
                                                                    </Typography>
                                                                ))}
                                                                {order.orderItems.length > 2 && (
                                                                    <Typography sx={{ fontSize: '13px', color: '#94a3b8', mt: 0.5 }}>
                                                                        +{order.orderItems.length - 2} more items
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={totalQty}
                                                                size="small"
                                                                sx={{
                                                                    background: alpha('#3a5a9c', 0.08),
                                                                    color: '#3a5a9c',
                                                                    fontWeight: 700,
                                                                    fontSize: '13px',
                                                                    borderRadius: '8px',
                                                                    minWidth: 40
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Typography sx={{ 
                                                                fontSize: '16px', 
                                                                color: '#1e293b', 
                                                                fontWeight: 700,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: 0.5
                                                            }}>
                                                                <CurrencyRupeeIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                                                {order.totalPrice?.toLocaleString('en-IN')}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'center' }}>
                                                                {order.orderItems.some(item => item.prescriptionUrl) ? (
                                                                    order.orderItems.map((item, index) => (
                                                                        item.prescriptionUrl && (
                                                                            <Tooltip key={index} title="View Prescription">
                                                                                <IconButton
                                                                                    href={`http://localhost:4000/admin/product/${item.prescriptionUrl}`}
                                                                                    target="_blank"
                                                                                    size="small"
                                                                                    sx={{
                                                                                        color: '#3a5a9c',
                                                                                        background: alpha('#3a5a9c', 0.1),
                                                                                        borderRadius: '8px',
                                                                                        width: 32,
                                                                                        height: 32,
                                                                                        '&:hover': {
                                                                                            background: '#3a5a9c',
                                                                                            color: 'white'
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )
                                                                    ))
                                                                ) : (
                                                                    <Typography sx={{ fontSize: '13px', color: '#94a3b8' }}>—</Typography>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={order.orderStatus}
                                                                size="small"
                                                                sx={{
                                                                    background: statusColors.bg,
                                                                    color: statusColors.color,
                                                                    fontWeight: 700,
                                                                    fontSize: '12px',
                                                                    borderRadius: '8px',
                                                                    height: 28,
                                                                    border: `1px solid ${statusColors.border}`
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Box className="action-icons" sx={{ 
                                                                display: 'flex', 
                                                                justifyContent: 'center',
                                                                gap: 1,
                                                                opacity: 0,
                                                                transition: 'opacity 0.2s ease'
                                                            }}>
                                                                <IconButton
                                                                    onClick={() => handleEdit(order)}
                                                                    size="small"
                                                                    sx={{
                                                                        color: '#64748b',
                                                                        background: alpha('#94a3b8', 0.1),
                                                                        borderRadius: '10px',
                                                                        width: 38,
                                                                        height: 38,
                                                                        '&:hover': {
                                                                            background: alpha('#3a5a9c', 0.1),
                                                                            color: '#3a5a9c'
                                                                        }
                                                                    }}
                                                                >
                                                                    <EditIcon sx={{ fontSize: 20 }} />
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => handleDelete(order._id)}
                                                                    size="small"
                                                                    sx={{
                                                                        color: '#64748b',
                                                                        background: alpha('#94a3b8', 0.1),
                                                                        borderRadius: '10px',
                                                                        width: 38,
                                                                        height: 38,
                                                                        '&:hover': {
                                                                            background: alpha('#ef4444', 0.1),
                                                                            color: '#ef4444'
                                                                        }
                                                                    }}
                                                                >
                                                                    <DeleteIcon sx={{ fontSize: 20 }} />
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                    <ReceiptIcon sx={{ fontSize: 60, color: '#e2e8f0' }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '16px' }}>
                                                        No orders found
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={filteredOrders?.length || 0}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                            rowsPerPageOptions={[10, 25, 50]}
                            sx={{
                                borderTop: '1px solid #edf2f7',
                                px: 3,
                                py: 2,
                                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                    fontWeight: 500,
                                    color: '#64748b',
                                    fontSize: '14px'
                                }
                            }}
                        />
                    </>
                ) : (
                    // Grid View
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {filteredOrders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order, index) => {
                                    const statusColors = getStatusColor(order.orderStatus);
                                    const totalQty = order.orderItems.reduce((total, item) => total + item.quantity, 0);
                                    const firstItem = order.orderItems[0];
                                    
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={order._id}>
                                            <Fade in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                                                <Card sx={{
                                                    p: 3,
                                                    borderRadius: '16px',
                                                    border: '1px solid #f0f0f5',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        boxShadow: '0 10px 30px rgba(58, 90, 156, 0.1)',
                                                        borderColor: alpha('#3a5a9c', 0.3),
                                                        transform: 'translateY(-4px)'
                                                    }
                                                }}>
                                                    {/* Header */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, mb: 0.5 }}>
                                                                Order ID
                                                            </Typography>
                                                            <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '15px', fontFamily: 'monospace' }}>
                                                                {formatOrderId(order._id)}
                                                            </Typography>
                                                        </Box>
                                                        <Chip
                                                            label={order.orderStatus}
                                                            size="small"
                                                            sx={{
                                                                background: statusColors.bg,
                                                                color: statusColors.color,
                                                                fontWeight: 700,
                                                                fontSize: '11px',
                                                                borderRadius: '8px',
                                                                height: 24
                                                            }}
                                                        />
                                                    </Box>

                                                    {/* Date */}
                                                    <Typography sx={{ fontSize: '12px', color: '#94a3b8', mb: 2 }}>
                                                        {new Date(order.createdAt).toLocaleDateString('en-IN', { 
                                                            day: '2-digit', 
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </Typography>

                                                    {/* Items Preview */}
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, mb: 1 }}>
                                                            Items ({order.orderItems.length})
                                                        </Typography>
                                                        <Box sx={{ 
                                                            background: '#f8fafc',
                                                            borderRadius: '12px',
                                                            p: 1.5
                                                        }}>
                                                            {order.orderItems.slice(0, 2).map((item, idx) => (
                                                                <Box key={idx} sx={{ 
                                                                    display: 'flex', 
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    mb: idx < order.orderItems.slice(0, 2).length - 1 ? 1 : 0
                                                                }}>
                                                                    <Typography sx={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>
                                                                        {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: '13px', color: '#3a5a9c', fontWeight: 600 }}>
                                                                        x{item.quantity}
                                                                    </Typography>
                                                                </Box>
                                                            ))}
                                                            {order.orderItems.length > 2 && (
                                                                <Typography sx={{ fontSize: '12px', color: '#94a3b8', mt: 1 }}>
                                                                    +{order.orderItems.length - 2} more items
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>

                                                    {/* Footer */}
                                                    <Box sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        pt: 2,
                                                        borderTop: '1px solid #edf2f7'
                                                    }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600, mb: 0.5 }}>
                                                                Total Amount
                                                            </Typography>
                                                            <Typography sx={{ 
                                                                fontSize: '18px', 
                                                                color: '#1e293b', 
                                                                fontWeight: 800,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5
                                                            }}>
                                                                <CurrencyRupeeIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                                                {order.totalPrice?.toLocaleString('en-IN')}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                                            {order.orderItems.some(item => item.prescriptionUrl) && (
                                                                <Tooltip title="Has Prescription">
                                                                    <Avatar sx={{
                                                                        width: 32,
                                                                        height: 32,
                                                                        bgcolor: alpha('#3a5a9c', 0.1),
                                                                        color: '#3a5a9c'
                                                                    }}>
                                                                        <PictureAsPdfIcon sx={{ fontSize: 18 }} />
                                                                    </Avatar>
                                                                </Tooltip>
                                                            )}
                                                            <IconButton
                                                                onClick={() => handleEdit(order)}
                                                                size="small"
                                                                sx={{
                                                                    color: '#64748b',
                                                                    background: alpha('#94a3b8', 0.1),
                                                                    borderRadius: '10px',
                                                                    width: 36,
                                                                    height: 36,
                                                                    '&:hover': {
                                                                        background: alpha('#3a5a9c', 0.1),
                                                                        color: '#3a5a9c'
                                                                    }
                                                                }}
                                                            >
                                                                <EditIcon sx={{ fontSize: 20 }} />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => handleDelete(order._id)}
                                                                size="small"
                                                                sx={{
                                                                    color: '#64748b',
                                                                    background: alpha('#94a3b8', 0.1),
                                                                    borderRadius: '10px',
                                                                    width: 36,
                                                                    height: 36,
                                                                    '&:hover': {
                                                                        background: alpha('#ef4444', 0.1),
                                                                        color: '#ef4444'
                                                                    }
                                                                }}
                                                            >
                                                                <DeleteIcon sx={{ fontSize: 20 }} />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Fade>
                                        </Grid>
                                    );
                                })}
                        </Grid>

                        {filteredOrders?.length === 0 && !loading && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <ReceiptIcon sx={{ fontSize: 60, color: '#e2e8f0', mb: 2 }} />
                                <Typography sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '16px' }}>
                                    No orders found
                                </Typography>
                            </Box>
                        )}

                        {filteredOrders?.length > 0 && (
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <TablePagination
                                    component="div"
                                    count={filteredOrders?.length || 0}
                                    page={page}
                                    onPageChange={(e, newPage) => setPage(newPage)}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={(e) => {
                                        setRowsPerPage(parseInt(e.target.value, 10));
                                        setPage(0);
                                    }}
                                    rowsPerPageOptions={[10, 25, 50]}
                                />
                            </Box>
                        )}
                    </Box>
                )}
            </Card>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default OrderTable;