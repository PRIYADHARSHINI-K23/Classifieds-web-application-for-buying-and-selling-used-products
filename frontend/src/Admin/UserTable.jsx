import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MetaData from '../Layouts/MetaData';
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
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Chip,
    Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '20px',
    background: '#ffffff',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    overflow: 'hidden'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 500,
    fontSize: '0.85rem',
    padding: '16px 20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
    color: '#1a1a1a',
}));

const StyledTableHeadCell = styled(StyledTableCell)(({ theme }) => ({
    fontWeight: 600,
    color: '#666666',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    backgroundColor: '#fafafa',
    whiteSpace: 'nowrap',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
    },
    '& td': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
    }
}));

const RoleChip = styled(Chip)(({ theme, role }) => {
    const getRoleColors = () => {
        switch(role) {
            case 'admin':
                return {
                    bg: '#e0e7ff',
                    color: '#4338ca',
                    border: '#c7d2fe'
                };
            case 'doctor':
                return {
                    bg: '#dcfce7',
                    color: '#166534',
                    border: '#bbf7d0'
                };
            case 'user':
                return {
                    bg: '#fef9c3',
                    color: '#854d0e',
                    border: '#fde047'
                };
            default:
                return {
                    bg: '#f3f4f6',
                    color: '#4b5563',
                    border: '#e5e7eb'
                };
        }
    };

    const colors = getRoleColors();

    return {
        fontWeight: 600,
        fontSize: '0.7rem',
        height: '24px',
        borderRadius: '6px',
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        '& .MuiChip-label': {
            padding: '0 8px',
            textTransform: 'capitalize',
            fontWeight: 600,
        }
    };
});

const StyledIconButton = styled(IconButton)(({ theme, color }) => ({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: color === 'error' ? '#fee2e2' : '#e0e7ff',
        transform: 'scale(1.05)',
        '& svg': {
            color: color === 'error' ? '#dc2626' : '#4338ca',
        }
    },
    '& svg': {
        fontSize: '1.1rem',
        color: color === 'error' ? '#ef4444' : '#6b7280',
        transition: 'color 0.2s ease',
    }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '20px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0, 0, 0, 0.03)',
    }
}));

const UserTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { users, error } = useSelector((state) => state.users);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.profile);

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
            enqueueSnackbar("User deleted successfully!", { variant: "success" });
            dispatch({ type: DELETE_USER_RESET });
            dispatch(getAllUsers());
        }

        dispatch(getAllUsers());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4338ca",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, delete it!",
            background: '#ffffff',
            borderRadius: '16px',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(id));
            }
        });
    };

    const handleOpenDocs = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleCloseDocs = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            p: 4,
            backgroundColor: '#ffffff',
        }}>
            <MetaData title="Personnel Management | Quick Buy" />

            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 600,
                            color: '#1a1a1a',
                            mb: 0.5,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Personnel Management
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: '#666666',
                            fontWeight: 400,
                        }}
                    >
                        Manage and view all system users
                    </Typography>
                </Box>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: '#999999',
                        fontWeight: 500,
                        backgroundColor: '#fafafa',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.03)'
                    }}
                >
                    Total Users: {users?.length || 0}
                </Typography>
            </Box>

            <StyledCard>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableHeadCell width="5%">#</StyledTableHeadCell>
                                    <StyledTableHeadCell width="25%">User</StyledTableHeadCell>
                                    <StyledTableHeadCell width="30%">Email</StyledTableHeadCell>
                                    <StyledTableHeadCell width="10%" align="center">Gender</StyledTableHeadCell>
                                    <StyledTableHeadCell width="15%" align="center">Role</StyledTableHeadCell>
                                    <StyledTableHeadCell width="15%" align="center">Actions</StyledTableHeadCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                            <CircularProgress size={32} sx={{ color: '#4338ca' }} />
                                            <Typography sx={{ mt: 2, color: '#666666', fontSize: '0.9rem' }}>
                                                Loading users...
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : users?.length > 0 ? (
                                    users
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((user, index) => (
                                            <StyledTableRow key={user._id}>
                                                <StyledTableCell>
                                                    <Typography sx={{ fontWeight: 500, color: '#999999' }}>
                                                        {(page * rowsPerPage) + index + 1}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar 
                                                            sx={{ 
                                                                width: 36, 
                                                                height: 36, 
                                                                bgcolor: '#e0e7ff',
                                                                color: '#4338ca',
                                                                fontSize: '0.9rem',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {user.name?.charAt(0).toUpperCase()}
                                                        </Avatar>
                                                        <Typography sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                                                            {user.name}
                                                        </Typography>
                                                    </Box>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <Typography sx={{ color: '#666666', fontSize: '0.85rem' }}>
                                                        {user.email}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Typography sx={{ 
                                                        color: '#666666', 
                                                        fontSize: '0.85rem',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                        {user.gender || 'Not specified'}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <RoleChip 
                                                        label={user.role}
                                                        role={user.role}
                                                        size="small"
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Box display="flex" justifyContent="center" gap={1}>
                                                        {user.role === 'doctor' && (
                                                            <StyledIconButton
                                                                onClick={() => handleOpenDocs(user)}
                                                                title="View Documents"
                                                            >
                                                                <VisibilityIcon />
                                                            </StyledIconButton>
                                                        )}
                                                        <StyledIconButton
                                                            onClick={() => handleDelete(user._id)}
                                                            color="error"
                                                            title="Delete User"
                                                        >
                                                            <DeleteIcon />
                                                        </StyledIconButton>
                                                    </Box>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography sx={{ color: '#999999', mb: 1 }}>
                                                    No users found
                                                </Typography>
                                                <Typography sx={{ color: '#cccccc', fontSize: '0.8rem' }}>
                                                    Add users to get started
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
                        count={users?.length || 0}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[10, 25, 50]}
                        sx={{
                            borderTop: '1px solid rgba(0, 0, 0, 0.03)',
                            px: 2,
                            '& .MuiTablePagination-selectLabel': {
                                color: '#666666',
                                fontSize: '0.8rem',
                                fontWeight: 400,
                            },
                            '& .MuiTablePagination-displayedRows': {
                                color: '#666666',
                                fontSize: '0.8rem',
                                fontWeight: 400,
                            },
                            '& .MuiTablePagination-select': {
                                color: '#1a1a1a',
                                fontWeight: 500,
                            },
                            '& .MuiTablePagination-actions button': {
                                color: '#666666',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                }
                            }
                        }}
                    />
                </CardContent>
            </StyledCard>

            {/* Documents Dialog */}
            <StyledDialog
                open={open}
                onClose={handleCloseDocs}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontSize: '1.1rem',
                    p: 3,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.03)',
                }}>
                    Doctor Verification Documents
                    <Typography variant="caption" display="block" sx={{ color: '#666666', mt: 0.5, fontSize: '0.8rem' }}>
                        {selectedUser?.name}
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ p: 3 }}>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3,
                        mt: 1
                    }}>
                        {/* Medical Certificate */}
                        <Paper sx={{ 
                            p: 2,
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 0, 0, 0.03)',
                            boxShadow: 'none',
                            bgcolor: '#fafafa'
                        }}>
                            <Typography sx={{ 
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#666666',
                                mb: 2,
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px'
                            }}>
                                Medical Certificate
                            </Typography>
                            {selectedUser?.registrationCertificate?.url ? (
                                <Box sx={{ 
                                    borderRadius: '12px', 
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 0, 0, 0.03)',
                                    bgcolor: '#ffffff'
                                }}>
                                    <img
                                        src={selectedUser.registrationCertificate.url}
                                        alt="Registration Certificate"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease'
                                        }}
                                        onClick={() => window.open(selectedUser.registrationCertificate.url, '_blank')}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.03)' }}>
                                        <Button
                                            onClick={() => window.open(selectedUser.registrationCertificate.url, '_blank')}
                                            sx={{ 
                                                color: '#4338ca',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    bgcolor: '#e0e7ff',
                                                }
                                            }}
                                        >
                                            View Full Document
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ 
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#ffffff',
                                    borderRadius: '12px',
                                    border: '1px dashed rgba(0, 0, 0, 0.1)',
                                    flexDirection: 'column',
                                    gap: 1
                                }}>
                                    <Typography sx={{ color: '#999999', fontSize: '0.9rem' }}>
                                        No document uploaded
                                    </Typography>
                                </Box>
                            )}
                        </Paper>

                        {/* ID Proof */}
                        <Paper sx={{ 
                            p: 2,
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 0, 0, 0.03)',
                            boxShadow: 'none',
                            bgcolor: '#fafafa'
                        }}>
                            <Typography sx={{ 
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: '#666666',
                                mb: 2,
                                textTransform: 'uppercase',
                                letterSpacing: '0.3px'
                            }}>
                                ID Proof
                            </Typography>
                            {selectedUser?.doctorIdProof?.url ? (
                                <Box sx={{ 
                                    borderRadius: '12px', 
                                    overflow: 'hidden',
                                    border: '1px solid rgba(0, 0, 0, 0.03)',
                                    bgcolor: '#ffffff'
                                }}>
                                    <img
                                        src={selectedUser.doctorIdProof.url}
                                        alt="Doctor ID Proof"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease'
                                        }}
                                        onClick={() => window.open(selectedUser.doctorIdProof.url, '_blank')}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <Box sx={{ p: 2, textAlign: 'center', borderTop: '1px solid rgba(0, 0, 0, 0.03)' }}>
                                        <Button
                                            onClick={() => window.open(selectedUser.doctorIdProof.url, '_blank')}
                                            sx={{ 
                                                color: '#4338ca',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': {
                                                    bgcolor: '#e0e7ff',
                                                }
                                            }}
                                        >
                                            View Full Document
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ 
                                    height: '200px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: '#ffffff',
                                    borderRadius: '12px',
                                    border: '1px dashed rgba(0, 0, 0, 0.1)',
                                    flexDirection: 'column',
                                    gap: 1
                                }}>
                                    <Typography sx={{ color: '#999999', fontSize: '0.9rem' }}>
                                        No document uploaded
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ 
                    p: 2, 
                    borderTop: '1px solid rgba(0, 0, 0, 0.03)',
                    justifyContent: 'center'
                }}>
                    <Button
                        onClick={handleCloseDocs}
                        variant="contained"
                        sx={{ 
                            backgroundColor: '#f5f5f5',
                            color: '#666666',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            textTransform: 'none',
                            px: 4,
                            py: 1,
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#e0e7ff',
                                color: '#4338ca',
                                boxShadow: 'none',
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </StyledDialog>
        </Box>
    );
};

export default UserTable;