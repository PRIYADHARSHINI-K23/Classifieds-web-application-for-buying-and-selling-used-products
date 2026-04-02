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
    Chip,
    Avatar,
    Fade,
    alpha,
    Grid,
    CircularProgress,
    Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MetaData from '../Layouts/MetaData';
import CloseIcon from '@mui/icons-material/Close';
import CategoryIcon from '@mui/icons-material/Category';
import FolderIcon from '@mui/icons-material/Folder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    deleteCategory,
    createCategory,
    updateCategory,
    getCategoryDetails,
    clearErrors
} from "../../actions/categoryAction";
import { NEW_CATEGORY_RESET, UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";

const Categories = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('table');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Form states
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        description: ''
    });

    const [validation, setValidation] = useState({});

    const { loading, categories, error } = useSelector((state) => state.categories);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteCategory);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newCategory);
    const { isUpdated, error: updateError } = useSelector((state) => state.updateCategory);

    // Initial fetch
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    // Filter categories based on search term
    const filteredCategories = (categories || []).filter((category) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;

        return (
            String(category.name || '').toLowerCase().includes(term) ||
            String(category.description || '').toLowerCase().includes(term) ||
            String(category._id || '').toLowerCase().includes(term)
        );
    });

    // Handle success/error notifications
    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error || "Something went wrong!", icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (deleteError) {
            Swal.fire({ title: "Failed!", text: deleteError || "Something went wrong!", icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Category deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: "DELETE_CATEGORY_RESET" });
            dispatch(getCategories());
        }
        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Category created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_CATEGORY_RESET });
            dispatch(getCategories());
            handleCloseAddModal();
        }
        if (createError) {
            Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Category updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_CATEGORY_RESET });
            dispatch(getCategories());
            handleCloseEditModal();
        }
        if (updateError) {
            Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setCategoryForm({ name: '', description: '' });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setCategoryForm({ name: '', description: '' });
        setValidation({});
    };

    const handleOpenEditModal = (category) => {
        setSelectedCategory(category);
        setCategoryForm({
            name: category.name || '',
            description: category.description || ''
        });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedCategory(null);
        setCategoryForm({ name: '', description: '' });
        setValidation({});
    };

    const validateForm = () => {
        const errors = {};
        if (!categoryForm.name.trim()) {
            errors.name = "Category name is required";
        } else if (categoryForm.name.length < 2) {
            errors.name = "Category name must be at least 2 characters";
        } else if (categoryForm.name.length > 50) {
            errors.name = "Category name must be less than 50 characters";
        }
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            name: categoryForm.name.trim(),
            description: categoryForm.description.trim(),
        };

        dispatch(createCategory(formData));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(updateCategory(selectedCategory._id, {
            name: categoryForm.name.trim(),
            description: categoryForm.description.trim(),
        }));
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
                dispatch(deleteCategory(id));
            }
        });
    };

    // Helper function to safely get product count
    const getProductCount = (category) => {
        return category.productCount !== undefined ? category.productCount : 
               category.products ? category.products.length : 0;
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: '#fafbff',
            p: 4
        }}>
            <MetaData title="Categories | Admin Panel" />

            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Box>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontWeight: 800, 
                            color: '#1a1a2b',
                            letterSpacing: '-0.5px',
                            mb: 1
                        }}
                    >
                        Categories
                    </Typography>
                    <Typography sx={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>
                        Manage your product categories • Total: {filteredCategories.length} categories
                    </Typography>
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
                    Add Category
                </Button>
            </Box>

            {/* Search and Filter Bar */}
            <Box sx={{ 
                mb: 4,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap'
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
                        placeholder="Search categories by name, description or ID..."
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
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
                        <CircularProgress sx={{ color: '#3a5a9c' }} />
                    </Box>
                ) : viewMode === 'table' ? (
                    // Table View
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: '#f8fafd' }}>
                                        {['S.No', 'Category Name', 'Description', 'Products', 'Created', 'Actions'].map((head, i) => (
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
                                    {filteredCategories?.length > 0 ? (
                                        filteredCategories
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((category, index) => (
                                                <TableRow
                                                    key={category._id}
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
                                                                {category.name?.[0]?.toUpperCase()}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '14px' }}>
                                                                    {category.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '12px', color: '#94a3b8', mt: 0.5 }}>
                                                                    ID: {category._id?.slice(-8)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
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
                                                            {category.description || '—'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title={`${getProductCount(category)} products in this category`}>
                                                            <Chip
                                                                icon={<ShoppingBagIcon sx={{ fontSize: 14 }} />}
                                                                label={getProductCount(category)}
                                                                size="small"
                                                                sx={{
                                                                    background: getProductCount(category) > 0 
                                                                        ? alpha('#3a5a9c', 0.1)
                                                                        : alpha('#94a3b8', 0.1),
                                                                    color: getProductCount(category) > 0 
                                                                        ? '#3a5a9c' 
                                                                        : '#64748b',
                                                                    fontWeight: 600,
                                                                    fontSize: '12px',
                                                                    borderRadius: '8px',
                                                                    '& .MuiChip-icon': {
                                                                        color: getProductCount(category) > 0 ? '#3a5a9c' : '#94a3b8'
                                                                    }
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography sx={{ fontSize: '13px', color: '#64748b' }}>
                                                            {new Date(category.createdAt).toLocaleDateString('en-IN', { 
                                                                day: '2-digit', 
                                                                month: 'short', 
                                                                year: 'numeric' 
                                                            })}
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
                                                                onClick={() => handleOpenEditModal(category)}
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
                                                                onClick={() => handleDelete(category._id)}
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
                                            <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                    <CategoryIcon sx={{ fontSize: 48, color: '#e2e8f0' }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 500 }}>
                                                        {searchTerm ? 'No matching categories found' : 'No categories found'}
                                                    </Typography>
                                                    {!searchTerm && (
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
                                                            Add your first category
                                                        </Button>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {filteredCategories?.length > 0 && (
                            <TablePagination
                                component="div"
                                count={filteredCategories?.length || 0}
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
                        )}
                    </>
                ) : (
                    // Grid View
                    <Box sx={{ p: 4 }}>
                        <Grid container spacing={3}>
                            {filteredCategories
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((category, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
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
                                                        {category.name?.[0]?.toUpperCase()}
                                                    </Avatar>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '15px', mb: 0.5 }}>
                                                            {category.name}
                                                        </Typography>
                                                        <Chip
                                                            icon={<ShoppingBagIcon sx={{ fontSize: 12 }} />}
                                                            label={`${getProductCount(category)} ${getProductCount(category) === 1 ? 'product' : 'products'}`}
                                                            size="small"
                                                            sx={{
                                                                background: getProductCount(category) > 0 
                                                                    ? alpha('#3a5a9c', 0.1)
                                                                    : alpha('#94a3b8', 0.1),
                                                                color: getProductCount(category) > 0 
                                                                    ? '#3a5a9c' 
                                                                    : '#64748b',
                                                                fontSize: '11px',
                                                                fontWeight: 600,
                                                                borderRadius: '6px',
                                                                height: 22,
                                                                '& .MuiChip-icon': {
                                                                    fontSize: 12
                                                                }
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
                                                    {category.description || 'No description available'}
                                                </Typography>

                                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleOpenEditModal(category)}
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
                                                        onClick={() => handleDelete(category._id)}
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

                        {filteredCategories?.length === 0 && !loading && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <CategoryIcon sx={{ fontSize: 60, color: '#e2e8f0', mb: 2 }} />
                                <Typography sx={{ color: '#94a3b8', fontWeight: 500, mb: 2 }}>
                                    {searchTerm ? 'No matching categories found' : 'No categories found'}
                                </Typography>
                                {!searchTerm && (
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
                                        Add your first category
                                    </Button>
                                )}
                            </Box>
                        )}

                        {filteredCategories?.length > 0 && (
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <TablePagination
                                    component="div"
                                    count={filteredCategories?.length || 0}
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
                                    {openAddModal ? 'New Category' : 'Edit Category'}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    {openAddModal ? 'Add Category' : 'Update Category'}
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
                                Category Name <span style={{ color: '#ef4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter category name"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
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
                                Description
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Enter category description (optional)"
                                value={categoryForm.description}
                                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
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
                        {openAddModal ? 'Create Category' : 'Update Category'}
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

export default Categories;