import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';

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
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment,
    Paper,
    Avatar,
    Chip,
    LinearProgress,
    alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import CategoryIcon from '@mui/icons-material/Category';
import MetaData from '../Layouts/MetaData';

import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, deleteRole, createRole, updateRole } from "../../actions/rolesActions";
import { DELETE_ROLE_RESET, NEW_ROLE_RESET, UPDATE_ROLE_RESET } from "../../constants/rolesConstants";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '28px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02)',
    overflow: 'hidden'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '0.9rem',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.02)',
    color: '#1e293b',
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
    fontWeight: 700,
    color: '#64748b',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        backgroundColor: '#f8fafc',
        '& .MuiTableCell-root': {
            color: '#0f172a',
        }
    },
}));

const GradientText = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
}));

const StyledIconButton = styled(IconButton)(({ theme, actiontype }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '14px',
    padding: '10px',
    transition: 'all 0.2s ease',
    border: '1px solid rgba(0, 0, 0, 0.02)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
    '&:hover': {
        backgroundColor: actiontype === 'delete' ? '#fee2e2' : '#f0f7ff',
        borderColor: actiontype === 'delete' ? '#fecaca' : '#b8d3ff',
        transform: 'scale(1.1)',
        '& svg': {
            color: actiontype === 'delete' ? '#dc2626' : '#4361ee',
        }
    },
    '& svg': {
        fontSize: '1.2rem',
        color: actiontype === 'delete' ? '#ef4444' : '#94a3b8',
        transition: 'color 0.2s ease',
    }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '32px',
        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
    }
}));

const SearchField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.02)',
        transition: 'all 0.3s ease',
        '&:hover': {
            borderColor: alpha('#4361ee', 0.2),
        },
        '&.Mui-focused': {
            borderColor: '#4361ee',
            boxShadow: `0 0 0 4px ${alpha('#4361ee', 0.1)}`,
        },
        '& input': {
            padding: '14px 16px',
            fontSize: '0.9rem',
            fontWeight: 500,
            '&::placeholder': {
                color: '#94a3b8',
                fontWeight: 400,
            }
        }
    }
}));

const Roles = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Form states
    const [roleForm, setRoleForm] = useState({ name: '' });
    const [validation, setValidation] = useState({});

    const { roles, loading, error } = useSelector((state) => state.roles);
    const { isDeleted, error: deleteError } = useSelector((state) => state.deleteRole);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newRole);
    const { isUpdated, error: updateError } = useSelector((state) => state.updateRole);

    const filteredRoles = (roles || []).filter((role) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return String(role.name || '').toLowerCase().includes(term);
    });

    useEffect(() => {
        if (error) {
            Swal.fire({ 
                title: "Failed!", 
                text: error, 
                icon: "error", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#ef4444',
            });
        }

        if (deleteError) {
            Swal.fire({ 
                title: "Failed!", 
                text: deleteError, 
                icon: "error", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#ef4444',
            });
        }

        if (isDeleted) {
            Swal.fire({ 
                title: "Success!", 
                text: "Role deleted successfully!", 
                icon: "success", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#4361ee',
            });
            dispatch({ type: DELETE_ROLE_RESET });
            dispatch(getAllRoles());
        }

        if (createSuccess) {
            Swal.fire({ 
                title: "Success!", 
                text: "Role created successfully!", 
                icon: "success", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#4361ee',
            });
            dispatch({ type: NEW_ROLE_RESET });
            dispatch(getAllRoles());
            handleCloseAddModal();
        }

        if (createError) {
            Swal.fire({ 
                title: "Failed!", 
                text: createError, 
                icon: "error", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#ef4444',
            });
        }

        if (isUpdated) {
            Swal.fire({ 
                title: "Success!", 
                text: "Role updated successfully!", 
                icon: "success", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#4361ee',
            });
            dispatch({ type: UPDATE_ROLE_RESET });
            dispatch(getAllRoles());
            handleCloseEditModal();
        }

        if (updateError) {
            Swal.fire({ 
                title: "Failed!", 
                text: updateError, 
                icon: "error", 
                timer: 2000,
                background: '#ffffff',
                borderRadius: '24px',
                iconColor: '#ef4444',
            });
        }

        dispatch(getAllRoles());
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setRoleForm({ name: '' });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setRoleForm({ name: '' });
        setValidation({});
    };

    const handleOpenEditModal = (role) => {
        setSelectedRole(role);
        setRoleForm({ name: role.name || '' });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedRole(null);
        setRoleForm({ name: '' });
        setValidation({});
    };

    const validateForm = () => {
        const errors = {};
        if (!roleForm.name.trim()) {
            errors.name = "Role name is required";
        }
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createRole({ name: roleForm.name }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(updateRole(selectedRole._id, { name: roleForm.name }));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete Role?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4361ee",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            background: '#ffffff',
            borderRadius: '24px',
            iconColor: '#f59e0b',
            customClass: {
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                content: 'swal-custom-content',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRole(id));
            }
        });
    };

    // Calculate stats
    const totalRoles = roles?.length || 0;

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            p: 4,
        }}>
            <MetaData title="Roles | Quick Buy" />

            {/* Header Section */}
            <Box sx={{ mb: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box sx={{ 
                        width: 56, 
                        height: 56, 
                        borderRadius: '18px',
                        background: 'linear-gradient(135deg, #4361ee 0%, #7b68ee 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 20px rgba(67, 97, 238, 0.2)'
                    }}>
                        <CategoryIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Box>
                        <GradientText variant="h4" sx={{ fontWeight: 800, fontSize: '2rem' }}>
                            Role Management
                        </GradientText>
                        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5, fontWeight: 500 }}>
                            Create and manage user roles and permissions
                        </Typography>
                    </Box>
                </Box>

                {/* Stats Card */}
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '24px',
                        background: 'white',
                        border: '1px solid rgba(0, 0, 0, 0.02)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
                        display: 'inline-block',
                        minWidth: 280,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 52,
                            height: 52,
                            borderRadius: '16px',
                            background: alpha('#4361ee', 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <WorkspacePremiumIcon sx={{ color: '#4361ee', fontSize: 26 }} />
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                                {totalRoles}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, mt: 0.5 }}>
                                Total Roles
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            {/* Search and Add Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchField
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#94a3b8', fontSize: 20, ml: 1 }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: 320 }}
                />

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddModal}
                    sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        px: 4,
                        py: 1.5,
                        background: 'linear-gradient(135deg, #4361ee 0%, #7b68ee 100%)',
                        boxShadow: '0 10px 20px rgba(67, 97, 238, 0.2)',
                        '&:hover': { 
                            background: 'linear-gradient(135deg, #3651d9 0%, #6a5ad9 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 15px 25px rgba(67, 97, 238, 0.3)',
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    Create New Role
                </Button>
            </Box>

            <StyledCard>
                {loading && (
                    <LinearProgress 
                        sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0,
                            height: 2,
                            backgroundColor: alpha('#4361ee', 0.1),
                            '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, #4361ee, #7b68ee)'
                            }
                        }} 
                    />
                )}
                
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 380px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableHeadCell width="15%">#</StyledTableHeadCell>
                                    <StyledTableHeadCell width="65%">Role Name</StyledTableHeadCell>
                                    <StyledTableHeadCell width="20%" align="center">Actions</StyledTableHeadCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 12 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <CircularProgress size={40} sx={{ color: '#4361ee' }} />
                                                <Typography sx={{ mt: 2, color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                                                    Loading roles...
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRoles?.length > 0 ? (
                                    filteredRoles
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((role, index) => (
                                            <StyledTableRow key={role._id}>
                                                <StyledTableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Avatar 
                                                            sx={{ 
                                                                width: 32, 
                                                                height: 32, 
                                                                bgcolor: alpha('#4361ee', 0.1),
                                                                color: '#4361ee',
                                                                fontSize: '0.85rem',
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {(page * rowsPerPage) + index + 1}
                                                        </Avatar>
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <BadgeIcon sx={{ color: alpha('#4361ee', 0.5), fontSize: 20 }} />
                                                        <Typography sx={{ 
                                                            fontWeight: 600, 
                                                            color: '#0f172a',
                                                            fontSize: '1rem',
                                                        }}>
                                                            {role.name}
                                                        </Typography>
                                                        <Chip 
                                                            label="Active" 
                                                            size="small"
                                                            sx={{ 
                                                                height: 22,
                                                                fontSize: '0.65rem',
                                                                fontWeight: 600,
                                                                bgcolor: alpha('#10b981', 0.1),
                                                                color: '#059669',
                                                                borderRadius: '6px',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.3px',
                                                                border: '1px solid rgba(16, 185, 129, 0.2)'
                                                            }} 
                                                        />
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Box display="flex" justifyContent="center" gap={1.5}>
                                                        <StyledIconButton
                                                            onClick={() => handleOpenEditModal(role)}
                                                            actiontype="edit"
                                                        >
                                                            <EditIcon />
                                                        </StyledIconButton>
                                                        <StyledIconButton
                                                            onClick={() => handleDelete(role._id)}
                                                            actiontype="delete"
                                                        >
                                                            <DeleteIcon />
                                                        </StyledIconButton>
                                                    </Box>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 12 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <CategoryIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                                                <Typography sx={{ color: '#64748b', fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
                                                    {searchTerm ? 'No matching roles found' : 'No roles created yet'}
                                                </Typography>
                                                <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem', mb: 2 }}>
                                                    {searchTerm ? 'Try a different search term' : 'Click the button above to create your first role'}
                                                </Typography>
                                                {!searchTerm && (
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}
                                                        onClick={handleOpenAddModal}
                                                        sx={{
                                                            borderRadius: '16px',
                                                            borderColor: alpha('#4361ee', 0.2),
                                                            color: '#4361ee',
                                                            fontWeight: 600,
                                                            fontSize: '0.8rem',
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                borderColor: '#4361ee',
                                                                backgroundColor: alpha('#4361ee', 0.02),
                                                            }
                                                        }}
                                                    >
                                                        Create Role
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredRoles?.length || 0}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        sx={{
                            borderTop: '1px solid rgba(0, 0, 0, 0.02)',
                            px: 3,
                            py: 2,
                            '& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                color: '#64748b',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                            },
                            '& .MuiTablePagination-select': {
                                color: '#0f172a',
                                fontWeight: 600,
                                borderRadius: '10px',
                                border: '1px solid rgba(0, 0, 0, 0.02)',
                                padding: '8px 24px 8px 12px',
                            },
                            '& .MuiTablePagination-actions button': {
                                color: '#64748b',
                                borderRadius: '12px',
                                '&:hover': {
                                    backgroundColor: '#f1f5f9',
                                },
                                '&.Mui-disabled': {
                                    color: '#cbd5e1',
                                }
                            }
                        }}
                    />
                </CardContent>
            </StyledCard>

            {/* Add/Edit Modal */}
            <StyledDialog
                open={openAddModal || openEditModal}
                onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ p: 4, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                                <Box sx={{ 
                                    width: 40, 
                                    height: 40, 
                                    borderRadius: '12px',
                                    background: alpha('#4361ee', 0.1),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {openAddModal ? (
                                        <AddIcon sx={{ color: '#4361ee', fontSize: 22 }} />
                                    ) : (
                                        <EditIcon sx={{ color: '#4361ee', fontSize: 22 }} />
                                    )}
                                </Box>
                                <GradientText variant="h5" sx={{ fontWeight: 700, fontSize: '1.3rem' }}>
                                    {openAddModal ? 'Create New Role' : 'Edit Role'}
                                </GradientText>
                            </Box>
                            <Typography variant="body2" sx={{ color: '#64748b', ml: 7 }}>
                                {openAddModal ? 'Add a new role to the system' : `Editing: ${selectedRole?.name}`}
                            </Typography>
                        </Box>
                        <IconButton 
                            onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                            sx={{ 
                                bgcolor: '#f1f5f9',
                                borderRadius: '12px',
                                '&:hover': { bgcolor: '#e2e8f0' }
                            }}
                        >
                            <CloseIcon sx={{ fontSize: 18, color: '#64748b' }} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 4, py: 3 }}>
                    <Box sx={{ mt: 1 }}>
                        <Typography sx={{ 
                            fontSize: '0.8rem', 
                            fontWeight: 600, 
                            color: '#64748b', 
                            mb: 1,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3px'
                        }}>
                            Role Details
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter role name (e.g., Admin, Manager, Editor)"
                            value={roleForm.name}
                            onChange={(e) => {
                                const val = e.target.value;
                                setRoleForm({ ...roleForm, name: val });
                                if (val.trim() && validation.name) {
                                    const newValidation = { ...validation };
                                    delete newValidation.name;
                                    setValidation(newValidation);
                                }
                            }}
                            error={Boolean(validation.name)}
                            helperText={validation.name}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    backgroundColor: '#f8fafc',
                                    '&:hover': {
                                        backgroundColor: '#f1f5f9',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: '#ffffff',
                                        boxShadow: `0 0 0 4px ${alpha('#4361ee', 0.1)}`,
                                    }
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
                    <Button 
                        onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                        sx={{ 
                            borderRadius: '16px',
                            color: '#64748b',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            textTransform: 'none',
                            px: 4,
                            py: 1,
                            '&:hover': { 
                                backgroundColor: '#f1f5f9',
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={openAddModal ? handleAddSubmit : handleEditSubmit}
                        sx={{ 
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #4361ee 0%, #7b68ee 100%)',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            textTransform: 'none',
                            px: 5,
                            py: 1,
                            boxShadow: '0 10px 20px rgba(67, 97, 238, 0.2)',
                            '&:hover': { 
                                background: 'linear-gradient(135deg, #3651d9 0%, #6a5ad9 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 15px 25px rgba(67, 97, 238, 0.3)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {openAddModal ? 'Create Role' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </StyledDialog>

            {/* Custom SweetAlert2 Styles */}
            <style jsx global>{`
                .swal-custom-popup {
                    border-radius: 24px !important;
                    padding: 24px !important;
                }
                .swal-custom-title {
                    color: #0f172a !important;
                    font-size: 1.25rem !important;
                    font-weight: 700 !important;
                }
                .swal-custom-content {
                    color: #64748b !important;
                    font-size: 0.9rem !important;
                }
            `}</style>
        </Box>
    );
};

export default Roles;