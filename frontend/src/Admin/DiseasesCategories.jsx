import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Card,
    CardContent,
    Typography,
    TablePagination,
    TextField,
    InputAdornment
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    deleteCategory,
    clearErrors
} from "../../actions/categoryAction";

const DiseasesCategories = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Redux states
    const { loading, categories, error } = useSelector((state) => state.categories);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteCategory);

    // Filtered categories based on search term
    const filteredCategories = (categories || []).filter((category) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;

        return (
            String(category.name || '').toLowerCase().includes(term) ||
            String(category.description || '').toLowerCase().includes(term) ||
            String(category.type || '').toLowerCase().includes(term) ||
            String(category.categoryId || '').toLowerCase().includes(term)
        );
    });

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong!",
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        if (deleteError) {
            Swal.fire({
                title: "Failed!",
                text: "Something went wrong!",
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            Swal.fire({
                title: "Success!",
                text: "Disease category deleted successfully!",
                icon: "success",
                timer: 2000,
            });

            dispatch({ type: "DELETE_CATEGORY_RESET" });

            // Refresh list
            dispatch(getCategories());
        }

        dispatch(getCategories());
    }, [dispatch, error, deleteError, isDeleted]);

    const handleEdit = (category) => {
        navigate(`/admin/diseases-categories/edit/${category._id}`);
    };

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
                dispatch(deleteCategory(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5, letterSpacing: '0.5px' }}>
                    Pathogenic Architecture
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                    Classify and manage pathological domains
                </Typography>
            </Box>

            Connection

            <Card sx={{
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(16px)',
                overflow: 'hidden'
            }}>
                <CardContent className="p-6 ">

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                px: 2,
                                py: 0.75,
                                borderRadius: '12px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <Typography variant="body2" sx={{ color: '#60a5fa', fontWeight: 700, fontSize: '13px' }}>
                                    TOTAL AGENTS: {categories?.length || 0}
                                </Typography>
                            </Box>

                            <TextField
                                size="small"
                                placeholder="Search agents..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ fontSize: 20, color: '#64748b' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: '240px',
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

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/diseases-categories/new')}
                            sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '14px',
                                px: 3,
                                py: 1.2,
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                boxShadow: '0 8px 20px -6px rgba(59, 130, 246, 0.5)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    boxShadow: '0 12px 24px -6px rgba(59, 130, 246, 0.6)',
                                }
                            }}
                        >
                            Deploy Agent
                        </Button>
                    </Box>


                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>ID</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Agent Name</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Payload Brief</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#94a3b8', fontSize: '12px', py: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)', textTransform: 'uppercase', letterSpacing: '1px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Loading disease categories...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredCategories?.length > 0 ? (
                                    filteredCategories
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((category) => (
                                            <TableRow
                                                key={category._id}
                                                sx={{
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { background: 'rgba(255, 255, 255, 0.03)' },
                                                    '& td': { borderBottom: '1px solid rgba(255, 255, 255, 0.03)', py: 2 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '12px', color: '#60a5fa', fontFamily: 'monospace', fontWeight: 700 }}>{category.categoryId}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#f8fafc', fontWeight: 700 }}>{category.name}</Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: '6px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', display: 'inline-block' }}>
                                                        <Typography variant="body2" sx={{ fontSize: '11px', color: '#fbbf24', fontWeight: 800 }}>{category.type}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>{category.description}</Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                        <IconButton
                                                            onClick={() => handleEdit(category)}
                                                            size="small"
                                                            sx={{
                                                                color: '#60a5fa',
                                                                background: 'rgba(59, 130, 246, 0.1)',
                                                                '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
                                                            }}
                                                        >
                                                            <EditIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(category._id)}
                                                            size="small"
                                                            sx={{
                                                                color: '#ff4d4d',
                                                                background: 'rgba(255, 77, 77, 0.1)',
                                                                '&:hover': { background: 'rgba(255, 77, 77, 0.2)' }
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: 16 }} />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No disease categories found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredCategories?.length || 0}
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

export default DiseasesCategories;