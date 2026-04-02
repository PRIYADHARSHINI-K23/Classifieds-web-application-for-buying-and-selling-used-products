import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    Card,
    Typography,
    Box,
    Button,
    TextField,
    MenuItem,
    Grid,
    FormControl,
    Select,
    InputAdornment,
    CircularProgress,
    alpha
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import InventoryIcon from '@mui/icons-material/Inventory';

import MetaData from "../Layouts/MetaData";
import { createProduct, clearErrors } from "../../actions/productAction";
import { getAdminSubCategories } from "../../actions/subCategoryAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const { loading, error, success } = useSelector((state) => state.newProduct);
    const { subCategories } = useSelector((state) => state.subCategories);

    useEffect(() => {
        dispatch(getAdminSubCategories());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 });
            dispatch(clearErrors());
        }
        if (success) {
            Swal.fire({ title: "Success!", text: "Product created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_PRODUCT_RESET });
            navigate('/seller/products');
        }
    }, [dispatch, error, success, navigate]);

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
        if (images.length === 0) errors.images = "Product image is required";

        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
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

    return (
        <Box sx={{
            minHeight: '100vh',
            background: '#fafbff',
            p: 4,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <MetaData title="New Product | Seller Dashboard" />

            <Box sx={{ maxWidth: 1000, width: '100%' }}>
                {/* Header */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
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
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2b', letterSpacing: '-0.5px', fontSize: '28px' }}>
                            Add New Product
                        </Typography>
                        <Typography sx={{ color: '#64748b', fontSize: '15px', fontWeight: 500 }}>
                            Create a new product for your store
                        </Typography>
                    </Box>
                </Box>

                <Card sx={{
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    border: '1px solid #f0f0f5',
                    p: 4
                }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
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
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#3a5a9c' }
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
                                            rows={4}
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
                                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#3a5a9c' }
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
                                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#3a5a9c' }
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
                                                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#3a5a9c' }
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
                                                        <MenuItem key={sub._id} value={sub.name}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <CategoryIcon sx={{ fontSize: 18, color: '#3a5a9c' }} />
                                                                <Typography sx={{ fontSize: '14px' }}>{sub.name}</Typography>
                                                            </Box>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
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
                                        Product Images <span style={{ color: '#ef4444' }}>*</span>
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

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/seller/products')}
                                sx={{
                                    borderRadius: '12px',
                                    color: '#64748b',
                                    borderColor: '#e2e8f0',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        borderColor: '#64748b',
                                        background: 'transparent'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                                sx={{
                                    borderRadius: '12px',
                                    background: '#3a5a9c',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    px: 4,
                                    py: 1.5,
                                    boxShadow: '0 4px 12px rgba(58, 90, 156, 0.25)',
                                    '&:hover': {
                                        background: '#2e4a8c'
                                    }
                                }}
                            >
                                {loading ? 'Creating...' : 'Create Product'}
                            </Button>
                        </Box>
                    </form>
                </Card>
            </Box>
        </Box>
    );
};

export default NewProduct;
