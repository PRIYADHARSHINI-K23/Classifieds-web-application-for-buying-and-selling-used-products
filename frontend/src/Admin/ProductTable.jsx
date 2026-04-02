import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    CircularProgress,
    Box,
    Chip,
    Avatar,
    Paper,
    Fade,
    alpha
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FilterListIcon from '@mui/icons-material/FilterList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Grid,
    FormControl,
    Select,
    InputAdornment
} from '@mui/material';

import MetaData from "../Layouts/MetaData";
import {
    getAdminProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getProductDetails,
    clearErrors,
} from "../../actions/productAction";
import { getAdminSubCategories } from "../../actions/subCategoryAction";
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET, DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('table');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewImage, setViewImage] = useState('');

    // Form states
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        status: 'Active',
        subCategoryType: 'Non-Prescription'
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [validation, setValidation] = useState({});

    const { loading, products, error } = useSelector((state) => state.products);
    const { isDeleted, error: deleteError, isUpdated, error: updateError } = useSelector((state) => state.product);
    const { success: createSuccess, error: createError, loading: createLoading } = useSelector((state) => state.newProduct);
    const { product: productDetails } = useSelector((state) => state.productDetails);
    const { subCategories } = useSelector((state) => state.subCategories);

    const filteredProducts = (products || []).filter((product) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return (
            String(product.name || '').toLowerCase().includes(term) ||
            String(product.category?.name || '').toLowerCase().includes(term) ||
            String(product.description || '').toLowerCase().includes(term) ||
            String(product.price || '').includes(term)
        );
    });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAdminSubCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (deleteError) {
            Swal.fire({ title: "Failed!", text: deleteError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Product deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_PRODUCT_RESET });
            dispatch(getAdminProducts());
        }
        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Product created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_PRODUCT_RESET });
            dispatch(getAdminProducts());
            handleCloseAddModal();
        }
        if (createError) {
            Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Product updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch(getAdminProducts());
            handleCloseEditModal();
        }
        if (updateError) {
            Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }

        if (productDetails && openEditModal && productDetails._id === selectedProduct?._id) {
            setProductForm({
                name: productDetails.name || '',
                description: productDetails.description || '',
                price: productDetails.price || '',
                stock: productDetails.stock || '',
                category: productDetails.category || '',
                status: productDetails.status || 'Active',
                subCategoryType: productDetails.subCategoryType || 'Non-Prescription'
            });
            setImagesPreview(productDetails.images?.map(img => img.url?.startsWith('http') ? img.url : `http://localhost:4000/admin/product/${img.url}`) || []);
        }
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError, productDetails, openEditModal]);

    const handleOpenAddModal = () => {
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active', subCategoryType: 'Non-Prescription' });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active', subCategoryType: 'Non-Prescription' });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
    };

    const handleOpenEditModal = (product) => {
        setSelectedProduct(product);
        dispatch(getProductDetails(product._id));
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedProduct(null);
        setProductForm({ name: '', description: '', price: '', stock: '', category: '', status: 'Active' });
        setImages([]);
        setImagesPreview([]);
        setValidation({});
    };

    const handleOpenImageModal = (imageUrl) => {
        setViewImage(imageUrl);
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setOpenImageModal(false);
        setViewImage('');
    };

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                    setImages((prev) => [...prev, file]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!productForm.name.trim()) errors.name = "Product name is required";
        if (!productForm.description.trim()) errors.description = "Description is required";
        if (productForm.price === "") errors.price = "Price is required";
        if (productForm.stock === "") errors.stock = "Stock is required";
        if (!productForm.category) errors.category = "Category is required";
        if (openAddModal && images.length === 0) errors.images = "Product image is required";

        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.set("name", productForm.name);
        formData.set("description", productForm.description);
        formData.set("price", productForm.price);
        formData.set("stock", productForm.stock);
        formData.set("category", productForm.category);
        formData.set("status", productForm.status);
        formData.set("subCategoryType", productForm.subCategoryType);
        images.forEach((img) => formData.append("images", img));

        dispatch(createProduct(formData));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.set("name", productForm.name);
        formData.set("description", productForm.description);
        formData.set("price", productForm.price);
        formData.set("stock", productForm.stock);
        formData.set("category", productForm.category);
        formData.set("status", productForm.status);
        formData.set("subCategoryType", productForm.subCategoryType);
        images.forEach((img) => formData.append("images", img));

        dispatch(updateProduct(selectedProduct._id, formData));
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
                dispatch(deleteProduct(id));
            }
        });
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', background: '#fafbff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: '#3a5a9c' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100vh', background: '#fafbff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ color: '#ef4444', fontSize: '16px', fontWeight: 600 }}>{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: '#fafbff',
            p: 4
        }}>
            <MetaData title="Products | Admin Panel" />

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
                            <InventoryIcon sx={{ color: '#3a5a9c', fontSize: 28 }} />
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
                                Products
                            </Typography>
                            <Typography sx={{ color: '#64748b', fontSize: '15px', fontWeight: 500, mt: 0.5 }}>
                                Manage your product inventory
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
                        fontSize: '15px',
                        boxShadow: '0 4px 12px rgba(58, 90, 156, 0.25)',
                        '&:hover': {
                            background: '#2e4a8c',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(58, 90, 156, 0.35)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    Add Product
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

                    <TextField
                        fullWidth
                        placeholder="Search products by name, category or description..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#94a3b8', fontSize: 22 }} />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                            sx: {
                                fontSize: '15px',
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
                                        {['S.No', 'Product', 'Category', 'Stock', 'Price', 'Status', 'Actions'].map((head, i) => (
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
                                    {filteredProducts?.length > 0 ? (
                                        filteredProducts
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((product, index) => (
                                                <TableRow
                                                    key={product._id}
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
                                                        <Typography sx={{ fontWeight: 500, color: '#64748b', fontSize: '15px' }}>
                                                            {(page * rowsPerPage + index + 1).toString().padStart(2, '0')}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                            <Avatar 
                                                                src={product.images?.[0]?.url?.startsWith('http') ? product.images[0].url : `http://localhost:4000/admin/product/${product.images?.[0]?.url}`}
                                                                sx={{
                                                                    width: 48,
                                                                    height: 48,
                                                                    borderRadius: '12px',
                                                                    bgcolor: alpha('#3a5a9c', 0.1),
                                                                    color: '#3a5a9c',
                                                                    fontSize: '18px',
                                                                    fontWeight: 600
                                                                }}
                                                            >
                                                                {!product.images?.[0]?.url && (product.name?.[0]?.toUpperCase() || 'P')}
                                                            </Avatar>
                                                            <Box>
                                                                <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '15px' }}>
                                                                    {product.name}
                                                                </Typography>
                                                                <Typography sx={{ fontSize: '13px', color: '#94a3b8', mt: 0.5 }}>
                                                                    ID: {product._id?.slice(-8)}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Chip
                                                            icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                                                            label={product.category?.name || product.category}
                                                            size="small"
                                                            sx={{
                                                                background: alpha('#3a5a9c', 0.08),
                                                                color: '#3a5a9c',
                                                                fontWeight: 600,
                                                                fontSize: '13px',
                                                                borderRadius: '8px',
                                                                height: 30
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Typography sx={{
                                                            fontSize: '15px',
                                                            fontWeight: 600,
                                                            color: product.stock < 10 ? '#ef4444' : '#1e293b'
                                                        }}>
                                                            {product.stock}
                                                        </Typography>
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
                                                            <CurrencyRupeeIcon sx={{ fontSize: 18, color: '#64748b' }} />
                                                            {product.price?.toLocaleString('en-IN')}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Chip
                                                            label={product.status || 'Active'}
                                                            size="small"
                                                            sx={{
                                                                background: product.status === "Active" ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                                                                color: product.status === "Active" ? '#10b981' : '#ef4444',
                                                                fontWeight: 700,
                                                                fontSize: '12px',
                                                                borderRadius: '8px',
                                                                height: 28
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
                                                                onClick={() => handleOpenImageModal(
                                                                    product.images?.[0]?.url?.startsWith('http')
                                                                        ? product.images[0].url
                                                                        : `http://localhost:4000/admin/product/${product.images?.[0]?.url}`
                                                                )}
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
                                                                <VisibilityIcon sx={{ fontSize: 20 }} />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => handleOpenEditModal(product)}
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
                                                                onClick={() => handleDelete(product._id)}
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
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                    <ShoppingBagIcon sx={{ fontSize: 60, color: '#e2e8f0' }} />
                                                    <Typography sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '16px' }}>
                                                        No products found
                                                    </Typography>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}
                                                        onClick={handleOpenAddModal}
                                                        sx={{ 
                                                            borderRadius: '10px', 
                                                            borderColor: alpha('#3a5a9c', 0.3),
                                                            color: '#3a5a9c',
                                                            textTransform: 'none',
                                                            fontSize: '14px'
                                                        }}
                                                    >
                                                        Add your first product
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
                            count={filteredProducts?.length || 0}
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
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
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
                                                <Box sx={{ position: 'relative', mb: 2 }}>
                                                    <Avatar 
                                                        src={product.images?.[0]?.url?.startsWith('http') ? product.images[0].url : `http://localhost:4000/admin/product/${product.images?.[0]?.url}`}
                                                        sx={{
                                                            width: '100%',
                                                            height: 160,
                                                            borderRadius: '14px',
                                                            bgcolor: alpha('#3a5a9c', 0.1),
                                                            fontSize: '32px',
                                                            fontWeight: 600,
                                                            color: '#3a5a9c',
                                                            objectFit: 'cover'
                                                        }}
                                                        variant="rounded"
                                                    >
                                                        {!product.images?.[0]?.url && (product.name?.[0]?.toUpperCase() || 'P')}
                                                    </Avatar>
                                                    <Chip
                                                        label={product.status || 'Active'}
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 12,
                                                            right: 12,
                                                            background: product.status === "Active" ? alpha('#10b981', 0.9) : alpha('#ef4444', 0.9),
                                                            color: 'white',
                                                            fontWeight: 700,
                                                            fontSize: '11px',
                                                            borderRadius: '8px',
                                                            height: 24,
                                                            backdropFilter: 'blur(4px)'
                                                        }}
                                                    />
                                                </Box>

                                                <Box sx={{ mb: 2 }}>
                                                    <Typography sx={{ fontWeight: 700, color: '#1e293b', fontSize: '16px', mb: 0.5 }}>
                                                        {product.name}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                        <Chip
                                                            icon={<CategoryIcon sx={{ fontSize: 14 }} />}
                                                            label={product.category?.name || product.category}
                                                            size="small"
                                                            sx={{
                                                                background: alpha('#3a5a9c', 0.08),
                                                                color: '#3a5a9c',
                                                                fontSize: '12px',
                                                                fontWeight: 600,
                                                                borderRadius: '6px',
                                                                height: 24
                                                            }}
                                                        />
                                                        <Chip
                                                            icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
                                                            label={product.subCategoryType || 'Non-Prescription'}
                                                            size="small"
                                                            sx={{
                                                                background: alpha('#94a3b8', 0.08),
                                                                color: '#64748b',
                                                                fontSize: '11px',
                                                                fontWeight: 600,
                                                                borderRadius: '6px',
                                                                height: 24
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Typography sx={{ 
                                                    color: '#64748b', 
                                                    fontSize: '13px',
                                                    mb: 2,
                                                    minHeight: 40,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {product.description || 'No description available'}
                                                </Typography>

                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    justifyContent: 'space-between', 
                                                    alignItems: 'center',
                                                    mb: 2,
                                                    p: 1.5,
                                                    background: '#f8fafc',
                                                    borderRadius: '12px'
                                                }}>
                                                    <Box>
                                                        <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                                                            Price
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
                                                            {product.price?.toLocaleString('en-IN')}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography sx={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                                                            Stock
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            fontSize: '16px', 
                                                            fontWeight: 700,
                                                            color: product.stock < 10 ? '#ef4444' : '#1e293b'
                                                        }}>
                                                            {product.stock}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleOpenEditModal(product)}
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
                                                        onClick={() => handleDelete(product._id)}
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

                        {filteredProducts?.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <ShoppingBagIcon sx={{ fontSize: 60, color: '#e2e8f0', mb: 2 }} />
                                <Typography sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '16px', mb: 2 }}>
                                    No products found
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenAddModal}
                                    sx={{ 
                                        borderRadius: '10px', 
                                        borderColor: alpha('#3a5a9c', 0.3),
                                        color: '#3a5a9c',
                                        textTransform: 'none',
                                        fontSize: '14px'
                                    }}
                                >
                                    Add your first product
                                </Button>
                            </Box>
                        )}

                        {filteredProducts?.length > 0 && (
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <TablePagination
                                    component="div"
                                    count={filteredProducts?.length || 0}
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
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        boxShadow: '0 20px 60px rgba(58, 90, 156, 0.15)',
                        p: 2
                    }
                }}
            >
                <DialogTitle sx={{ p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                background: alpha('#3a5a9c', 0.1),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {openAddModal ? 
                                    <AddIcon sx={{ color: '#3a5a9c', fontSize: 24 }} /> : 
                                    <EditIcon sx={{ color: '#3a5a9c', fontSize: 24 }} />
                                }
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#3a5a9c', mb: 0.5 }}>
                                    {openAddModal ? 'New Product' : 'Edit Product'}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '20px' }}>
                                    {openAddModal ? 'Add Product' : 'Update Product'}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent sx={{ px: 3, py: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                        Product Name <span style={{ color: '#ef4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter product name"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        error={!!validation.name}
                                        helperText={validation.name}
                                        size="medium"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                background: '#f8fafc',
                                                fontSize: '15px',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3a5a9c'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                        Description <span style={{ color: '#ef4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        placeholder="Enter product description"
                                        value={productForm.description}
                                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                        error={!!validation.description}
                                        helperText={validation.description}
                                        size="medium"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                background: '#f8fafc',
                                                fontSize: '15px',
                                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#3a5a9c'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                            Price (₹) <span style={{ color: '#ef4444' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            placeholder="0.00"
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            error={!!validation.price}
                                            helperText={validation.price}
                                            size="medium"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CurrencyRupeeIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    background: '#f8fafc',
                                                    fontSize: '15px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3a5a9c'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                            Stock <span style={{ color: '#ef4444' }}>*</span>
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            placeholder="0"
                                            value={productForm.stock}
                                            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                                            error={!!validation.stock}
                                            helperText={validation.stock}
                                            size="medium"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    background: '#f8fafc',
                                                    fontSize: '15px',
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#3a5a9c'
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                            Category <span style={{ color: '#ef4444' }}>*</span>
                                        </Typography>
                                        <FormControl fullWidth error={!!validation.category} size="medium">
                                            <Select
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                                displayEmpty
                                                sx={{
                                                    borderRadius: '12px',
                                                    background: '#f8fafc',
                                                    fontSize: '15px',
                                                    '& .MuiOutlinedInput-notchedOutline': { 
                                                        borderColor: validation.category ? '#ef4444' : '#e2e8f0'
                                                    }
                                                }}
                                            >
                                                <MenuItem value="" disabled>Select a category</MenuItem>
                                                {subCategories?.map((sub) => (
                                                    <MenuItem key={sub._id} value={sub._id}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CategoryIcon sx={{ fontSize: 18, color: '#3a5a9c' }} />
                                                            <Typography sx={{ fontSize: '14px' }}>{sub.name}</Typography>
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {validation.category && (
                                                <Typography sx={{ color: '#ef4444', fontSize: '12px', mt: 0.5 }}>
                                                    {validation.category}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                            Sub Category Type
                                        </Typography>
                                        <Select
                                            fullWidth
                                            value={productForm.subCategoryType}
                                            onChange={(e) => setProductForm({ ...productForm, subCategoryType: e.target.value })}
                                            size="medium"
                                            sx={{
                                                borderRadius: '12px',
                                                background: '#f8fafc',
                                                fontSize: '15px'
                                            }}
                                        >
                                            <MenuItem value="Non-Prescription">Non-Prescription</MenuItem>
                                            <MenuItem value="Prescription">Prescription</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#64748b', mb: 1 }}>
                                    Product Images {openAddModal && <span style={{ color: '#ef4444' }}>*</span>}
                                </Typography>
                                <Box
                                    component="label"
                                    sx={{
                                        flex: 1,
                                        border: `2px dashed ${validation.images ? '#ef4444' : '#e2e8f0'}`,
                                        borderRadius: '16px',
                                        background: '#f8fafc',
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 2,
                                        cursor: 'pointer',
                                        minHeight: 300,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: '#f1f5f9',
                                            borderColor: '#3a5a9c'
                                        }
                                    }}
                                >
                                    <input type="file" hidden multiple accept="image/*" onChange={handleImages} />
                                    
                                    {imagesPreview.length > 0 ? (
                                        <Grid container spacing={1}>
                                            {imagesPreview.map((url, i) => (
                                                <Grid item xs={6} key={i}>
                                                    <Box sx={{
                                                        aspectRatio: '1',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        border: '2px solid white',
                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                                    }}>
                                                        <img src={url} alt={`Preview ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </Box>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <CloudUploadIcon sx={{ fontSize: 56, color: '#cbd5e1', mb: 2 }} />
                                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>
                                                Click to upload images
                                            </Typography>
                                            <Typography sx={{ fontSize: '12px', color: '#cbd5e1', mt: 1 }}>
                                                PNG, JPG, JPEG up to 5MB
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                                {validation.images && (
                                    <Typography sx={{ color: '#ef4444', fontSize: '12px', mt: 1 }}>
                                        {validation.images}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 2, gap: 1.5 }}>
                    <Button
                        onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                        sx={{
                            borderRadius: '10px',
                            color: '#64748b',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '14px',
                            px: 4,
                            py: 1
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
                            fontSize: '14px',
                            px: 5,
                            py: 1,
                            boxShadow: '0 4px 12px rgba(58, 90, 156, 0.25)',
                            '&:hover': {
                                background: '#2e4a8c'
                            }
                        }}
                    >
                        {openAddModal ? 'Create Product' : 'Update Product'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Image Preview Modal */}
            <Dialog
                open={openImageModal}
                onClose={handleCloseImageModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                    }
                }}
            >
                <Box sx={{ position: 'relative', bgcolor: '#fff' }}>
                    <IconButton
                        onClick={handleCloseImageModal}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: '#1e293b',
                            background: 'rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': { background: '#f1f5f9' },
                            zIndex: 10
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{
                        width: '100%',
                        height: '500px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        background: '#f8fafc'
                    }}>
                        <img
                            src={viewImage}
                            alt="Product Preview"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '12px'
                            }}
                        />
                    </Box>
                </Box>
            </Dialog>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </Box>
    );
};

export default ProductTable;