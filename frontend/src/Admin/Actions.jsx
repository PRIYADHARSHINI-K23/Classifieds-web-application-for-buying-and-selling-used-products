import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Typography,
    Box
} from '@mui/material';

const Actions = ({ id, deleteHandler, name, editRoute }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        deleteHandler(id);
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {editRoute !== "review" && (
                <IconButton
                    component={Link}
                    to={`/admin/${editRoute}/${id}`}
                    size="small"
                    sx={{
                        color: '#60a5fa',
                        background: 'rgba(59, 130, 246, 0.1)',
                        '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
                    }}
                >
                    <EditIcon sx={{ fontSize: 18 }} />
                </IconButton>
            )}
            <IconButton
                onClick={handleOpen}
                size="small"
                sx={{
                    color: '#ff4d4d',
                    background: 'rgba(255, 77, 77, 0.1)',
                    '&:hover': { background: 'rgba(255, 77, 77, 0.2)' }
                }}
            >
                <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        background: 'rgba(15, 23, 42, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '24px',
                        color: '#f8fafc',
                        minWidth: '320px'
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, textAlign: 'center', pt: 4, pb: 1 }}>
                    DESTRUCTIVE_SEQUENCE
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                        Authorized personnel: Confirm deletion of {name ? <b>{name}</b> : 'this record'}. This process is non-reversible.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        sx={{
                            borderRadius: '12px',
                            color: '#94a3b8',
                            borderColor: 'rgba(255,255,255,0.1)',
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 3,
                            '&:hover': { borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.02)' }
                        }}
                    >
                        ABORT
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            background: '#ff4444',
                            color: '#fff',
                            textTransform: 'none',
                            fontWeight: 800,
                            px: 3,
                            '&:hover': { background: '#cc0000', boxShadow: '0 0 15px rgba(255, 68, 68, 0.4)' }
                        }}
                    >
                        EXECUTE
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Actions;
