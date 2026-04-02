import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Card,
    CardContent,
    Typography,
    TextField,
    TablePagination
} from '@mui/material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { clearErrors, deleteReview, getAllReviews } from '../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import Swal from 'sweetalert2';

const ReviewsTable = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [productId, setProductId] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { reviews, error } = useSelector((state) => state.reviews);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.review);

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, error, deleteError, isDeleted, productId, enqueueSnackbar]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteReview(id, productId));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <MetaData title="Nodal Feedback | Aayushi Health" />

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5, letterSpacing: '0.5px' }}>
                    Feedback Matrix
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Monitor and moderate user-generated product insights
                </Typography>
            </Box>

            <Card sx={{
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(16px)',
                overflow: 'hidden'
            }}>
                <CardContent className="p-6">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box sx={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            px: 2,
                            py: 0.75,
                            borderRadius: '12px',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                            <Typography variant="body2" sx={{ color: '#60a5fa', fontWeight: 700, fontSize: '13px' }}>
                                TOTAL ENTRIES: {reviews?.length || 0}
                            </Typography>
                        </Box>

                        <TextField
                            size="small"
                            placeholder="Terminal: Enter Product UUID..."
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            sx={{
                                width: '280px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    fontSize: '13px',
                                    color: '#f8fafc',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3b82f6',
                                    }
                                }
                            }}
                        />
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>ID</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>User</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Rating</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Comment</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Loading reviews...
                                        </TableCell>
                                    </TableRow>
                                ) : reviews?.length > 0 ? (
                                    reviews
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((review) => (
                                            <TableRow
                                                key={review._id}
                                                sx={{
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { background: 'rgba(255, 255, 255, 0.03)' },
                                                    '& td': { borderBottom: '1px solid rgba(255, 255, 255, 0.03)', py: 2 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>{review._id}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{review.name}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Rating readOnly value={review.rating} size="small" precision={0.5} sx={{ color: '#fbbf24' }} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>"{review.comment}"</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleDelete(review._id)}
                                                        sx={{
                                                            color: '#ff4d4d',
                                                            background: 'rgba(255, 77, 77, 0.1)',
                                                            '&:hover': { background: 'rgba(255, 77, 77, 0.2)' }
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: 18 }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            {productId ? "No reviews found for this product." : "Enter a Product ID to view reviews."}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={reviews?.length || 0}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        sx={{
                            color: '#94a3b8',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                            '& .MuiTablePagination-selectIcon': { color: '#94a3b8' },
                            '& .MuiTablePagination-actions': { color: '#94a3b8' },
                            mt: 2
                        }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default ReviewsTable;