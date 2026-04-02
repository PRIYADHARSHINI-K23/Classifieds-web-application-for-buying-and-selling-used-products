import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Card,
    CardContent,
    Typography,
    TablePagination,
    TextField,
    InputAdornment,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    MenuItem,
    Select,
    FormControl,
    Chip,
    Avatar,
    Paper,
    Fade,
    alpha
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from '../Layouts/MetaData';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import LayersIcon from '@mui/icons-material/Layers';

import { useDispatch, useSelector } from "react-redux";
import {
    getAdminSubCategories,
    deleteSubCategory,
    createSubCategory,
    updateSubCategory,
    clearErrors
} from "../../actions/subCategoryAction";
import { getCategories } from "../../actions/categoryAction";
import { DELETE_SUBCATEGORY_RESET, NEW_SUBCATEGORY_RESET, UPDATE_SUBCATEGORY_RESET } from "../../constants/subCategoryConstants";

const SubCategories = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('table');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    // Form states
    const [subCategoryForm, setSubCategoryForm] = useState({
        name: '',
        category: '',
        description: ''
    });

    const [validation, setValidation] = useState({});

    const { loading, subCategories, error } = useSelector((state) => state.subCategories);
    const { error: deleteError, isDeleted, isUpdated, error: updateError } = useSelector((state) => state.subCategory);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newSubCategory);
    const { categories } = useSelector((state) => state.categories);

    const filteredSubCategories = (subCategories || []).filter((sub) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return (
            String(sub.name || '').toLowerCase().includes(term) ||
            String(sub.category?.name || '').toLowerCase().includes(term) ||
            String(sub.description || '').toLowerCase().includes(term)
        );
    });

    useEffect(() => {
        if (error) {
            Swal.fire({
                title: "Failed!",
                text: error,
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        if (deleteError) {
            Swal.fire({
                title: "Failed!",
                text: deleteError,
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        if (isDeleted) {
            Swal.fire({
                title: "Success!",
                text: "Sub-category deleted successfully!",
                icon: "success",
                timer: 2000,
            });
            dispatch({ type: DELETE_SUBCATEGORY_RESET });
            dispatch(getAdminSubCategories());
        }

        if (createSuccess) {
            Swal.fire({
                title: "Success!",
                text: "Sub-category created successfully!",
                icon: "success",
                timer: 2000,
            });
            dispatch({ type: NEW_SUBCATEGORY_RESET });
            dispatch(getAdminSubCategories());
            handleCloseAddModal();
        }

        if (createError) {
            Swal.fire({
                title: "Failed!",
                text: createError,
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        if (isUpdated) {
            Swal.fire({
                title: "Success!",
                text: "Sub-category updated successfully!",
                icon: "success",
                timer: 2000,
            });
            dispatch({ type: UPDATE_SUBCATEGORY_RESET });
            dispatch(getAdminSubCategories());
            handleCloseEditModal();
        }

        if (updateError) {
            Swal.fire({
                title: "Failed!",
                text: updateError,
                icon: "error",
                timer: 2000,
            });
            dispatch(clearErrors());
        }

        dispatch(getAdminSubCategories());
        dispatch(getCategories());
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setSubCategoryForm({ name: '', category: '', description: '' });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setSubCategoryForm({ name: '', category: '', description: '' });
        setValidation({});
    };

    const handleOpenEditModal = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSubCategoryForm({
            name: subCategory.name || '',
            category: subCategory.category?._id || '',
            description: subCategory.description || ''
        });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedSubCategory(null);
        setSubCategoryForm({ name: '', category: '', description: '' });
        setValidation({});
    };

    const validateForm = () => {
        const errors = {};
        if (!subCategoryForm.name.trim()) {
            errors.name = "Sub-category name is required";
        }
        if (!subCategoryForm.category) {
            errors.category = "Category is required";
        }
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            name: subCategoryForm.name,
            category: subCategoryForm.category,
            description: subCategoryForm.description,
        };

        dispatch(createSubCategory(formData));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(updateSubCategory(selectedSubCategory._id, subCategoryForm));
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
            cancelButtonText: "Cancel",
            background: '#1e293b',
            color: '#fff',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteSubCategory(id));
            }
        });
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: '#fafbff',
            p: 4
        }}>
            <MetaData title="Sub-Categories | Admin Panel" />

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
                            width: 44,
                            height: 44,
                            borderRadius: '14px',
                            background: alpha('#3a5a9c', 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <LayersIcon sx={{ color: '#3a5a9c', fontSize: 24 }} />
                        </Box>
                        <Box>
                            <Typography 
                                variant="h4" 
                                sx={{ 
                                    fontWeight: 800, 
                                    color: '#1a1a2b',
                                    letterSpacing: '-0.5px',
                                }}
                            >
                                Sub-Categories
                            </Typography>
                            <Typography sx={{ color: '#64748b', fontSize: '14px', fontWeight: 500, mt: 0.5 }}>
                                Manage your sub-categories under main categories
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{
                        borderRadius: '12px',
                        textTransform: 'none',
                        background: '#3a5a9c',
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '14px',
                        boxShadow: '0 4px 12px rgba(58, 90, 156, 0.25)',
                        '&:hover': {
                            background: '#2e4a8c',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(58, 90, 156, 0.35)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    Add Sub-Category
                </Button>
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
                                width: 36,
                                height: 36
                            }}
                        >
                            <ViewListIcon sx={{ 
                                fontSize: 20, 
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
                                width: 36,
                                height: 36
                            }}
                        >
                            <GridViewIcon sx={{ 
                                fontSize: 20, 
                                color: viewMode === 'grid' ? '#3a5a9c' : '#94a3b8' 
                            }} />
                        </IconButton>
                    </Box>

                    <TextField
                        fullWidth
                        placeholder="Search sub-categories by name, category or description..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                            sx: {
                                fontSize: '14px',
                                '& .MuiInputBase-input': {
                                    py: 1.2
                                }
                            }
                        }}
                    />
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
                                        {['S.No', 'Sub-Category', 'Category', 'Description', 'Actions'].map((head, i) => (
                                            <TableCell
                                                key={i}
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#64748b',
                                                    fontSize: '13px',
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
                                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
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
                                                        <Typography sx={{ color: '#94a3b8' }}>Loading sub-categories...</Typography>
                                                    </Box>
                                                </Fade>
                                            </TableCell>
                                        </TableRow>
                                    ) : filteredSubCategories?.length > 0 ? (
                                        filteredSubCategories
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((sub, index) => (
                                                <TableRow
                                                    key={sub._id}
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
                                                    <TableCell>
                                                        <Typography sx={{ fontWeight: 500, color: '#64748b', fontSize: '14px' }}>
                                                            {(page * rowsPerPage + index + 1).toString().padStart(2, '0')}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                            <Avatar sx={{
                                                                width: 42,
                                                                height: 42,
                                                                borderRadius: '12px',
                                                                background: alpha('#3a5a9c', 0.1),
                                                                color: '#3a5a9c',
                                                                fontWeight: 600,
                                                                fontSize: '16px'
                                                            }}>
                                                                {sub.name?.[0]?.toUpperCase()}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>
                                                                    {sub.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '12px', color: '#94a3b8', mt: 0.5 }}>
                                                                    ID: {sub._id?.slice(-8)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            icon={<FolderSpecialIcon sx={{ fontSize: 14 }} />}
                                                            label={sub.category?.name || 'Uncategorized'}
                                                            size="small"
                                                            sx={{
                                                                background: alpha('#3a5a9c', 0.08),
                                                                color: '#3a5a9c',
                                                                fontWeight: 600,
                                                                fontSize: '12px',
                                                                borderRadius: '8px',
                                                                height: 28
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography sx={{ 
                                                            color: '#64748b', 
                                                            fontSize: '14px',
                                                            maxWidth: 280,
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            {sub.description || '—'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box className="action-icons" sx={{ 
                                                            display: 'flex', 
                                                            gap: 1,
                                                            opacity: 0,
                                                            transition: 'opacity 0.2s ease'
                                                        }}>
                                                            <IconButton
                                                                onClick={() => handleOpenEditModal(sub)}
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
                                                                <EditIcon sx={{ fontSize: 18 }} />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => handleDelete(sub._id)}
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
                                                                <DeleteIcon sx={{ fontSize: 18 }} />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                    <LayersIcon sx={{ fontSize: 48, color: '#e2e8f0' }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                                        No sub-categories found
                                                    </Typography>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}
                                                        onClick={handleOpenAddModal}
                                                        sx={{ 
                                                            borderRadius: '10px', 
                                                            borderColor: alpha('#3a5a9c', 0.3),
                                                            color: '#3a5a9c',
                                                            textTransform: 'none'
                                                        }}
                                                    >
                                                        Add your first sub-category
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={filteredSubCategories?.length || 0}
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
                                    fontSize: '13px'
                                }
                            }}
                        />
                    </>
                ) : (
                    // Grid View
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {filteredSubCategories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((sub, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={sub._id}>
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
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <Avatar sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: '14px',
                                                        background: alpha('#3a5a9c', 0.1),
                                                        color: '#3a5a9c',
                                                        fontWeight: 600,
                                                        fontSize: '18px'
                                                    }}>
                                                        {sub.name?.[0]?.toUpperCase()}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '15px', mb: 0.5 }}>
                                                            {sub.name}
                                                        </Typography>
                                                        <Chip
                                                            icon={<SubdirectoryArrowRightIcon sx={{ fontSize: 12 }} />}
                                                            label={sub.category?.name || 'Uncategorized'}
                                                            size="small"
                                                            sx={{
                                                                background: alpha('#3a5a9c', 0.08),
                                                                color: '#3a5a9c',
                                                                fontSize: '11px',
                                                                fontWeight: 600,
                                                                borderRadius: '6px',
                                                                height: 22
                                                            }}
                                                        />
                                                    </Box>
                                                    <IconButton size="small">
                                                        <MoreHorizIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                                                    </IconButton>
                                                </Box>

                                                <Typography sx={{ 
                                                    color: '#64748b', 
                                                    fontSize: '13px',
                                                    mb: 3,
                                                    minHeight: 40,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {sub.description || 'No description available'}
                                                </Typography>

                                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleOpenEditModal(sub)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            borderColor: '#e2e8f0',
                                                            color: '#64748b',
                                                            textTransform: 'none',
                                                            fontSize: '13px',
                                                            py: 1,
                                                            '&:hover': {
                                                                borderColor: '#3a5a9c',
                                                                color: '#3a5a9c',
                                                                background: alpha('#3a5a9c', 0.02)
                                                            }
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleDelete(sub._id)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            borderColor: '#e2e8f0',
                                                            color: '#64748b',
                                                            textTransform: 'none',
                                                            fontSize: '13px',
                                                            py: 1,
                                                            '&:hover': {
                                                                borderColor: '#ef4444',
                                                                color: '#ef4444',
                                                                background: alpha('#ef4444', 0.02)
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </Card>
                                        </Fade>
                                    </Grid>
                                ))}
                        </Grid>

                        {filteredSubCategories?.length === 0 && !loading && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <LayersIcon sx={{ fontSize: 60, color: '#e2e8f0', mb: 2 }} />
                                <Typography sx={{ color: '#94a3b8', fontWeight: 500, mb: 2 }}>
                                    No sub-categories found
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenAddModal}
                                    sx={{ 
                                        borderRadius: '10px', 
                                        borderColor: alpha('#3a5a9c', 0.3),
                                        color: '#3a5a9c',
                                        textTransform: 'none'
                                    }}
                                >
                                    Add your first sub-category
                                </Button>
                            </Box>
                        )}

                        {filteredSubCategories?.length > 0 && (
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <TablePagination
                                    component="div"
                                    count={filteredSubCategories?.length || 0}
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

            {/* Add/Edit Modal */}
            <Dialog
                open={openAddModal || openEditModal}
                onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(58, 90, 156, 0.15)',
                        p: 2
                    }
                }}
            >
                <DialogTitle sx={{ p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '12px',
                                background: alpha('#3a5a9c', 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {openAddModal ? 
                                    <AddIcon sx={{ color: '#3a5a9c' }} /> : 
                                    <EditIcon sx={{ color: '#3a5a9c' }} />
                                }
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#3a5a9c', mb: 0.5 }}>
                                    {openAddModal ? 'New Sub-Category' : 'Edit Sub-Category'}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    {openAddModal ? 'Add Sub-Category' : 'Update Sub-Category'}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ px: 3, py: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                Sub-Category Name <span style={{ color: '#ef4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter sub-category name"
                                value={subCategoryForm.name}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSubCategoryForm({ ...subCategoryForm, name: val });
                                    if (val.trim() && validation.name) {
                                        const newValidation = { ...validation };
                                        delete newValidation.name;
                                        setValidation(newValidation);
                                    }
                                }}
                                error={!!validation.name}
                                helperText={validation.name}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: '#f8fafc',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3a5a9c'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                Category <span style={{ color: '#ef4444' }}>*</span>
                            </Typography>
                            <FormControl fullWidth error={!!validation.category} size="small">
                                <Select
                                    value={subCategoryForm.category}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSubCategoryForm({ ...subCategoryForm, category: val });
                                        if (val && validation.category) {
                                            const newValidation = { ...validation };
                                            delete newValidation.category;
                                            setValidation(newValidation);
                                        }
                                    }}
                                    displayEmpty
                                    sx={{
                                        borderRadius: '12px',
                                        background: '#f8fafc',
                                        '& .MuiOutlinedInput-notchedOutline': { 
                                            borderColor: validation.category ? '#ef4444' : '#e2e8f0'
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled>Select a category</MenuItem>
                                    {categories?.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FolderSpecialIcon sx={{ fontSize: 18, color: '#3a5a9c' }} />
                                                <Typography>{cat.name}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {validation.category && (
                                    <Typography sx={{ color: '#ef4444', fontSize: '12px', mt: 0.5, ml: 1 }}>
                                        {validation.category}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                Description
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Enter sub-category description"
                                value={subCategoryForm.description}
                                onChange={(e) => setSubCategoryForm({ ...subCategoryForm, description: e.target.value })}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        background: '#f8fafc',
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3a5a9c'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 2, gap: 1.5 }}>
                    <Button
                        onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                        sx={{
                            borderRadius: '10px',
                            color: '#64748b',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={openAddModal ? handleAddSubmit : handleEditSubmit}
                        sx={{
                            borderRadius: '10px',
                            background: '#3a5a9c',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            boxShadow: '0 4px 12px rgba(58, 90, 156, 0.25)',
                            '&:hover': {
                                background: '#2e4a8c'
                            }
                        }}
                    >
                        {openAddModal ? 'Create' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default SubCategories;