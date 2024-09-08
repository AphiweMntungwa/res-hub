import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

interface DeleteEventDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: number;
    onDelete: (eventId: number) => void;
}

const DeleteEventDialog: React.FC<DeleteEventDialogProps> = ({ open, onClose, eventId, onDelete }) => {

    const handleDelete = () => {
        onDelete(eventId);
        onClose(); 
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-event-dialog-title">
            <DialogTitle id="delete-event-dialog-title">Delete Event</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Are you sure you want to delete this Event? This action cannot be undone.
                </Typography>
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

export default DeleteEventDialog;
