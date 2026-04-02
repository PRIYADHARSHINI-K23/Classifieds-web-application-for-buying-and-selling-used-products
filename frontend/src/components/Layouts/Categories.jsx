import React, { useState } from 'react';
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
    Button,
    TextField,
    MenuItem,
    Card,
    CardContent,
    Box,
    Typography,
    Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';

const Categories = () => {
    // Initial static categories
    const initialStaticCategories = [
        {
            id: 1,
            name: 'Application',
            type: 'Projection',
            description: 'Software applications and mobile apps'
        },
        {
            id: 2,
            name: 'Web Development',
            type: 'Development',
            description: 'Websites and web applications'
        },
        {
            id: 3,
            name: 'Digital Marketing',
            type: 'Marketing',
            description: 'Online marketing campaigns and strategies'
        },
        {
            id: 4,
            name: 'Sales Support',
            type: 'Sales',
            description: 'Sales and customer support services'
        },
        {
            id: 5,
            name: 'Technical Support',
            type: 'Support',
            description: 'Technical assistance and maintenance'
        }
    ];

    const [categories, setCategories] = useState(initialStaticCategories);
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        type: '',
        description: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});

    const categoryTypes = [
        'Projection',
        'Development',
        'Marketing',
        'Sales',
        'Support'
    ];

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!categoryForm.name.trim()) newErrors.name = "Category Name is required";
        if (!categoryForm.type) newErrors.type = "Category Type is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // enqueueSnackbar('Please fill in all required fields', { variant: 'error' }); // Optional: remove snackbar if inline errors are enough, or keep it.
            return;
        }

        if (isEditing) {
            // Update existing category
            const updatedCategories = categories.map(cat =>
                cat.id === editingId ? { ...cat, ...categoryForm } : cat
            );
            setCategories(updatedCategories);
            enqueueSnackbar('Category updated successfully!', { variant: 'success' });
            setIsEditing(false);
            setEditingId(null);
        } else {
            // Add new category
            const newCategory = {
                id: Date.now(), // Use timestamp for unique ID
                ...categoryForm
            };
            setCategories([...categories, newCategory]);
            enqueueSnackbar('Category added successfully!', { variant: 'success' });
        }

        // Reset form and hide it
        setCategoryForm({
            name: '',
            type: '',
            description: ''
        });
        setErrors({});
        setShowForm(false);
    };

    const handleEdit = (category) => {
        setCategoryForm({
            name: category.name,
            type: category.type,
            description: category.description
        });

        setIsEditing(true);
        setEditingId(category.id);
        setShowForm(true);
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
                setCategories(categories.filter(cat => cat.id !== id));
                enqueueSnackbar('Category deleted successfully!', { variant: 'success' });

                // Reset form if we were editing the deleted category
                if (isEditing && editingId === id) {
                    setIsEditing(false);
                    setEditingId(null);
                    setCategoryForm({
                        name: '',
                        type: '',
                        description: ''
                    });
                    setErrors({});
                    setShowForm(false);
                }
            }
        });
    };

    const handleAddNew = () => {
        setShowForm(true);
        setIsEditing(false);
        setEditingId(null);
        setCategoryForm({
            name: '',
            type: '',
            description: ''
        });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        setCategoryForm({
            name: '',
            type: '',
            description: ''
        });
        setErrors({});
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-8">
                <hr className="border-gray-300 my-6" />

                {/* Page Title */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                </div>
            </div>

            {/* Add/Edit Category Form - Only shown when showForm is true */}
            {showForm && (
                <Card className="shadow-lg border-0 mb-6">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <Typography variant="h6" className="font-bold text-gray-800">
                                {isEditing ? 'Edit Category' : 'Add New Category'}
                            </Typography>
                            <IconButton onClick={cancelEdit} className="text-gray-500">
                                <CloseIcon />
                            </IconButton>
                        </div>

                        <Box component="form" onSubmit={handleSubmit} className="space-y-6">
                            {/* First Row: Category Name and Category Type side by side */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Enter category name
                                        </label>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            size="medium"
                                            value={categoryForm.name}
                                            onChange={(e) => {
                                                setCategoryForm({ ...categoryForm, name: e.target.value });
                                                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                                            }}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            placeholder="Enter category name"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category Type
                                        </label>
                                        <TextField
                                            fullWidth
                                            select
                                            variant="outlined"
                                            size="medium"
                                            value={categoryForm.type}
                                            onChange={(e) => {
                                                setCategoryForm({ ...categoryForm, type: e.target.value });
                                                if (errors.type) setErrors((prev) => ({ ...prev, type: '' }));
                                            }}
                                            error={!!errors.type}
                                            helperText={errors.type}
                                            placeholder="Select category type"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Select category type</em>
                                            </MenuItem>
                                            {categoryTypes.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Grid>
                            </Grid>

                            {/* Second Row: Description (full width) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="medium"
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                    placeholder="Enter category description"
                                />
                            </div>

                            {/* Buttons aligned to the right */}
                            <Box className="flex justify-end gap-2 pt-4">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="bg-blue-600 hover:bg-blue-700 py-3 px-6 text-lg"
                                    sx={{ minWidth: '200px' }}
                                >
                                    {isEditing ? 'UPDATE CATEGORY' : 'ADD CATEGORY'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={cancelEdit}
                                    className="py-3 px-6 text-lg"
                                    sx={{ minWidth: '200px' }}
                                >
                                    CANCEL
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {/* Categories Table */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex justify-end">
                                <Typography variant="body2" className="text-gray-600">
                                    Total categories: {categories.length}
                                </Typography>
                            </div>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddNew}
                                className="bg-blue-600 hover:bg-blue-700 shadow-lg"
                                size="medium"
                            >
                                ADD NEW CATEGORY
                            </Button>
                        </div>
                    </div>

                    <TableContainer component={Paper} className="shadow-sm">
                        <Table>
                            <TableHead className="bg-gray-100">
                                <TableRow>
                                    <TableCell className="font-bold text-gray-800 border-r text-center">ID</TableCell>
                                    <TableCell className="font-bold text-gray-800 border-r text-center">Category Name</TableCell>
                                    <TableCell className="font-bold text-gray-800 border-r text-center">Category Type</TableCell>
                                    <TableCell className="font-bold text-gray-800 text-center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id} className="hover:bg-gray-50">
                                        <TableCell className="border-r text-center font-medium">{category.id}</TableCell>
                                        <TableCell className="border-r text-center">{category.name}</TableCell>
                                        <TableCell className="border-r text-center">{category.type}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center space-x-2">
                                                <IconButton
                                                    onClick={() => handleEdit(category)}
                                                    className="text-blue-600 hover:bg-blue-50"
                                                    size="medium"
                                                    title="Edit category"
                                                >
                                                    <EditIcon style={{ color: '#1976d2' }} />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDelete(category.id)}
                                                    className="text-red-600 hover:bg-red-50"
                                                    size="medium"
                                                    title="Delete category"
                                                >
                                                    <DeleteIcon style={{ color: '#d32f2f' }} />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {categories.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No categories found. Add your first category!
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-300 text-center text-gray-600">
                <p>Developed with ❤️ by: Anjana Infotech</p>
            </div>
        </div>
    );
};

export default Categories;