import React, { useState, useEffect } from "react";
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
    Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "../Layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getContactusList, deleteContactus } from "../../actions/contactusAction";
import { CLEAR_ERRORS, DELETE_CONTACTUS_RESET } from "../../constants/contactusConstants";
import Swal from 'sweetalert2'

const ContactTable = () => {
    const dispatch = useDispatch();

    const { contacts, loading } = useSelector((state) => state.contacts);
    const { isDeleted, error } = useSelector((state) => state.deleteContact);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getContactusList());
    }, [dispatch]);

    useEffect(() => {
        if (isDeleted) {
            Swal.fire({
                title: "Success!",
                text: "Contact Deleted Successfully!",
                icon: "success"
            });

            dispatch({ type: DELETE_CONTACTUS_RESET });
            dispatch(getContactusList());
        }

        if (error) {
            alert(error);
            dispatch({ type: CLEAR_ERRORS });
        }
    }, [dispatch, isDeleted, error]);


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
                dispatch(deleteContactus(id));
            }
        });
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Messages | Quick Buy" />

            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#020617', mb: 0.5, letterSpacing: '0.5px' }}>
                    Messages
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                    View and manage user queries
                </Typography>
            </Box>

            <Card sx={{
                borderRadius: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ background: '#f8fafc' }}>
                                    {[
                                        { label: 'S.No', width: '80px' },
                                        { label: 'Name', width: 'auto' },
                                        { label: 'Contact Info', width: 'auto' },
                                        { label: 'Message', width: 'auto' },
                                        { label: 'Actions', width: '120px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 0 || i === 4 ? "center" : "left"}
                                            sx={{
                                                fontWeight: 700,
                                                color: '#64748b',
                                                fontSize: '12px',
                                                py: 2,
                                                borderBottom: '1px solid #e2e8f0',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                width: head.width
                                            }}
                                        >
                                            {head.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#64748b' }}>Loading...</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : contacts?.length > 0 ? (
                                    contacts
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => (
                                            <TableRow
                                                key={item._id}
                                                sx={{
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': { background: '#f8fafc' },
                                                    '& td': { borderBottom: '1px solid #f1f5f9', py: 2 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                                                        {((page * rowsPerPage) + index + 1)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Box sx={{
                                                            width: 32, height: 32,
                                                            borderRadius: '8px',
                                                            background: 'rgba(59, 130, 246, 0.1)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontWeight: 700,
                                                            color: '#60a5fa',
                                                            border: '1px solid rgba(59, 130, 246, 0.2)',
                                                            fontSize: '12px'
                                                        }}>
                                                            {item.name?.[0].toUpperCase()}
                                                        </Box>
                                                        <Typography sx={{ fontSize: '14px', color: '#020617', fontWeight: 700 }}>
                                                            {item.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Box>
                                                        <Typography sx={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                                                            {item.email}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600, mt: 0.5 }}>
                                                            {item.phone}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        "{item.message}"
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleDelete(item._id)}
                                                        size="small"
                                                        sx={{
                                                            color: '#ff4d4d',
                                                            background: 'rgba(255, 77, 77, 0.1)',
                                                            borderRadius: '8px',
                                                            '&:hover': { background: 'rgba(255, 77, 77, 0.2)' },
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                                            <Typography sx={{ fontWeight: 500, fontSize: '14px', color: '#64748b' }}>No Messages Found</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={contacts?.length || 0}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        rowsPerPageOptions={[10, 25, 50]}
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

export default ContactTable;
