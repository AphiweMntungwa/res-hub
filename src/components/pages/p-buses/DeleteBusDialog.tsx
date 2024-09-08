import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteDialogProps {
    open: boolean;
    busId: number | null;
    onClose: () => void;
    onDelete: (busId: number | null) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, busId, onClose, onDelete }) => {
    const handleDelete = () => {
        onDelete(busId); // Call the delete function passed from parent
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Bus</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this bus? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
